// backend/routes/authRoutes.js
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Middleware para verificar se o utilizador está logado
const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'Você precisa estar logado!' });
    }
    next();
};


module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:5500/'); 
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('http://localhost:5500/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    // --- NOVA ROTA PARA ADICIONAR PONTOS ---
    app.post('/api/add_points', requireLogin, async (req, res) => {
        const { points } = req.body;

        // Validação para garantir que os pontos são um número positivo
        if (typeof points !== 'number' || points <= 0) {
            return res.status(400).send({ error: 'Pontuação inválida.' });
        }

        try {
            // Adiciona os novos pontos à pontuação existente do utilizador
            req.user.points += points;
            // Salva o utilizador atualizado na base de dados
            const updatedUser = await req.user.save();
            // Envia o perfil do utilizador atualizado de volta para o frontend
            res.send(updatedUser);
        } catch (err) {
            res.status(500).send({ error: 'Erro ao salvar a pontuação.' });
        }
    });
};