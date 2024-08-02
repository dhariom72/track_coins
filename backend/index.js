const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const { fetchLatestCoinsData, storeCoins, getStoredCoins, getHistory } = require('./services/stocks.service');
const { connect } = require('./services/database.service');
const cors = require('cors');
const { errorHandler } = require('./middleware/error.middleware');

function init(){
    try{
        connect();
        cron.schedule('* * * * *', fetchLatestCoinsData);
    }
    catch(error){
        console.error(error);
        cron.close()
        process.exit(1);
    }
}

init();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.post('/coins', async(request, response, next) => {
    try{
        await storeCoins();
        return response.status(201).send("coins stored successfully");
    }
    catch(error){
       next(error)
    }
})

app.get('/coins', async (request, response, next) => {
    try{
        const coins = await getStoredCoins();
        return response.status(200).send(coins);
    }
    catch(error){
       next(error);
    }
})

app.get('/coin/:code/history', async (request, response, next) => {
    try{
        const { params } = request;
        const coins = await getHistory(params.code);
        return response.status(200).send(coins);
    }
    catch(error){
       next(error);
    }
})

app.use(errorHandler)

app.listen(port, () => {
    console.log("App is listening on port: " + port);
})