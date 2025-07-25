// backend/routes/rhythmRoutes.js
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Rhythm = mongoose.model('rhythms');

module.exports = app => {
    // Rota para buscar todos os ritmos do utilizador logado
    app.get('/api/rhythms', requireLogin, async (req, res) => {
        const rhythms = await Rhythm.find({ _user: req.user.id });
        res.send(rhythms);
    });

    // Rota para salvar um novo ritmo
    app.post('/api/rhythms', requireLogin, async (req, res) => {
        const { name, pattern, timeSignature } = req.body;

        if (!name || !pattern || !timeSignature) {
            return res.status(400).send({ error: 'Faltam dados para salvar o ritmo.' });
        }

        const rhythm = new Rhythm({
            name,
            pattern,
            timeSignature,
            _user: req.user.id,
            createdAt: new Date()
        });

        try {
            await rhythm.save();
            res.send(rhythm);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};