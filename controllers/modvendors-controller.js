const vendors = [];

//Post
const createVendor = (request, response) =>{
    const vendor = request.body;
    console.log(vendor);
    vendors.push(vendor);
    return response.send({ok: true, vendor, vendors});
};

//Get
const readVendor = () => {};

//Patch
const updateVendor = () => {};

//Delete
const deleteVendor = () => {};

module.exports = {
    createVendor,
    readVendor,
    updateVendor,
    deleteVendor,
}