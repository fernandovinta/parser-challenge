const async = require('async');
const request = require('request');
const express = require('express')

let getApi = function (socialNetwork, callback) {
    request({url: 'http://codefight.davidbanham.com/' + socialNetwork}, (err, response, body) => {
        try {
            callback(err, {[socialNetwork]:JSON.parse(body)});
        } catch (e) {
            getApi(socialNetwork, callback); 
        }
    });
};

const functionArray = ["twitter", "facebook", "instagram"].map((socialNetwork) => { 
    return (callback) => getApi(socialNetwork, callback); 
});

const app = express()

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    async.parallel(functionArray, (err, results) => {
        let response = {}
        results.forEach((item)=>{
            response[Object.keys(item)[0]] = Object.values(item)[0]
        })
        res.end(JSON.stringify(response));
    });
})

app.listen(3000)

module.exports = app;