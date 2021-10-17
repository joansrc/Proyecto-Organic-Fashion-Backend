const Product = require('../models/modproducts-model');
const products = [];

//Post
const createProduct = (request, response) =>{
    const Product = request.body;
    //console.log(Product);

    if (!Product.descripcion){
        return response.status(400).send({ ok: false });

    }

//con db
    const newProduct = new Product(Product);
    newProduct.save((error,result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);
    });

/* local
    const newProduct = {
        ...Product,
        id: new Date().getTime(),
    };

    products.push(newProduct);
    return response.send({ok: true, Product: newProduct, products});
*/
};


//Get
const readproducts = (request, response) => {
    const id =request.params.id;

    const filter = {};
    if (id){
        filter._id = id;
/*        return response.send({
            ok: true,
            products: products.filter((Product) =>{
                return Product.id.toString() === id; //se paso el id a string por lo del date
            }),
        });*/
    }

    Product.find(filter, (error, result) => {
        if (error){
            return response.status(500).send({ error })
        }
        return response.send(result);
    });

    //return response.send({ok:true, products});
};

//Patch
const updateProduct = (request,response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe el producto'});
    }

    Product.updateOne({ _id:id }, request.body, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }

        Product.find({ _id:id }, (error, result) => {
            if (error){
                return response.status(500).send({ error })
            }
            return response.send(result);
        });


        //return response.send(result);
    });

};

//Delete
const deleteProduct = (request, response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe el producto para eliminar'});
    }

    Product.remove({ _id:id }, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);

    });

};

module.exports = {
    createProduct,
    readproducts,
    updateProduct,
    deleteProduct,
}