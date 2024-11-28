<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn @click="showDialog = true" color="primary" elevation="2">Adicionar Compra</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="compra in compras" :key="compra.id" cols="12" sm="6" md="4">
        <v-card outlined elevation="2" class="mb-4">
          <v-card-title>
            <div class="d-flex flex-column">
              <span class="headline">Compra #{{ compra.id }}</span>
              <span class="subtitle-2">Evento: {{ compra.evento?.nome || 'Não informado' }}</span>
            </div>
          </v-card-title>
          <v-card-subtitle>
            Usuário: {{ compra.usuario?.nome || 'Não informado' }}
          </v-card-subtitle>
          <v-card-text>
            <div><strong>Quantidade de Ingressos:</strong> {{ compra.quantidadeIngressos }}</div>
            <div><strong>Valor Total:</strong> R$ {{ compra.valorTotal.toFixed(2) }}</div>
            <div class="mt-2">
              <strong>Avaliação:</strong>
              <v-rating
                v-model="compra.avaliacaoTemp"
                color="yellow darken-3"
                dense
                hover
                large
              />
              <v-btn @click="salvarAvaliacao(compra.id, compra.avaliacaoTemp)" color="green" small>
                Salvar Avaliação
              </v-btn>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="excluirCompra(compra.id)" color="red" small>Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Compra de Evento</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="novaCompra.quantidadeIngressos"
              label="Quantidade de Ingressos"
              type="number"
              :rules="[rules.required, rules.number]"
              required
            />
            <v-text-field
              v-model="novaCompra.valorTotal"
              label="Valor Total"
              type="number"
              :rules="[rules.required, rules.number]"
              required
            />
            <v-select
              v-model="novaCompra.usuarioId"
              :items="usuarios"
              :item-value="'id'"
              :item-text="'nome'"
              label="Usuário"
              :rules="[rules.required]"
              required
            />
            <v-select
              v-model="novaCompra.eventoId"
              :items="eventos"
              item-value="id"
              item-text="nome"
              label="Evento"
              :rules="[rules.required]"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showDialog = false" color="grey" elevation="1">Cancelar</v-btn>
          <v-btn :disabled="!formValid" @click="salvarCompra" color="primary" elevation="1">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import usuarioService from '@/service/UsuarioService';
import CompraEventoService from '@/service/CompraEventoService.js';
import EventoService from '@/service/EventoService.js';
import { exibirMensagemSucesso, exibirMensagemErro } from '@/util/MessageUtils.js';

export default {
  data() {
    return {
      showDialog: false,
      formValid: false,
      novaCompra: {
        usuarioId: null,
        eventoId: null,
        quantidadeIngressos: 0,
        valorTotal: 0,
      },
      compras: [],
      usuarios: [],
      eventos: [],
      rules: {
        required: value => !!value || 'Campo obrigatório',
        number: value => !isNaN(value) || 'Deve ser um número',
      },
    };
  },
  mounted() {
    this.listarCompras();
    this.listarUsuarios();
    this.listarEventos();
  },
  methods: {
    async listarCompras() {
      try {
        const response = await CompraEventoService.listarTodos();
        this.compras = response.map(compra => ({
          ...compra,
          avaliacaoTemp: compra.avaliacao || 0,
        }));
      } catch (error) {
        console.error('Erro ao listar compras:', error);
      }
    },
    async listarUsuarios() {
      try {
        const resposta = await usuarioService.listarTodos();
        this.usuarios = resposta.map(usuario => ({
          id: usuario.id,
          nome: usuario.nome,
        }));
      } catch (error) {
        console.error('Erro ao listar usuários', error);
        exibirMensagemErro('Erro ao carregar lista de usuários');
      }
    },
    async salvarAvaliacao(id, avaliacao) {
      console.log('Salvando avaliação para compra:', id, 'com avaliação:', avaliacao); // Log para depuração
      try {
        await CompraEventoService.atualizarAvaliacao(id, avaliacao);
        exibirMensagemSucesso('Avaliação salva com sucesso');
      } catch (error) {
        console.error('Erro ao salvar a avaliação:', error);
        exibirMensagemErro('Erro ao salvar a avaliação');
      }
    },
    async listarEventos() {
      try {
        const resposta = await EventoService.listarTodos();
        this.eventos = resposta.map(evento => ({
          id: evento.id,
          nome: evento.nome,
          data: evento.data,
        }));
      } catch (error) {
        console.error('Erro ao listar eventos:', error);
        exibirMensagemErro('Erro ao carregar lista de eventos');
      }
    },
    async salvarCompra() {
      try {
        const compraParaSalvar = {
          usuario: { id: this.novaCompra.usuarioId },
          evento: { id: this.novaCompra.eventoId },
          quantidadeIngressos: this.novaCompra.quantidadeIngressos,
          valorTotal: this.novaCompra.valorTotal,
        };

        await CompraEventoService.salvar(compraParaSalvar);
        this.listarCompras();
        this.showDialog = false;
        this.novaCompra = { usuarioId: null, eventoId: null, quantidadeIngressos: 0, valorTotal: 0 };
        this.$toast.success('Compra salva com sucesso');
      } catch (error) {
        console.error('Erro ao salvar a compra:', error);
        exibirMensagemErro('Erro ao salvar a compra');
      }
    },
    async excluirCompra(id) {
      try {
        await CompraEventoService.excluir(id);
        this.listarCompras();
      } catch (error) {
        console.error('Erro ao excluir a compra:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border: 1px solid #ccc;
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.v-card-title .headline {
  font-size: 1.2rem;
  font-weight: bold;
}
.v-card-subtitle {
  font-size: 0.9rem;
  color: #555;
}
</style>
