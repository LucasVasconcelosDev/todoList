# Usa a imagem Node como base para construção, AS builder define o estágio como para construção
FROM node:20 AS builder

# Cria a pasta /frontend dentro do contêiner e entra nela
WORKDIR /frontend

# Copia apenas os arquivos necessários para instalar as dependências na pasta /frontend
COPY package.json /frontend/

# Roda o comando para instalar as dependências no contêiner
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . /frontend/

# Gera a versão otimizada para produção
RUN npm run build

# Usa uma imagem do nginx alpine (versão leve do Alpine Linux) para servidor do front
FROM nginx:alpine

# Remove o arquivo de configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Coloca o arquivo de configuração personalizada
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Copia da pasta onde o frontend foi construído os arquivos necessários para a produção no servidor
COPY --from=builder /frontend/build /usr/share/nginx/html

# Indica que a aplicação dentro do contêiner é executada na porta 80, que é a porta do nginx.
EXPOSE 80
