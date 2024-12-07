const axios = require('axios');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
const steamapi = 'https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/';
const csgo = 730; // may change

async function getmarketprice(markethashname) {
    try {
        const response = await axios.get(steamapi, {
            params: {
                appid: csgo,
                market_hash_name: markethashname
            }
        });
        if (response.data && response.data.result) {
            const prices = response.data.result.assets;
            console.log('prices for', markethashname);
            prices.forEach(price => {
                console.log(`price -> ${price.price} ${price.currency}`);
            });
        } else { console.log('no prices available for this item'); }
    } catch (error) {
        console.log(error);
    }
}

rl.question('enter the market item name -> ', (input) => {
    const markethashname = encodeURIComponent(input.trim());
    console.log(`fetching price for item -> ${markethashname}`);
    getmarketprice(markethashname);
    rl.close();
});
