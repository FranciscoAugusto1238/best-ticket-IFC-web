<template>
  <v-container>
    <h1>Cadastrar Permissão</h1>
    <v-form v-model="formValid">
      <v-select 
        v-model="novaPermissao.usuario" 
        :items="usuarios" 
        item-text="nome" 
        item-value="id"
        label="Usuário" 
        required 
      />
      <v-select 
        v-model="novaPermissao.permissao" 
        :items="permissoesDisponiveis" 
        item-text="nome"
        item-value="id"
        label="Permissão" 
        required 
      />
      <v-checkbox v-model="novaPermissao.ativo" label="Ativo" />
      <v-btn 
        color="primary" 
        @click="salvarPermissao" 
        :disabled="!formValid"
      >
        Salvar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import permissaoUsuarioService from '@/service/PermissaoService';
import usuarioService from '@/service/UsuarioService';
import permissaoUsuarioServiceV from '@/service/PermissaoUsuarioService';
import { exibirMensagemSucesso, exibirMensagemErro } from '@/util/MessageUtils.js';


export default {
  data() {
    return {
      novaPermissao: { usuario: null, permissao: null, ativo: true },
      usuarios: [],
      permissoesDisponiveis: [],
      formValid: false,
    };
  },
  mounted() {
    console.log('Carregando usuários e permissões...');
    this.listarUsuarios();
    this.listarPermissoesDisponiveis();
  },
  methods: {
    async listarUsuarios() {
      try {
        const resposta = await usuarioService.listarTodos();
        this.usuarios = resposta.map(usuario => ({
          id: usuario.id,
          nome: usuario.nome
        }));
      } catch (error) {
        console.error('Erro ao listar usuários', error);
        exibirMensagemErro('Erro ao carregar lista de usuários');
      }
    },
    async listarPermissoesDisponiveis() {
      try {
        const resposta = await permissaoUsuarioService.listarTodas();
        this.permissoesDisponiveis = resposta.map(permissao => ({
          id: permissao.id,
          nome: permissao.nome
        }));
      } catch (error) {
        console.error('Erro ao listar permissões disponíveis', error);
        exibirMensagemErro('Erro ao carregar lista de permissões');
      }
    },

    async salvarPermissao() {
      try {
        const permissaoParaSalvar = {
          usuario: { id: this.novaPermissao.usuario },
          permissao: {id: this.novaPermissao.permissao},
          ativo: this.novaPermissao.ativo
        };

        await permissaoUsuarioServiceV.salvar(permissaoParaSalvar);
        exibirMensagemSucesso('Permissão salva com sucesso');
        this.novaPermissao = { usuario: null, permissao: null, ativo: true };
      } catch (error) {
        console.error('Erro ao salvar permissão', error);
        exibirMensagemErro('Erro ao salvar permissão');
      }
    },
  },
};
</script>
