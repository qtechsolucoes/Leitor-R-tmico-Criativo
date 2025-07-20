// /services/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // Salva o ID do usuário do nosso DB na sessão
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user); // Recupera o usuário completo a partir do ID da sessão
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            // Esta função é chamada quando o Google retorna os dados do usuário
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // Já temos um usuário com este ID
                return done(null, existingUser);
            }

            // Não temos, então criamos um novo
            const user = await new User({ 
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            }).save();
            done(null, user);
        }
    )
);