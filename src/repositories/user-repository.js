const crudRepository = require('./crud-repository');
const {User} = require('../models');
class UserRepository extends crudRepository{
    constructor(){
        super(User)
    }
    async getUserByEmail(email){
        // we can't do findByPK() because when user sign in it can't send primary key(id)
        const user = await User.findOne({where:{email:email}});
        return user;
    }
}
module.exports = UserRepository
