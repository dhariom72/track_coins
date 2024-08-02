import axios from 'axios';

export async function getCoins(){
    return axios.get('http://localhost:3000/coins');
}

export async function getHistory(code){
    return axios.get(`http://localhost:3000/coin/${code}/history`);
}