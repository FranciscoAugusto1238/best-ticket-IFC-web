<template>
  <v-container>
    <!-- Filtro -->
    <v-form v-model="formValid" ref="form" class="mb-6">
      <v-row>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="filtro.nome"
            label="Nome do Evento"
            prepend-icon="mdi-calendar"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="filtro.local"
            label="Local do Evento"
            prepend-icon="mdi-map-marker"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" sm="2" class="d-flex align-center justify-center">
          <v-btn color="primary" block @click="filtrarEventos">
            <v-icon left>mdi-magnify</v-icon>
            Pesquisar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Lista de eventos -->
    <v-row>
      <v-col v-for="item in eventos" :key="item.id" cols="12" sm="6" md="4">
        <v-card elevation="2" class="hover-elevation-6">
          <!-- Imagem do evento -->
          <v-img
            :src="item.imagem || 'https://via.placeholder.com/300x150.png?text=Evento'"
            height="150px"
            class="white--text"
          ></v-img>

          <!-- Conteúdo do cartão -->
          <v-card-title class="justify-center">
            <span class="headline text-primary">{{ item.nome }}</span>
          </v-card-title>
          <v-card-subtitle class="text-center text-secondary">
            <v-icon left small color="teal">mdi-map-marker</v-icon>
            {{ item.local }}
          </v-card-subtitle>

          <v-card-text>
            <div>
              <strong>Descrição:</strong> {{ item.descricao || 'Sem descrição' }}
            </div>
            <div>
              <strong>Status:</strong>
              <span :class="item.ativo ? 'text-success' : 'text-error'">
                {{ item.ativo ? 'Ativo' : 'Inativo' }}
              </span>
              <span v-if="item.valor !== null && item.valor !== undefined">
                R$ {{ formatarValor(item.valor) }}
              </span>
            </div>
          </v-card-text>

          <!-- Ações -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" outlined small @click="excluirEvento(item.id)">
              <v-icon left small>mdi-delete</v-icon>
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botão para adicionar novo evento -->
    <v-btn color="primary" class="mt-6" block @click="abrirModalNovoEvento">
      <v-icon left>mdi-plus</v-icon>
      Adicionar Novo Evento
    </v-btn>

    <!-- Modal Novo Evento -->
    <v-dialog v-model="modalNovoEvento" max-width="500px">
      <v-card>
        <v-card-title>
          <v-icon left class="mr-2">mdi-calendar-plus</v-icon>
          <span class="headline">Novo Evento</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formNovoEvento" v-model="formValid">
            <v-text-field v-model="novoEvento.nome" label="Nome do Evento" outlined dense required />
            <v-text-field v-model="novoEvento.descricao" label="Descrição" outlined dense />
            <v-text-field v-model="novoEvento.local" label="Local" outlined dense required />
            <v-text-field v-model="novoEvento.organizador" label="Organizador" outlined dense required />
            <v-text-field 
              v-model="novoEvento.valor" 
              label="Valor do Evento" 
              outlined 
              dense 
              required 
              type="text"
              :value="formatarValor(novoEvento.valor)"
              @input="atualizarValor" 
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-1" text @click="modalNovoEvento = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarNovoEvento" :disabled="!formValid">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import eventoService from '@/service/EventoService.js';
import { exibirMensagemSucesso, exibirMensagemAtencao, exibirMensagemErro } from '@/util/MessageUtils.js';

export default {
  data() {
    return {
      eventos: [],
      filtro: { nome: '', local: '' },
      novoEvento: {
        nome: '',
        descricao: '',
        local: '',
        organizador: '',
        valor: '',
        dataInicio: null,
        dataFim: null,
        ativo: true,
      },
      headers: [
        { text: 'Nome', align: 'start', key: 'nome' },
        { text: 'Descrição', align: 'start', key: 'descricao' },
        { text: 'Local', align: 'start', key: 'local' },
        { text: 'Data Início', align: 'start', key: 'dataInicio' },
        { text: 'Ativo', align: 'start', key: 'ativo' },
        { text: 'Ações', align: 'center', key: 'actions' },
      ],
      itemsPerPage: 5,
      modalNovoEvento: false,
      menuDataInicio: false,
      menuDataFim: false,
      formValid: false,
    };
  },
  methods: {
    formatarData(timestamp) {
      const data = new Date(timestamp);
      return data.toLocaleDateString();
    },
    formatarValor(valor) {
      if (!valor) return '';
      return valor.replace(/\D/g, '')
        .replace(/(\d)(\d{2})$/, '$1,$2')
        .replace(/(?=(\d{3})+(\D))\B/g, '.');
    },
    async listarEventos() {
      try {
        const resposta = await eventoService.listarTodos();
        this.eventos = resposta.data; 
      } catch (error) {
        console.error('Erro ao listar eventos', error);
      }
    },
    async filtrarEventos() {
      try {
        const response = await eventoService.listarPorFiltro(this.filtro.nome, this.filtro.local);
        this.eventos = response;
      } catch (error) {
        console.error('Erro ao filtrar eventos', error);
      }
    },
    async salvarNovoEvento() {
      try {
        const eventoSalvo = await eventoService.salvar(this.novoEvento);
        this.eventos.push(eventoSalvo);
        this.modalNovoEvento = false;
        exibirMensagemSucesso('Evento criado com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar evento', error);
        exibirMensagemErro('Erro ao salvar evento');
      }
    },
    async excluirEvento(id) {
      try {
        await eventoService.excluir(id);
        this.eventos = this.eventos.filter(evento => evento.id !== id);
        exibirMensagemAtencao('Evento excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir evento', error);
        exibirMensagemErro('Erro ao excluir evento');
      }
    },
    abrirModalNovoEvento() {
      this.novoEvento = {
        nome: '',
        descricao: '',
        local: '',
        organizador: '',
        valor: '',
        dataInicio: null,
        dataFim: null,
        ativo: true,
      };
      this.modalNovoEvento = true;
    },
  },
  mounted() {
    this.listarEventos();
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
.text-secondary {
  font-size: 0.9rem;
}
.hover-elevation-6:hover {
  transition: box-shadow 0.3s ease-in-out;
}
</style>
