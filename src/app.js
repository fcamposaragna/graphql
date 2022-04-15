import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { productService } from './services/services.js'
const app = express();
const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>console.log(`Listening on PORT: ${PORT}`));

const schema = buildSchema(`
    type Product{
        _id:ID
        nombre:String,
        descripcion:String,
        codigo:String,
        thumbnail:String,
        precio:Int,
        stock:Int
    }
    type Query{
        getProducts:[Product]
        productById(id:Int):Product
    }
    type Mutation{
        addProduct(name:String,price:Int):Product
    }
`)

const root = {
    getProducts: async ()=>{
        productService.getAll().then(result=>{
            console.log(result)
            return result
        })
    },
    productById:async (data)=>{
        return await productService.getBy({_id:data})
    },
    addProduct:async (data)=>{
        let product = await productService.save(data);
        return product
    }
}

app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue:root,
    graphiql:true
}))

app.get('/',(req,res)=>{
    res.send({message:"Ingresa a /graphql"})
})
