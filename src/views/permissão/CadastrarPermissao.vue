<template>
    <v-container>
      <v-form v-model="formValid" ref="form">
        <v-text-field
          v-model="filtro.nome"
          label="Nome da Permissão"
        />
      </v-form>
      <v-btn color="primary" @click="abrirModalNovo" class="mb-4">Adicionar Nova Permissão</v-btn>
      <v-row>
        <v-col v-for="item in permissoes" :key="item.id" cols="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              <span class="headline">{{ item.nome }}</span>
            </v-card-title>
            <v-card-subtitle>
              {{ item.descricao }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="red" @click="excluirPermissao(item.id)">Excluir</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="modalNovoPermissao" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Nova Permissão</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="formNovoPermissao" v-model="formValid">
              <v-text-field v-model="novaPermissao.nome" label="Nome" required />
              <v-text-field v-model="novaPermissao.descricao" label="Descrição" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="modalNovoPermissao = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" @click="salvarNovaPermissao" :disabled="!formValid">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import permissaoService from '@/service/PermissaoService.js';
  import { exibirMensagemSucesso, exibirMensagemAtencao, exibirMensagemErro } from '@/util/MessageUtils.js';
  
  export default {
    data() {
      return {
        permissoes: [],
        filtro: { nome: '' },
        novaPermissao: { nome: '', descricao: '' },
        modalNovoPermissao: false,
        formValid: false,
      };
    },
    methods: {
      async listarPermissoes() {
        try {
          const response = await permissaoService.listarTodas();
          this.permissoes = response.data;
        } catch (error) {
          console.error('Erro ao listar permissões', error);
        }
      },
      async filtrarPermissoes() {
        try {
          const response = await permissaoService.listarPorFiltro(this.filtro.nome);
          this.permissoes = response.data;
        } catch (error) {
          console.error('Erro ao filtrar permissões', error);
        }
      },
      async salvarNovaPermissao() {
        try {
          const permissaoSalva = await permissaoService.salvar(this.novaPermissao);
          this.permissoes.push(permissaoSalva.data);
          this.modalNovoPermissao = false;
          exibirMensagemSucesso('Permissão salva com sucesso');
        } catch (error) {
          console.error('Erro ao salvar permissão', error);
          exibirMensagemErro('Erro ao salvar permissão');
        }
      },
      async excluirPermissao(id) {
        try {
          await permissaoService.excluir(id);
          this.permissoes = this.permissoes.filter(permissao => permissao.id !== id);
          exibirMensagemAtencao('Permissão excluída com sucesso');
        } catch (error) {
          console.error('Erro ao excluir permissão', error);
          exibirMensagemErro('Erro ao excluir permissão');
        }
      },
      abrirModalNovo() {
        this.novaPermissao = { nome: '', descricao: '' };
        this.modalNovoPermissao = true;
      },
    },
    mounted() {
      this.listarPermissoes();
    },
  };
  </script>
  
  <style scoped>
  </style>
  