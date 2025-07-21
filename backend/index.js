// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Importa os arquivos de configuração (a ordem é importante)
require('./models/User');
require('./services/passport'); 
const authRoutes = require('./routes/authRoutes');

// Conexão com o banco de dados
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

// --- NOVO: Middleware para interpretar o corpo das requisições como JSON ---
app.use(express.json());

// Confiar no proxy para que os cookies seguros funcionem corretamente
app.set('trust proxy', 1);

// Usar o cors ANTES de qualquer outra configuração de sessão ou rotas
app.use(
    cors({
        origin: 'http://localhost:5500', // Permite que o seu frontend faça requisições
        credentials: true // Permite que o frontend envie cookies
    })
);

// Configuração da sessão com opções explícitas para o cookie
app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        }
    })
);


// Inicializa o Passport
app.use(passport.initialize());
app.use(passport.session());

// Inicia as rotas
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});