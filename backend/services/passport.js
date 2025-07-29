// /services/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
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
            const userEmail = profile.emails[0].value;
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // Se o usuário já existe, atualiza a sua função caso o email de admin tenha mudado
                existingUser.role = userEmail === process.env.ADMIN_EMAIL ? 'admin' : 'user';
                await existingUser.save();
                return done(null, existingUser);
            }

            // Se for um novo usuário, define a sua função na criação
            const user = await new User({ 
                googleId: profile.id,
                displayName: profile.displayName,
                email: userEmail,
                photo: profile.photos[0].value,
                // Define a função com base no email
                role: userEmail === process.env.ADMIN_EMAIL ? 'admin' : 'user'
            }).save();
            done(null, user);
        }
    )
);