const crudRepository = require('./crud-repository');
const {User} = require('../models');
class UserRepository extends crudRepository{
    constructor(){
        super(User)
    }
}
module.exports = UserRepository
