// backend/routes/authRoutes.js
const passport = require('passport');

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
            // ALTERADO: Redireciona para localhost
            res.redirect('http://localhost:5500/'); 
        }
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            // ALTERADO: Redireciona para localhost
            res.redirect('http://localhost:5500/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};