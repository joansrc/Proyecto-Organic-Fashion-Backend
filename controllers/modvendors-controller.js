const vendors = [];

//Post
const createVendor = (request, response) =>{
    const vendor = request.body;
    //console.log(vendor);

    if (!vendor.cedula){
        return response.status(400).send({ ok: false });

    }

    const newVendor = {
        ...vendor,
        id: new Date().getTime(),
    };

    vendors.push(newVendor);
    return response.send({ok: true, vendor: newVendor, vendors});
};

//Get
const readVendors = (request, response) => {
    return response.send({ok:true, vendors});
};

//Patch
const updateVendor = () => {};

//Delete
const deleteVendor = () => {};

module.exports = {
    createVendor,
    readVendors,
    updateVendor,
    deleteVendor,
}