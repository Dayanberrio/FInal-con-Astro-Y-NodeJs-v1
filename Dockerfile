# Utiliza la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY ./src ./src
COPY ./mysql-init ./mysql-init

# Compila el código TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
