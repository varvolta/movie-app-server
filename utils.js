const jwt = require('jsonwebtoken')

module.exports.generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' })
}
