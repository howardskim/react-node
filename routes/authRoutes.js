const passport = require('passport');
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }), (req, res) => {
        res.redirect('/survey')
    })

    app.get('/api/logout', (req, res) => {
        console.log('/api/logout req', req)
        req.logout();
        res.redirect('/')
    })

    app.get('/api/current_user', (req, res) =>{
        res.send(req.user)
    })
}