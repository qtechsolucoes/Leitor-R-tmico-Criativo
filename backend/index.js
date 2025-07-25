// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path'); // Módulo do Node.js para lidar com caminhos de arquivos
require('dotenv').config();

// 1. Importa os modelos e serviços
require('./models/User');
require('./models/Rhythm'); 
require('./services/passport'); 
const authRoutes = require('./routes/authRoutes');
const rhythmRoutes = require('./routes/rhythmRoutes'); 

// 2. Conexão com o banco de dados
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leitorRitmico', {
  ssl: true
}).then(() => {
    console.log('Conectado ao MongoDB com sucesso.');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

const app = express();

// 3. Configuração dos Middlewares
app.use(cors()); // Pode ser simplificado agora, mas mantemos por segurança
app.use(express.json());

app.use(
    session({
        secret: process.env.COOKIE_KEY || 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
            sameSite: 'lax'
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// 4. Inicia as Rotas da API
authRoutes(app);
rhythmRoutes(app);

// --- NOVA LÓGICA PARA SERVIR O FRONTEND ---
// Esta seção serve os arquivos estáticos (HTML, CSS, JS do frontend)
// Ele assume que a sua estrutura de pastas é:
// /LEITOR RITMICO CRIATIVO/
//   -> /backend/
//   -> index.html
//   -> style.css
//   -> /src/
app.use(express.static(path.join(__dirname, '..')));

// Esta rota "catch-all" garante que se o utilizador recarregar a página,
// o index.html seja servido, permitindo que o roteamento do frontend funcione.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});
// -----------------------------------------

// 5. Inicia o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});