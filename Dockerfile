# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie todos os arquivos do seu projeto para o diretório de trabalho
COPY . /app

# Instale as dependências do projeto
RUN npm install

# Execute o comando para iniciar o servidor de desenvolvimento Vue.js
CMD ["npm", "run", "serve"]
