# Serviço de trackeamento de entregas

Aplicação backend para rastreamento em tempo real de entregas utilizando:

- 🐇 RabbitMQ para mensagens de localização
- 📡 Socket.IO para envio em tempo real ao cliente
- 🗺️ Leaflet para visualização de mapa no frontend
- 📦 PostgreSQL para persistência de dados
- 📍 OpenCage Geocoding API para converter endereços em coordenadas

---

## 🚀 Funcionalidades

- 🔄 Consome mensagens de localização via RabbitMQ
- 💬 Envia atualizações em tempo real com Socket.IO
- 📍 Visualiza entregas em um mapa com Leaflet
- 🔄 Permite visualização prévia da rota de entrega (geocodificação)

---

## 🧱 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript (ESM)**
- **PostgreSQL**
- **RabbitMQ (amqplib)**
- **Socket.IO**
- **Leaflet.js**
- **OpenCage Geocoding API**

---

## 🗂 Estrutura de Pastas

/tracking-service
│
├── public/ # Mapa estático (HTML + Leaflet)
│ └── map.html
│
├── src/
│ ├── config/ # Configurações globais
│ ├── consumers/ # Integração com RabbitMQ
│ ├── controllers/ # Controladores de rota
│ ├── routes/ # Rotas HTTP
│ ├── services/ # Lógica de negócio
│ ├── sockets/ # Integração com Socket.IO
│
├── .env # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md

## 🧪 Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/TRACKIO-DELIVERY/tracking-service.git
cd tracking-service

# 2. Instalar dependências
npm install

# 3. Gerar dist
npm run build

# 4. Crie um arquivo .env

# 5. Rodar em modo desenvolvimento
npm run dev
```
