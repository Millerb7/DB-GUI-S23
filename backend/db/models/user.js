const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const table = "users";

class users {
    async createNewUser(body) {
        const insert = await knex(table).insert({...body});
        const result = await this.findUserByUsername(body.username);
        return result;
    }

    async findUserByUsername(username) {
        let result = await knex(table).where({username});
        result = result[0];
        return result;
    }
}

module.exports = users;