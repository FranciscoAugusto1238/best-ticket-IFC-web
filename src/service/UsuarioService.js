import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios';

export default {
  async salvar(usuario) {
    try {
      const response = await axios.post(API_URL, usuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  },

  async listarTodos() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },

  async excluir(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  },

  async editar(usuario) {
    try {
      const response = await axios.put(`${API_URL}/${usuario.id}`, usuario);
      return response.data;
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      throw error;
    }
  },
};
