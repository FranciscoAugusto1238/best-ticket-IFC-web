<template>
  <div class="about-page">
    <header class="about-header">
      <h1>Sobre Nós</h1>
      <p>
        Bem-vindo ao nosso projeto de Desenvolvimento Web! Somos Francisco e Felipe, 
        apaixonados por tecnologia e inovação, e este site é nossa contribuição para 
        facilitar a compra e venda de ingressos para eventos incríveis.
      </p>
    </header>
    <section class="about-mission">
      <h2>Nossa Missão</h2>
      <p>
        Criar uma experiência simples, rápida e segura para usuários que desejam 
        explorar, gerenciar e participar de eventos. Nosso foco está em combinar 
        design intuitivo com tecnologias de ponta para oferecer a melhor plataforma possível.
      </p>
    </section>
    <section class="about-vision">
      <h2>O Projeto</h2>
      <p>
        Este projeto foi desenvolvido como parte de nossos estudos em Desenvolvimento Web, 
        utilizando frameworks modernos como Vue.js no frontend e Spring Boot no backend. 
        Nossa aplicação permite que organizadores de eventos anunciem suas atrações e 
        usuários adquiram ingressos com praticidade.
      </p>
    </section>
    <section class="about-team">
      <h2>Conheça a Equipe</h2>
      <div class="team-members">
        <div class="team-member">
          <img src="https://via.placeholder.com/150" alt="Francisco" />
          <h3>Francisco</h3>
          <p>Desenvolvedor Full Stack.</p>
        </div>
        <div class="team-member">
          <img src="https://via.placeholder.com/150" alt="Felipe" />
          <h3>Felipe</h3>
          <p>Focado em Frontend.</p>
        </div>
      </div>
    </section>
    <footer class="about-footer">
      <p>&copy; 2024 Francisco e Felipe. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
};
</script>

<style scoped>
.about-page {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
}

.about-header {
  background: #007BFF;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.about-header p {
  font-size: 1.2rem;
}

.about-mission,
.about-vision {
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  margin: 1rem 0;
}

.about-mission h2,
.about-vision h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about-team {
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  margin: 2rem 0;
}

.team-members {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.team-member {
  text-align: center;
}

.team-member img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  border: 3px solid #007BFF;
}

.team-member h3 {
  font-size: 1.5rem;
  color: #007BFF;
}

.about-footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
