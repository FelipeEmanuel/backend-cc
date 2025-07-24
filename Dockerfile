# Etapa de build
FROM node:20

WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação, incluindo o .env
COPY . .
COPY .env .env

# Transpila o TypeScript
RUN npm run build

# Expõe a porta que o backend escuta (8000)
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]