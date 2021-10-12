const Vendor = require('./../models/modvendors-model');
const vendors = [];

//Post
const createVendor = (request, response) =>{
    const vendor = request.body;
    //console.log(vendor);

    if (!vendor.cedula){
        return response.status(400).send({ ok: false });

    }

//con db
    const newVendor = new Vendor(vendor);
    newVendor.save((error,result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);
    });

/* local
    const newVendor = {
        ...vendor,
        id: new Date().getTime(),
    };

    vendors.push(newVendor);
    return response.send({ok: true, vendor: newVendor, vendors});
*/
};


//Get
const readVendors = (request, response) => {
    const id =request.params.id;

    const filter = {};
    if (id){
        filter._id = id;
/*        return response.send({
            ok: true,
            vendors: vendors.filter((vendor) =>{
                return vendor.id.toString() === id; //se paso el id a string por lo del date
            }),
        });*/
    }

    Vendor.find(filter, (error, result) => {
        if (error){
            return response.status(500).send({ error })
        }
        return response.send(result);
    });

    //return response.send({ok:true, vendors});
};

//Patch
const updateVendor = (request,response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe el vendedor'});
    }

    Vendor.updateOne({ _id:id }, request.body, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }

        Vendor.find({ _id:id }, (error, result) => {
            if (error){
                return response.status(500).send({ error })
            }
            return response.send(result);
        });


        //return response.send(result);
    });

};

//Delete
const deleteVendor = (request, response) => {
    const id = request.params.id;
    if (!id){
        return response.status(400).send({ error: 'No existe el vendedor para eliminar'});
    }

    Vendor.remove({ _id:id }, (error, result) => {
        if (error){
            return response.status(500).send({ error });
        }
        return response.send(result);

    });

};

module.exports = {
    createVendor,
    readVendors,
    updateVendor,
    deleteVendor,
}