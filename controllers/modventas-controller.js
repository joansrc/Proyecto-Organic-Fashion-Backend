const Venta = require('./../models/modventas-model');
const ventas = [];

//Post
const createVenta = (request, response) =>{
    const venta = request.body;
    //console.log(venta);

    if (!venta.cedulacliente){
        return response.status(400).send({ ok: false });

    }

//con db
    const newVenta = new Venta(venta);
    newVenta.save((error,result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);
    });

};


//Get
const readVentas = (request, response) => {
    const id =request.params.id;

    const filter = {};
    if (id){
        filter._id = id;
/*        return response.send({
            ok: true,
            ventas: ventas.filter((venta) =>{
                return venta.id.toString() === id; //se paso el id a string por lo del date
            }),
        });*/
    }

    Venta.find(filter, (error, result) => {
        if (error){
            return response.status(500).send({ error })
        }
        return response.send(result);
    });

    //return response.send({ok:true, ventas});
};

//Patch
const updateVenta = (request,response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe la venta'});
    }

    Venta.updateOne({ _id:id }, request.body, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }

        Venta.find({ _id:id }, (error, result) => {
            if (error){
                return response.status(500).send({ error })
            }
            return response.send(result);
        });


        //return response.send(result);
    });

};

//Delete
const deleteVenta = (request, response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe el id de la venta'});
    }

    Venta.remove({ _id:id }, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);

    });

};

module.exports = {
    createVenta,
    readVentas,
    updateVenta,
    deleteVenta,
}