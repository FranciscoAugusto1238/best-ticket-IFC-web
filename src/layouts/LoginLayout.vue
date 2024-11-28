<template>
    <div class="login-layout">
      <div class="login-container">
        <router-view></router-view>  <!-- Aqui o conteúdo da rota de login será injetado -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginLayout',
  };
  </script>
  
  <style scoped>
  /* Configuração do layout de login */
  .login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Gradiente moderno */
  }
  
  /* Contêiner de login */
  .login-container {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    width: 380px;
    text-align: center;
    transition: all 0.3s ease-in-out;
  }
  
  /* Título do login */
  .login-container h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 24px;
    font-weight: bold;
  }
  
  /* Campos de entrada */
  .login-container input {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fafafa;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
  }
  
  .login-container input:focus {
    border-color: #2575fc; /* Cor do foco */
    background-color: #ffffff; /* Mudança de fundo ao focar */
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.3);
    outline: none;
  }
  
  /* Botão de login */
  .login-container button {
    width: 100%;
    padding: 12px;
    background-color: #2575fc;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-container button:hover {
    background-color: #6a11cb; /* Cor ao passar o mouse */
  }
  
  /* Rodapé do login */
  .login-container .footer {
    margin-top: 20px;
    font-size: 14px;
    color: #888;
  }
  
  .login-container .footer a {
    color: #2575fc;
    text-decoration: none;
  }
  
  .login-container .footer a:hover {
    text-decoration: underline;
  }
  
  /* Responsividade para dispositivos móveis */
  @media (max-width: 480px) {
    .login-container {
      width: 90%;
      padding: 20px;
    }
  }
  </style>
  