import axios from 'axios';

const API_URL = 'http://localhost:8080/permissoes';

export default {
  async listarTodas() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar permissões:', error);
      throw error;
    }
  },

  async listarPorFiltro(nome) {
    try {
      const response = await axios.get(`${API_URL}/filtro`, { params: { nome } });
      return response.data;
    } catch (error) {
      console.error('Erro ao listar permissões por filtro:', error);
      throw error;
    }
  },

  async salvar(permissao) {
    try {
      const response = await axios.post(API_URL, permissao);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar permissão:', error);
      throw error;
    }
  },

  async excluir(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao excluir permissão:', error);
      throw error;
    }
  },
};
