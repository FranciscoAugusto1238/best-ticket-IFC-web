import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import TextField from "@/components/inputs/TextField.vue";

import ButtonDefault from "@/components/buttons/ButtonDefault.vue";
import TabelaExibicao from "@/templates/TabelaExibicao.vue";
import Container from "@/templates/containerComponent.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import VueTheMask from "vue-the-mask";
import vuetify from "./plugins/vuetify.js";
import '@mdi/font/css/materialdesignicons.css';


const pinia = createPinia();
const app = createApp(App);
app.component("text-field", TextField);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueTheMask);
app.component("a-btn", ButtonDefault);
app.component("tabela-exibicao", TabelaExibicao);
app.component("a-container", Container);
app.component("EasyDataTable", Vue3EasyDataTable);

app.mount('#app');
