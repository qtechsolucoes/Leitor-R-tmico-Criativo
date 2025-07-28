const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

// É uma boa prática carregar os modelos uma vez e depois acessá-los via mongoose.model()
// Isto evita potenciais problemas em ambientes de teste ou com lógicas de importação complexas.
const Rhythm = mongoose.model('rhythms');
const User = mongoose.model('users');

module.exports = app => {
    /**
     * @route   GET /api/rhythms
     * @desc    Obter todos os ritmos salvos pelo utilizador autenticado
     * @access  Private
     */
    app.get('/api/rhythms', requireLogin, async (req, res) => {
        try {
            // A query encontra todos os ritmos onde o campo '_user' corresponde ao ID do utilizador logado.
            // O '.select({ pattern: 1, name: 1, timeSignature: 1 })' otimiza a query para retornar apenas os campos necessários.
            const rhythms = await Rhythm.find({ _user: req.user.id }).select({
                pattern: 1,
                name: 1,
                timeSignature: 1
            });
            res.send(rhythms);
        } catch (err) {
            res.status(500).send({ error: 'Ocorreu um erro ao buscar os ritmos.' });
        }
    });

    /**
     * @route   POST /api/rhythms
     * @desc    Salvar um novo ritmo para o utilizador autenticado
     * @access  Private
     */
    app.post('/api/rhythms', requireLogin, async (req, res) => {
        const { name, pattern, timeSignature } = req.body;

        // Validação básica para garantir que os campos essenciais existem
        if (!name || !pattern || !timeSignature) {
            return res.status(400).send({ error: 'Dados incompletos. É necessário nome, padrão e fórmula de compasso.' });
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
            res.status(201).send(rhythm); // 201 Created é o status mais apropriado aqui
        } catch (err) {
            res.status(422).send({ error: 'Não foi possível salvar o ritmo.', details: err.message });
        }
    });

    /**
     * @route   POST /api/lessons/complete
     * @desc    Marcar uma lição como concluída para o utilizador autenticado
     * @access  Private
     */
    app.post('/api/lessons/complete', requireLogin, async (req, res) => {
        const { lessonIndex } = req.body;

        // Validação simples para garantir que o índice é um número
        if (typeof lessonIndex !== 'number') {
            return res.status(400).send({ error: 'Índice da lição inválido.' });
        }

        try {
            // Encontra o utilizador e atualiza o seu progresso
            // $addToSet garante que o mesmo índice não seja adicionado múltiplas vezes
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                { $addToSet: { completedLessons: lessonIndex } },
                { new: true } // Retorna o documento do utilizador atualizado
            );
            res.send(updatedUser);
        } catch (err) {
            res.status(500).send({ error: 'Erro ao salvar o progresso da lição.' });
        }
    });
};