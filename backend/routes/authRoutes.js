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
            req.session.save(() => {
                // CORRIGIDO: Redireciona para a raiz '/' do servidor atual (localhost:5000)
                res.redirect('/'); 
            });
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.save(() => {
                // CORRIGIDO: Redireciona para a raiz '/' do servidor atual (localhost:5000)
                res.redirect('/');
            });
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user || null);
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