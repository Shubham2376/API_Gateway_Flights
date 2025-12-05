const crudRepository = require('./crud-repository');
const {Role} = require('../models');
class RoleRepository extends crudRepository{
    constructor(){
        super(Role)
    }
    async getRoleByName(name){
        // we can't do findByPK() because when user sign in it can't send primary key(id)
        const role = await Role.findOne({where:{name:name}});
        return role;
    }
}
module.exports = RoleRepository
