function errorHandler(error, request, response, next){
    console.log(error);
    if(error.response){
        return response.status(error.response.status).send("Coins could be fetched");
    }
    else if(error.request){
        return response.status(400).send("could not connect to provider");
    }
    else{
        return response.status(500).send("Internal server error");
    }
}

module.exports.errorHandler = errorHandler;