FROM node:alpine

# Nastavíme výchozí ENV hodnoty
ENV BACKEND_PORT=7070
ENV BACKEND_IP_ADDRESS=localhost
ENV HOST_PORT=5173
ENV HOST_IP_ADDRESS=localhost
ENV MONGO_URI=mongodb://localhost:5050/shop

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]