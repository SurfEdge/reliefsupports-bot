'use strict';

var utils = require('./lib/utils.js');
var querystring = require('querystring');
var http = require('http');

// Add Donations
module.exports.new = (event, context, callback) => {
    var data = JSON.parse('{"' + decodeURI(event.body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    data.type= 'Donations';
    data.address= data.addresss;
    data.city= data.town;
    data.created_at= new Date().getTime() ;
    data.udpated_at= new Date().getTime() ;

    var data_query = querystring.stringify(data);

    var options = {
        host: 'reliefsupports.org',
        path: '/api/v1/entry/donations',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data_query)
        }
    };
    console.log("query: " + data_query);

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
            console.log("data: " + data);
            utils.add(event,'data',data,callback);
        });
    });

    req.write(data_query);
    req.end();
};

// Add Needs
module.exports.newneeds = (event, context, callback) => {
    var data = JSON.parse('{"' + decodeURI(event.body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    
    data.type = 'Needs';
    data.address= data.addresss;
    data.addresss = undefined;
    data.city= data.town;
    data.created_at= new Date().getTime() ;
    data.udpated_at= new Date().getTime() ;
    var data_query = querystring.stringify(data);

    var options = {
        host: 'reliefsupports.org',
        path: '/api/v1/entry/needs',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data_query)
        }
    };
    console.log("query: " + data_query);

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
            console.log("data: " + data);
            utils.add(event,'data',data,callback);
        });
    });

    req.write(data_query);
    req.end();

};

// View All
module.exports.view = (event, context, callback) => {
   utils.find(event,'data',{},{_id: -1},callback);
};
