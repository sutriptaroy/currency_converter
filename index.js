const express = require('express')
const axios = require('axios');

const app = express()

async function getConvertion(amount, currencyName) {
    const options = {
        method: 'GET',
        url: `https://api.apilayer.com/currency_data/convert?to=${currencyName}&from=USD&amount=${amount}`,
        headers: {
            'apikey': 'fELWUVqkb0bdDWFBoX0ryr6k5mTFBG2f'
        }
    }

    try {
        const convertedResult = await axios(options);
        const convertedData = convertedResult.data;
        return convertedData;
    } catch (e) {
        return new Error(e);
    }
}

app.get('/convert-currency/:amount/:currency', async (req, res) => {
    const amount = req.params.amount;
    const currencyName = req.params.currency;

    const convertedAmount = await getConvertion(amount, currencyName);

    if (convertedAmount.result) {
        const resp = `${amount} USD = ${convertedAmount.result} ${currencyName}`
        res.send(resp);
    } else {
        const err = convertedAmount.error ? convertedAmount.error.info : convertedAmount
        res.send(`Error occured > ${err}`);
    }
})

app.listen(3000, () => {
    console.log('Server started on 3000')
}).on('error', () => {
    console.log('Server can\'t be started')
})
