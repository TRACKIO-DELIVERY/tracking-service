# Serviço de trackeamento de entregas

Aplicação backend para rastreamento em tempo real de entregas utilizando:

- 🐇 RabbitMQ para comunicação com serviço de pedidos
- 🗺️ Google maps para visualização de mapa no frontend
- 📡 Socket.IO para comunicação em tempo real entre mapa e applicativo
- 📦 PostgreSQL para coletar coordenadas inicias

---

## 🚀 Funcionalidades

- 💬 Cria salas e eventos de um pedido para sockets se comunicarem e compartilharem localizacao 
- 🔄 Permite visualização prévia da rota de entrega e localização do entregador em tempo real
- 🔄 Envia mensagens de atualizações do pedido via RabbitMQ
- 📍 Visualiza entregas em um mapa com Google maps

---

## 🧱 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript (ESM)**
- **Socket.IO**
- **Google Maps**
- **RabbitMQ (amqplib)**
- **PostgreSQL**

---

## 🗂 Estrutura de Pastas

```bash
/tracking-service
│
├── public/ # Mapa estático (HTML + Google maps)
│ └── map.html
│
├── src/
│ ├── broker/ # Consumers e senders de filas RabbitMQ
│ ├── config/ # Configurações globais
│ ├── controllers/ # Controladores de rota
│ ├── db/ # Configuracao do banco de dados 
│ ├── http/ #Servidor express HTTP
│ ├── middleware/ # Middleware de autenticação das rotas
│ ├── routes/ # Rotas HTTP
│ ├── sockets/ # Integração com Socket.IO
│
├── .env # Variáveis de ambiente
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.md
└── README.md
```

## 🧪 Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/TRACKIO-DELIVERY/tracking-service.git
cd tracking-service

# 2. Buildar compose
docker compose build

# 3. Rodar compose
docker compose up -d
