# Serviço de trackeamento de entregas

Aplicação backend para rastreamento em tempo real de entregas utilizando:

- 🐇 RabbitMQ para mensagens de localização
- 📡 Socket.IO para envio em tempo real ao cliente
- 🗺️ Google maps para visualização de mapa no frontend
- 📦 PostgreSQL para persistência de dados

---

## 🚀 Funcionalidades

- 🔄 Consome mensagens de localização via RabbitMQ
- 💬 Envia atualizações em tempo real com Socket.IO
- 📍 Visualiza entregas em um mapa com Google maps
- 🔄 Permite visualização prévia da rota de entrega (geocodificação)

---

## 🧱 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript (ESM)**
- **PostgreSQL**
- **RabbitMQ (amqplib)**
- **Socket.IO**
- **Google Maps**

---

## 🗂 Estrutura de Pastas

```bash
/tracking-service
│
├── public/ # Mapa estático (HTML + Leaflet)
│ └── map.html
│
├── src/
│ ├── config/ # Configurações globais
│ ├── consumers/ # Integração com RabbitMQ
│ ├── controllers/ # Controladores de rota
│ ├── http/ #Servidor express HTTP
│ ├── routes/ # Rotas HTTP
│ ├── services/ # Lógica de negócio
│ ├── sockets/ # Integração com Socket.IO
│
├── .env # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/TRACKIO-DELIVERY/tracking-service.git
cd tracking-service

# 2. Instalar dependências
npm install

# 4. Crie um arquivo .env

# 5. Rodar em modo desenvolvimento
npm run dev
```
