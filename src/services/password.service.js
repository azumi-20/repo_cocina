const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

const isMATCH = async(password, hashGuardado) =>{
    return await bcrypt.compare(password, hashGuardado)
}

module.exports = { hashPassword , isMATCH}
