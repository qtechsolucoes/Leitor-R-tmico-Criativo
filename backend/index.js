// index.js (Backend)
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // 1. Importe o cors
require('dotenv').config();

require('./models/User');
require('./services/passport'); 
const authRoutes = require('./routes/authRoutes');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

// 2. Use o cors ANTES de qualquer outra configuração de sessão ou rotas
app.use(
    cors({
        origin: 'http://127.0.0.1:5500', // Permite que o seu frontend faça requisições
        credentials: true // Permite que o frontend envie cookies
    })
);


app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});