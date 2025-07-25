// backend/routes/authRoutes.js
const passport = require('passport');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

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
            // Em vez de um valor fixo, use uma variável de ambiente para produção
            res.redirect(process.env.CLIENT_URL || 'http://127.0.0.1:5500/'); 
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
             // Em vez de um valor fixo, use uma variável de ambiente para produção
            res.redirect(process.env.CLIENT_URL || 'http://127.0.0.1:5500/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.post('/api/add_points', requireLogin, async (req, res) => {
        const { points } = req.body;

        if (typeof points !== 'number' || points <= 0) {
            return res.status(400).send({ error: 'Pontuação inválida.' });
        }

        try {
            req.user.points += points;
            const updatedUser = await req.user.save();
            res.send(updatedUser);
        } catch (err) {
            res.status(500).send({ error: 'Erro ao salvar a pontuação.' });
        }
    });
};