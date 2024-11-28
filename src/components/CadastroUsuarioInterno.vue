<template>
	<a-container title="Cadastro de Pessoas">
		<v-form ref="form" lazy-validation color="transparent">
			<h2 class="mb-4" style="margin-left: 0;">Dados pessoais</h2>
			<v-row align="center">
				<v-col cols="12">
					<v-text-field v-model="usuario.nomeCompleto" label="Nome completo"/>
				</v-col>
				<v-col cols="4">
					<v-select label="Sexo" :items="['Masculino', 'Feminino', 'Prefiro não dizer', 'Outro']" v-model="usuario.sexo"/>
				</v-col>
				<v-col cols="4">
					<v-text-field v-model="usuario.peso" label="Peso KG" />
				</v-col>
				<v-col cols="4">
					<v-text-field v-model="usuario.altura" label="Altura" />
				</v-col>
				<v-col cols="4">
					<v-text-field v-model="usuario.dataNascimento" label="Data Nascimento" v-mask="'##-##-####'" @change="calcularIdade"/>
				</v-col>
				<v-col cols="4">
					<v-text-field label="Idade" v-model="usuario.idade" readonly/>
				</v-col>
				<v-col cols="4">
					<v-select label="Estado civil" :items="['Casado', 'Convivente(União Estavel)', 'Divorciado(a)',
						'Divorciado(a) por escritura', 'Divorciado(a) por sentença',
						'Ignorado(a)', 'Separado(a) judicialmente/Extrajudicialmente',
						'Separado(a) por escritura', 'Separado(a) por sentença', 'Solteiro(a)', 'Viuvo(a)']" v-model="usuario.estadoCivil"/>
				</v-col>
				<v-col cols="4">
					<v-text-field v-model="usuario.cpf" label="CPF" v-mask="'###.###.###-##'" />	
				</v-col>
				<v-col cols="4" v-if="isMenorDeIdade">
					<v-text-field v-model="usuario.nomeMae" label="Nome Responsavel" />
				</v-col>
				<v-col cols="4" v-if="isMenorDeIdade">
					<v-text-field v-model="usuario.contatoMae" label="Número do Responsavel" v-mask="'(##)#####-####'" />
				</v-col>
			</v-row>

			<h2>Dados endereço</h2>
			<v-row align="center">
				<v-col cols ="4">
					<v-text-field v-model="usuario.cidade" label="Cidade"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.estado" label="Estado"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.rua" label="Rua"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.numero" label="Numero"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.bairro" label="Bairro"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.cep" label="CEP" v-mask="'#####-###'"/>
				</v-col>
			</v-row>
			<h2>Formas de contato</h2>
			<v-row align="center">
				<v-col cols ="4">
					<v-text-field v-model="usuario.telefoneFixo" label="Telefone Fixo" v-mask="'(##)####-####'"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.telefoneCelular" label="Telefone Celular" v-mask="'(##)#####-####'"/>
				</v-col>
				<v-col cols ="4">
					<v-text-field v-model="usuario.email" label="E-mail"/>
				</v-col>
				<v-col>
					<check-radio
						v-model="usuario.reaja"
						label="REAJA"
						/>
				</v-col>
			</v-row>
			<h2>Restrições/Remedios</h2>
			<v-row align="center">
				<v-col>
					<v-select label="Restrições Alimentares" :items="['Sim', 'Não']" v-model="usuario.intoleranciaAlimentar"/>
				</v-col>
				<v-col>
					<v-select label="Uso de medicamentos" :items="['Sim', 'Não']" v-model="usuario.medicamento"/>
				</v-col>
			</v-row>
			<v-row align="center">
				<v-col>
					<v-text-field v-if="usuario.intoleranciaAlimentar === 'Sim'" v-model="usuario.quaisRestricoes" label="Quais restrições?"/>
				</v-col>
				<v-col>
					<v-text-field v-if="usuario.medicamento === 'Sim'" v-model="usuario.quaisMedicamentos" label="Quais medicamentos?"/>
				</v-col>
			</v-row>
			<h2>Participação</h2>
			<v-row align="center">
				<v-col>
					<v-checkbox v-model="usuario.reaja" label="REAJA" />
				</v-col>
				<v-col>
					<v-checkbox v-model="usuario.revivi" label="REVIVI" />
				</v-col>
				<v-col>
					<v-checkbox v-model="usuario.fitoterapia" label="FITOTERAPIA" />
				</v-col>
				<v-col>
					<v-checkbox v-model="usuario.teologia" label="TEOLOGIA" />
				</v-col>
				<v-col>
					<v-checkbox v-model="usuario.socios" label="SOCIOS" />
				</v-col>
				<v-col>
					<v-checkbox v-model="usuario.menbros" label="MEMBROS" />
				</v-col>
			</v-row>
		</v-form>

		<v-container>
			<v-row justify="end">
				<v-col cols="auto">
					<a-btn
            buttonName="Salvar"
            v-on:click="salvar"
            :needIcon="true"
            style="background-color: gray; color: white"
            :needLoading="buttonLoading"
          />
				</v-col>
			</v-row>
		</v-container>

	</a-container>
</template>

<script>
import UsuarioService from "@/service/UsuarioService";
import {
  exibirMensagemErroApi,
  exibirMensagemSucesso,
} from "@/util/MessageUtils.js";

export default {
  name: "CadastroUsuarioInterno",
  components: {},
  mounted(){
			if(this.isEditar){
				this.listarAssociado();
			}
		},
  computed: {
    isEditar() {
      return this.$route.params?.id;
    },
  },
  data() {
    return {
	idades: Array.from({length: 120}, (_, i) => i + 1),
	usuario: this.newUsuario(),
    buttonLoading: false,
    emailDisabled: false,
	isMenorDeIdade: false,
    };
  },
  watch: {
    'usuario.dataNascimento': function() {
      this.calcularIdade();
    },
  },
  methods: {
	calcularIdade() {
      if (this.usuario.dataNascimento) {
        const partesData = this.usuario.dataNascimento.split('-');
        const dia = parseInt(partesData[0], 10);
        const mes = parseInt(partesData[1], 10) - 1;
        const ano = parseInt(partesData[2], 10);

        const dataNascimento = new Date(ano, mes, dia);
        const hoje = new Date();
        let anos = hoje.getFullYear() - dataNascimento.getFullYear();
        let meses = hoje.getMonth() - dataNascimento.getMonth();

        if (meses < 0 || (meses === 0 && hoje.getDate() < dataNascimento.getDate())) {
          anos--;
          meses += 12;
        }

        this.usuario.idade = `${anos} anos e ${meses} meses`;
        this.isMenorDeIdade = anos < 18;
      } else {
        this.usuario.idade = null;
        this.isMenorDeIdade = false;
      }
    },
    newUsuario() {
      return {
        nomeCompleto: null,
		altura: null,
        sexo: null,
        idade: null,
        estadoCivil: null,
        dataNascimento: null,
        cpf: null,
        cidade: null,
        estado: null,
        rua: null,
        bairro: null,
        cep: null,
        telefoneFixo: null,
        telefoneCelular: null,
        email: null,
		reaja: null,
		revivi: null,
		teologia: null,
		fitoterapia: null,
		socios: null,
		menbros: null,
		peso: null,
        restricoesAlimentares: null,
        usoMedicamentos: null,
        intoleranciaAlimentar: null,
        medicamento: null,
		numero: null,
		nomeMae: null,
		contatoMae: null,
      };
    },
    handleDateSelected(date) {
      this.dataSelecionada = date;
    },
	listarAssociado(){
				if(this.isEditar){
					UsuarioService
						.buscarUsuario(this.isEditar)
						.then(({ data }) => {
							this.usuario = data;
						}).catch((error) => {
							exibirMensagemErroApi(error?.response?.data, "Não foi possível listar o usuário!. Tente novamente mais tarde.");
							console.log(error);
						})
						.finally(() => {
							this.$finalizarCarregando();
						});
				}
			},
			salvar() {
      this.buttonLoading = true;
      if (this.isEditar) {
        // Atualiza o usuário existente
        UsuarioService
          .atualizarUsuario(this.isEditar, this.usuario)
          .then(() => {
            exibirMensagemSucesso("Usuário atualizado com sucesso!");
          })
          .catch((error) => {
            exibirMensagemErroApi(
              error.response?.data,
              "Erro ao atualizar usuário! Tente novamente mais tarde."
            );
          })
          .finally(() => {
            this.buttonLoading = false;
            this.$router.push("/cadastro-usuario");
          });
      } else {
        // Cria um novo usuário
        UsuarioService
          .cadastrarUsuario(this.usuario)
          .then(() => {
            this.usuario = {}; // Se necessário, limpe os dados após o salvamento
            exibirMensagemSucesso("Usuário criado com sucesso!");
          })
          .catch((error) => {
            exibirMensagemErroApi(
              error.response?.data,
              "Erro ao salvar usuário! Tente novamente mais tarde."
            );
          })
          .finally(() => {
            this.buttonLoading = false;
            this.usuario = this.newUsuario();
            this.$router.push("/cadastro-usuario");
          });
      }
    },
  },
};
</script>
