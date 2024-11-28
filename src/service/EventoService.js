import axios from 'axios';

const API_URL = 'http://localhost:8080/eventos'; // URL da sua API de eventos

export default {
  async listarTodos() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      throw error;
    }
  },

  async listarPorFiltro(params) {
    try {
      const response = await axios.get(`${API_URL}/filtro`, { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar eventos:', error);
      throw error;
    }
  },

  async salvar(evento) {
    try {
      const response = await axios.post(API_URL, evento);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      throw error;
    }
  },

  async excluir(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log('Evento excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      throw error;
    }
  },
};
