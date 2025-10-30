export function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.send('only users can use it')
    }
}