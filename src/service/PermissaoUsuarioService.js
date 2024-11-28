import axios from 'axios';

const API_URL = 'http://localhost:8080/permissao-usuario';

export default {
  async listar() {
    try {
      const response = await axios.get(`${API_URL}/pesquisar`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar permissões de usuários', error);
      throw error;
    }
  },

  async listarPorFiltro() {
    try {
      const response = await axios.get(`${API_URL}/pesquisar-filtro`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar permissões de usuários com filtro', error);
      throw error;
    }
  },

  async salvar(permissaoUsuario) {
    try {
      const response = await axios.post(`${API_URL}/salvar`, permissaoUsuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar permissão de usuário', error);
      throw error;
    }
  },

  async editar(id, permissaoUsuario) {
    try {
      const response = await axios.put(`${API_URL}/editar/${id}`, permissaoUsuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao editar permissão de usuário', error);
      throw error;
    }
  },

  async excluir(id) {
    try {
      await axios.delete(`${API_URL}/excluir/${id}`);
    } catch (error) {
      console.error('Erro ao excluir permissão de usuário', error);
      throw error;
    }
  }
};
