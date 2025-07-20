// /routes/authRoutes.js
const passport = require('passport');

module.exports = app => {
    // Rota para iniciar o processo de login com o Google
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'] // Informações que pedimos ao Google
        })
    );

    // Rota de callback que o Google chama após o login
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            // CORRIGIDO: Redireciona para o endereço do seu frontend
            res.redirect('http://127.0.0.1:5500/'); 
        }
    );

    // Rota para fazer logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('http://127.0.0.1:5500/'); // Também redireciona para o frontend após o logout
    });

    // Rota para verificar quem é o usuário logado
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};