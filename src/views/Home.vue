<template>
  <div class="home-page">
    <header class="hero-section">
      <h1>Sistema de Gestão de Eventos</h1>
      <p>Cadastre, explore e participe dos melhores eventos com facilidade.</p>
      <router-link to="/eventos" class="cta-button">Ver Eventos</router-link>
    </header>
    <section class="carousel-container">
      <div class="carousel" v-if="slides.length">
        <div
          class="carousel-slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index === currentSlide }"
        >
          <img :src="slide.image" :alt="slide.title" class="carousel-image" />
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <router-link :to="slide.link" class="slide-button">Saiba Mais</router-link>
          </div>
        </div>
      </div>
      <div class="carousel-indicators" v-if="slides.length">
        <span
          v-for="(_, index) in slides"
          :key="index"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></span>
      </div>
      <p v-else>Carregando eventos...</p>
    </section>
    <section class="about-section">
      <h2>Por que usar nosso sistema?</h2>
      <div class="features">
        <div class="feature">
          <img src="https://via.placeholder.com/150" alt="Cadastro fácil" />
          <h3>Cadastro Simplificado</h3>
          <p>Gerencie eventos com rapidez e eficiência.</p>
        </div>
        <div class="feature">
          <img src="https://via.placeholder.com/150" alt="Eventos incríveis" />
          <h3>Eventos Incríveis</h3>
          <p>Descubra eventos que se destacam em todas as áreas.</p>
        </div>
        <div class="feature">
          <img src="https://via.placeholder.com/150" alt="Compra rápida" />
          <h3>Compra Rápida</h3>
          <p>Adquira ingressos em poucos cliques.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import eventoService from '@/service/EventoService.js'; // Ajuste o caminho conforme sua estrutura.

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      currentSlide: 0,
      slides: [],
    };
  },
  methods: {
    async fetchEventos() {
      try {
        const eventos = await eventoService.listarTodos();
        this.slides = eventos.map(evento => ({
          title: evento.nome,
          description: evento.descricao,
          image: evento.imagemUrl || 'https://via.placeholder.com/800x400?text=Sem+Imagem',
          link: `/eventos/${evento.id}`,
        }));
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    this.fetchEventos();
    setInterval(this.nextSlide, 3000); // Troca de slide a cada 3 segundos
  },
};
</script>

<style scoped>
.home-page {
  font-family: 'Roboto', sans-serif;
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
}

.hero-section {
  text-align: center;
  padding: 50px 20px;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: #fff;
  border-radius: 0 0 50px 50px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.cta-button {
  padding: 10px 20px;
  font-size: 1rem;
  background: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #555;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  margin: 40px auto;
  max-width: 1200px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
  position: relative;
}

.carousel-image {
  width: 100%;
  border-radius: 20px;
}

.slide-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 15px;
  border-radius: 10px;
}

.slide-content h2 {
  margin: 0 0 10px;
}

.slide-content .slide-button {
  color: #fff;
  background: #ff7e5f;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicators span.active {
  background: #ff7e5f;
}

/* Seção Sobre */
.about-section {
  padding: 40px 20px;
  background: #f9f9f9;
  text-align: center;
}

.about-section h2 {
  margin-bottom: 20px;
  font-size: 2rem;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature {
  max-width: 300px;
  text-align: center;
}

.feature img {
  width: 100px;
  margin-bottom: 10px;
}

.feature h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #ff7e5f;
}

.feature p {
  font-size: 0.9rem;
}
</style>
