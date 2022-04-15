import Dao from "../models/Dao.js";
import ProductService from './products.js'
import config from '../config/config.js';


const dao = new Dao(config.mongo);

export const productService = new ProductService(dao)