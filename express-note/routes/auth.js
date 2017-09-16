var express = require('express');
var router = express.Router();


var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'f1b587f4857a0989ea0a',
    clientSecret: '7bcf58f740f52c59fe3908110c27f212e125f4da',
    callbackURL: "http://localhost:3001/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
}));

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res) {

    req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    };
    res.redirect('/');
});

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
