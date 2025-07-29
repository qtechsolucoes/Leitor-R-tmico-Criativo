// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // 1. IMPORTAR O MONGOSTORE
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

require('./models/User');
require('./models/Rhythm'); 
require('./services/passport'); 
const authRoutes = require('./routes/authRoutes');
const rhythmRoutes = require('./routes/rhythmRoutes'); 

const connectionPromise = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leitorRitmico', {
  ssl: true
}).then(m => {
    console.log('Conectado ao MongoDB com sucesso.');
    return m.connection.getClient(); // Retorna o cliente MongoDB
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1); // Encerra a aplicação se não conseguir conectar
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5000', // Permite requisições do seu frontend
    credentials: true // Essencial para cookies de sessão funcionarem
}));
app.use(express.json());

app.use(
    session({
        secret: process.env.COOKIE_KEY || 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        // 2. CONFIGURAR O ARMAZENAMENTO DA SESSÃO NO MONGODB
        store: MongoStore.create({
            clientPromise: connectionPromise, // Usa a conexão existente
            mongoUrl: process.env.MONGO_URI,
            dbName: 'leitorRitmico',
            collectionName: 'sessions', // Nome da coleção para guardar as sessões
            stringify: false,
        }),
        cookie: {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
rhythmRoutes(app);

app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});