import GenericQueries from "./genericQueries.js";
import Product from "../models/Products.js";

export default class ProductService extends GenericQueries{
    constructor(dao){
        super(dao,Product.model)
    }   
}