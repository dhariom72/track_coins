const axios = require('axios');
const { Coins } = require('../models/coins.model');
const { History } = require('../models/history.model');

const fetchLatestCoinsData = async () => {

    try{
        const coins = await getStoredCoins();
        
        if(!coins) return;
        if(!coins.length) return;

        for(const coin of coins){
            const startTime =  Date.now();
            const endTime = startTime + 60 * 1000; 

            const response = await axios.post("https://api.livecoinwatch.com/coins/single/history", {
                currency: "USD",
                code: coin.code,
                start: startTime,
                end: endTime,
                meta: false,
            }, {
                headers : {
                    "content-type": "application/json",
                    "x-api-key": process.env.KEY,
            }});

            if(response.data?.history && response.data?.history?.length){
                console.log(response.data?.history?.length);
                await storeHistory(response.data?.history, coin.code);
            }
            
        }

        console.log("Batch proccesed")

    }
    catch(error){
        console.log(error);
    }
}

const storeHistory = async (coinHistory, code) => {
    try{
        const newHistory = coinHistory.map(h => Object.assign({}, {...h, code : code}))
        await History.create(newHistory);
        console.log("History created for coin", code)
    }
    catch(error){
        throw error;
    }
}

const getHistory = async (code) => {
    try{
        const result = await History.find({'code': code}).sort([['createdAt', 1]]).limit(20);
        return result;
    }
    catch(error){
        throw error;
    }
}

const getCoins = async () => {
    try{
        const response = await axios.post("https://api.livecoinwatch.com/coins/list",{
            "currency": "USD",
            "sort": "rank",
            "order": "ascending",
            "offset": 0,
            "limit": 5,
            "meta": false
        }, {
            headers : {
                "content-type": "application/json",
                "x-api-key": process.env.KEY,
        }});
       return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const storeCoins = async () => {
    try{
        const coinsFromApi = await getCoins();
        await Coins.create(coinsFromApi);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const getStoredCoins = async () => {
    try{
        const coins = await Coins.find();
        return coins;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    fetchLatestCoinsData : fetchLatestCoinsData,
    storeCoins: storeCoins,
    getStoredCoins: getStoredCoins,
    getHistory: getHistory
}