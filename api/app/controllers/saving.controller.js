const Saving = require('../models/saving.model');

exports.create = (request, response) =>{
    // valido request
    if(!request.body){
        return response.status(400).send({
            message: "Saving content can not be empty"
        })
    }

    //creo el saving
    const saving = new Saving({
        userName: request.body.userName,
        userId: request.body.userId,
        amount: request.body.amount,
        months: request.body.months,
        date: {
            day: request.body.date.day,
            month: request.body.date.month
        }
    })

    // guardo el saving

    saving.save()
    .then(data => {
        response.send(data);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Ocurrio un error mientras se creaba un Saving"
        })
    })
}

exports.findAll = (request, response) =>{
    //encuentro todos los savings
    Saving.find()
    .then(saving => {
        response.send(saving);
    }).catch(error => {
        //los envio a la respuesta
        response.status(500).send({
            message: error.message || "Ocurrio un error al traer los savings"
        });
    });
}

exports.findOne = (request, response) =>{
    
    //lo busco por la key
    Saving.findOne({ userId: request.params.userId})
    .then( saving => {
        if(!saving){
            return response.status(404).send({
                message: "No se encontro el saving con user Id " + request.params.userId 
            })
        }
        response.send(saving);
    }).catch(error => {
        if(error.kind === 'ObjectId') {
            return response.status(404).send({
                message: "Saving not found with id " + request.params.userId
            });
        }
        return response.status(500).send({
            message: "Error retrieving note with id " + request.params.userId
        });
    })
}

exports.update = (request, response) =>{
    // valido request
    if(!request.body){
        return response.status(400).send({
            message: "Note content can not be empty"
        })
    }

    //encontrar un saving y actualizar con el request.body
    Saving.findOneAndReplace(request.body.userId, {
        userName: request.body.userName,
        userId: request.body.userId,
        amount: request.body.amount,
        months: request.body.months,
        date: {
            day: request.body.date.day,
            month: request.body.date.month
        }
    }, {new: true})
    .then(saving => {
        if(!saving){
            return response.status(404).send({
                message: "Saving not found with id " + request.params.userId
            });  
        }
        response.send(saving);
    })
    .catch(error => {
        if(error.kind === 'ObjectId' || error.kind === 'NotFound') {
            return response.status(404).send({
                message: "Saving not found with id " + request.params.userId
            });                
        }
        return response.status(500).send({
            message: "Could not delete saving with id " + request.params.userId
        });
    });
}
