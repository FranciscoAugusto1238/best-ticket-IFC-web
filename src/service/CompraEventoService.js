import axios from 'axios';

const API_URL = 'http://localhost:8080/compra-eventos';
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
      console.log('Usuário excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  },

  async atualizarAvaliacao(id, avaliacao) {
    try {
      const response = await axios.post(`${API_URL}/${id}/avaliacao`, { avaliacao });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw error;
    }
  },

  async salvarAvaliacao(compraEventoId, avaliacao) {
    try {
      await axios.post(
        `${API_URL}/compra-eventos/${compraEventoId}/avaliacao`,
        avaliacao,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Erro ao salvar a avaliação', error);
      throw error;
    }
  }
  
  
  
};
