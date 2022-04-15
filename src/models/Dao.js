import mongoose from 'mongoose';
import Product from './Products.js';

export default class Dao{
    constructor(config){
        this.mongoose= mongoose.connect(config.url.session,{useNewUrlParser:true}).catch(error=>{
            console.log(error);
            process.exit();
        })
        const timestamp = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}
        const productSchema = mongoose.Schema(Product.schema,timestamp);

        this.models = {
            [Product.model]:mongoose.model(Product.model,productSchema)
        }
    }
    findOne = async(options,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result  = await this.models[entity].findOne(options);
        return result?result.toObject():null;
    }
    getAll = async(options,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let results = await this.models[entity].find(options);
        return results.map(result=>result.toObject());
    }
    insert = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        try{
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result?result.toObject():null;
        }catch(error){
            logger.log(error);
            return null;
        }
    }
    update = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let id = document._id;
        delete document._id;
        let result = await this.models[entity].findByIdAndUpdate(id,{$set:document},{new:true})
        return result.toObject();
    }
    delete = async(id,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result = await this.models[entity].findByIdAndDelete(id);
        return result?result.toObject():null;
    }
}