const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ msg: 'Invalid Admin Token' });
    }
};
module.exports = isAdmin