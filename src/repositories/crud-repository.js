const {StatusCodes} = require('http-status-codes')
const {Logger} = require('../config');
const AppError = require('../utils/errors/app-error');
class crudRepository{
    constructor(model){
        this.model = model
    }
    async create(data){
        console.log("Inside repository");
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data){
            const response = await this.model.destroy({
                where : {
                    id : data
                }
            });
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response
    }

    async get(data){
            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response
    }

    async getAll(){
            const response = await this.model.findAll();
            return response
    }

    async update(id,data){ // data that we passing should be object i.e data->{col:value,.....}
            const response = await this.model.update(data,{
                where : {
                    id : id
                }
            });
            return response
    }
}

module.exports = crudRepository
