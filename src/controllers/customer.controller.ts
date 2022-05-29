import { group } from "console";
import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";
import { NUMBER } from "sequelize";
import models from "../config/model.config";
require("dotenv").config();

type displaydata = {
    first_name:string,
    last_name:string,
    city:string,
    company:string
}

const createCustomer:RequestHandler=async(req,res)=>{
    try{
        req.body.first_name=req.body.first_name[0].toUpperCase()+req.body.first_name.substring(1).toLowerCase();
        req.body.last_name=req.body.last_name[0].toUpperCase()+req.body.last_name.substring(1).toLowerCase();
        const alreadyExist = await models.Customer.findOne({where:{
            first_name:req.body.first_name,
            last_name:req.body.last_name
        }});
        if(alreadyExist)
        {
            return res.status(400).json({message:"Customer already Exist"});
        }
        else
        {
            const User = await models.Customer.create(req.body);
            if(User)
            {
                return res.status(200).json({
                    message:"Customer Created Successfully",
                    data:User
                });
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:error,
        });
    }
}

const getCustomerById:RequestHandler = async(req,res)=>{
    try{
        const findUser = await models.Customer.findOne({where:{
            id:req.params.id
        }})
        if(findUser)
        {
            return res.status(200)
            .json({data:findUser});
        }
        else
        {
            return res.status(404)
            .json({message:"No Customer found with this ID"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:error,
        });
    }
}

const get_Cities_by_No_of_Customer:RequestHandler = async(req,res)=>{
    try {
        const req_data = await models.Customer.findAll({
                group:'city',
                attributes:[
                    'city',
                    [sequelize.fn('COUNT',sequelize.col('city')),'Customers']
                ]
            });
        if(req_data)
        {
            return res.status(200).json(req_data);
        }
        else
        {
            return res.status(404).json({message:"No Data Found"});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            error:error,
        });
    }
}
const search_By_Fields:RequestHandler = async(req,res)=>{
    const displayResult: displaydata[]=[];
    try{
        const allCus = await models.Customer.findAll();
        if(allCus && allCus.length>0)
        {
            for(let x in allCus)
            {
                displayResult.push({
                    first_name:allCus[x].first_name,
                    last_name:allCus[x].last_name,
                    city:allCus[x].city,
                    company:allCus[x].company,
                })
            }

        }
        let filtered_info;
        if(req.body.first_name)
        {
            filtered_info = displayResult.filter(i=>{
                return i.first_name == req.body.first_name
            })
        }
        if(req.body.last_name)
        {
            if(filtered_info)
            {
                filtered_info = filtered_info.filter(i=>{
                    return i.last_name == req.body.last_name
                })
            }
            else
            {
                filtered_info = displayResult.filter(i=>{
                    return i.last_name == req.body.last_name
                })
            }
        }
        if(req.body.city)
        {
            if(filtered_info)
            {
                filtered_info = filtered_info.filter(i=>{
                    return i.city == req.body.city
                })
            }
            else
            {
                filtered_info = displayResult.filter(i=>{
                    return i.city == req.body.city
                })
            }
        }
        // Adding pagination
        const page = Number.parseInt((req.query as any).page);
        const limit = Number.parseInt((req.query as any).limit);
        
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;

        const results:any = {}
        if(startIndex>0)
        {
            results.previous ={
                page:page-1,
                limit:limit
            }
        }
        if(endIndex<filtered_info.length)
        {
            results.next ={
                page:page+1,
                limit:limit
            }
        }
        results.results = filtered_info.slice(startIndex,endIndex);
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error:error,
        });
    }
}

export default{
    createCustomer,
    getCustomerById,
    get_Cities_by_No_of_Customer,
    search_By_Fields
}