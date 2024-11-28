<template>
    <v-container>
      <h1>Permissões do Usuário</h1>
      <v-data-table
        :headers="headers"
        :items="permissoes"
        :loading="loading"
        loading-text="Carregando permissões..."
      >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="red" @click="removerPermissao(item.id)">Remover</v-btn>
    </template>

      </v-data-table>
      <v-btn color="primary" @click="voltar">Voltar</v-btn>
    </v-container>
  </template>
<script>
import permissaoService from '@/service/PermissaoService.js';
import { exibirMensagemSucesso, exibirMensagemErro } from '@/util/MessageUtils.js';

export default {
  data() {
    return {
      permissoes: [],
      loading: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Descrição', value: 'descricao' },
        { text: 'Nome', value: 'nome' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    async carregarPermissoes() {
      this.loading = true;
      try {
        const response = await permissaoService.listarTodas();
        this.permissoes = response;
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
        exibirMensagemErro('Erro ao carregar permissões');
      } finally {
        this.loading = false;
      }
    },
    async removerPermissao(permissaoId) {
      try {
        await permissaoService.excluir(permissaoId);
        this.permissoes = this.permissoes.filter(
          (permissao) => permissao.id !== permissaoId
        );
        exibirMensagemSucesso('Permissão removida com sucesso');
      } catch (error) {
        console.error('Erro ao remover permissão:', error);
        exibirMensagemErro('Erro ao remover permissão');
      }
    },
    voltar() {
      this.$router.push({ name: 'ListarUsuario' });
    },
  },
  mounted() {
    this.carregarPermissoes();
  },
};
</script>
  