import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>console.log(`Listening on PORT: ${PORT}`));

const schema = buildSchema(`
    type Product{
        id:Int
        name:String
        price:Int
    }
    type Query{
        getProducts:[Product]
        productById(id:Int):Product
    }
    type Mutation{
        addProduct(name:String,price:Int):Product
    }
`)
app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema
}))
