export function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role=='admin') {
        next();
    } else {
        return res.send('only admins can use it')
    }
}