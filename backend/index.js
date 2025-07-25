// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Importa os arquivos de configuração (a ordem é importante)
require('./models/User');
require('./models/Rhythm'); // NOVO: Importa o modelo de Ritmo
require('./services/passport'); 
const authRoutes = require('./routes/authRoutes');
const rhythmRoutes = require('./routes/rhythmRoutes'); // NOVO: Importa as rotas de Ritmo


// Conexão com o banco de dados
// AVISO: A opção 'tlsAllowInvalidCertificates' não deve ser usada em produção.
// Remova-a ou configure certificados válidos para o seu ambiente de produção.
mongoose.connect(process.env.MONGO_URI, {
  ssl: true
});

const app = express();

app.use(express.json());

app.set('trust proxy', 1);

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://127.0.0.1:5500', 
        credentials: true
    })
);

app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            sameSite: 'lax'
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Inicia as rotas
authRoutes(app);
rhythmRoutes(app); // NOVO: Inicia as rotas de Ritmo

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});