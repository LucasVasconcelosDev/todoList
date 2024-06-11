# Usa a imagem Node como base para o Back-end
FROM node:20

# Cria a pasta /backend dentro do contêiner e entra nela
WORKDIR /backend

# Copia apenas os arquivos necessários para instalar as dependências na pasta /backend
COPY package.json /backend/

# Roda o comando para instalar as dependências no contêiner
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . /backend/

# Indica que a aplicação dentro do contêiner é executada na porta 5000.
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]