//might need to import bcrypt
const bcrypt = require("bcrypt");

const createUser = async (user, body) => {
    body.password = bcrypt.hashSync(body.password, 10);
    const result = await user.createNewUser(body);
    delete result.password;
    return result;
}

module.exports = {
    createUser
}