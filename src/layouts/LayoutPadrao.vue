<template>
<v-app class="bg-surface">
	<v-app-bar app color="#34495e" dark rounded>
	<v-btn icon @click="toggleSidebar">
		<v-icon>mdi-menu</v-icon>
	</v-btn>
	<v-toolbar-title>Best Ticket</v-toolbar-title>
	</v-app-bar>
	<v-main class="v-main custom-container">
	<v-container fluid>
		<div class="logo-container">
		<img src="../assets/logo.png" alt="Logo" class="logo" />
		</div>
		<v-row class="flex-container" no-gutters>
		<v-col v-if="isSidebarVisible && isDesktop" cols="3" class="sidebar">
			<BarraLateral />
		</v-col>
		<v-col
			cols="12"
			v-bind:class="{ 'content-expanded': isDesktop && isSidebarVisible }"
			class="content"
		>
			<router-view />
		</v-col>
		</v-row>
	</v-container>
	</v-main>
	<v-footer app class="footer" padless>
	<v-row justify="center">
		<v-col class="text-center">
		<v-btn text color="white">{{ rodapeTexto }}</v-btn>
		</v-col>
	</v-row>
	</v-footer>
</v-app>
</template>

<script>
import BarraLateral from "../layouts/BarraLateral.vue";
import logo from "../assets/logo.png";

export default {
components: {
	BarraLateral,
},
data() {
	return {
	logo,
	isDesktop: window.innerWidth >= 1024,
	isSidebarVisible: false,
	rodapeTexto: "Best Ticket",
	};
},
mounted() {
	window.addEventListener("resize", this.handleResize);
	this.rodapeInterval = setInterval(this.alternarRodape, 2000);
},
beforeUnmount() {
	window.removeEventListener("resize", this.handleResize);
	clearInterval(this.rodapeInterval);
},
methods: {
	handleResize() {
	this.isDesktop = window.innerWidth >= 1024;
	},
	alternarRodape() {
	this.rodapeTexto =
		this.rodapeTexto === "Best Ticket"
		? "Desenvolvido por Francisco e Felipe"
		: "Best Ticket";
	},
	toggleSidebar() {
	this.isSidebarVisible = !this.isSidebarVisible;
	},
},
};
</script>

<style scoped>
.custom-container {
min-height: 100vh;
background: linear-gradient(135deg, #ffffff, #353836);
padding: 16px;
border-radius: 1px;
margin-top: 64px;
}

.flex-container {
display: flex;
flex-wrap: wrap;
}

.logo-container {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1;
pointer-events: none;
}

.logo {
width: 300px;
opacity: 0.05;
}

.content {
flex: 1;
background: white;
border-radius: 20px;
padding: 16px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
overflow: hidden;
z-index: 2;
min-height: 800px;
}

.content-expanded {
margin-left: 0 !important;
}

@media (max-width: 1024px) {
.logo-container {
	display: none;
}

.sidebar {
	display: none;
}

.content {
	height: auto;
	padding: 8px;
}

.flex-container {
	display: block;
	gap: 8px;
}

.content-expanded {
	margin-left: 0 !important;
}
}

.footer {
background-color: #34495e;
color: white;
padding: 12px 0;
text-align: center;
}
</style>
  