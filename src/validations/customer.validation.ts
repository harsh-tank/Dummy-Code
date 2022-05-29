import {Joi} from 'celebrate';

const createCustomerSchema = {
    body:{
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        city:Joi.string().required(),
        company:Joi.string().required()
    }
}
const getCustomerSchema = {
    params:{
        id:Joi.number().required()
    }
}
const SearchResults = {
    body:{
        first_name:Joi.string(),
        last_name:Joi.string(),
        city:Joi.string()
    }
}
export default {
    createCustomerSchema,
    getCustomerSchema,
    SearchResults
}