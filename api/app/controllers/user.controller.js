const Users = require('../models/user.model');

exports.findOne = (request, response) =>{
    
    //lo busco por la key
    Users.findOne({ user: request.params.user})
    .then( user => {
        
        if(!user){
            return response.status(404).send({
                message: "No se encontro el user con user " + request.params.user 
            })
        }
        response.send(user);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            return response.status(404).send({
                message: "User not found with username " + request.params.user
            });
        }
        return response.status(500).send({
            message: "Error retrieving user " + request.params.user
        });
    })
}

