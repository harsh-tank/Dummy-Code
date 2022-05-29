import express from "express"; 
import { celebrate } from 'celebrate';
import customerSchema from "../validations/customer.validation";
import customerController from "../controllers/customer.controller";
const router: express.Router = express.Router();

const {
    createCustomerSchema,
    getCustomerSchema,
    SearchResults
} = customerSchema

//Create Customer Route
router.post('/create_customer',celebrate(createCustomerSchema),customerController.createCustomer);
//Get Customer By ID
router.get('/get_cus_by_id/:id',celebrate(getCustomerSchema),customerController.getCustomerById);
//Get Unique Cities with Customer Count
router.get('/get_cities_with_cus',customerController.get_Cities_by_No_of_Customer);
//Search By Fields
router.post('/search_results',celebrate(SearchResults),customerController.search_By_Fields);

export=router;