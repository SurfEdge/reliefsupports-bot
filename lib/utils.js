'use strict';

var conf = require('./conf.js');

var mongodb = require('mongodb'); 

var MongoClient = mongodb.MongoClient, 
assert = require('assert');

module.exports.add = function(event, col, data, callback) {
    MongoClient.connect(conf.db_url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection(col);      
      collection.insert( data , function(err, result) {
        db.close();
        var status = false;
        if(result.insertedCount == 1){
          status = true;
        }
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            status: status,
            data: data,
          }),
        };
        console.log(response);

        callback(null, response);
      });
    });
};

module.exports.find = function(event,col,query,sort,callback) {
    // Use connect method to connect to the server
    MongoClient.connect(conf.db_url, function(err, db) {
      assert.equal(null, err);

      console.log("Connected successfully to server");

      var collection = db.collection(col);

      collection.find(query).sort(sort).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        var status = false;
        if(docs.length > 0 ){
          status = true;
        }
        db.close();
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            status : status,
            data: docs,
          }),
        };
        console.log(response)
        callback(null, response );
      });
    });
};
module.exports.findOne = function(event,col,query,sort,message,callback) {
    MongoClient.connect(conf.db_url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server : Find One");
      var collection = db.collection(col);
       collection.findOne(query, function(err, docs) {
          console.log("Found the following records");
          console.log(docs);
          var status = false;
          if(docs){
            status = true;
          }else{
            docs= message;
          }
          db.close();
          const response = {
            statusCode: 200,
            body: JSON.stringify({
              status : status,
              data: docs,
            }),
          };
          callback(null, response )
      });
    });
};

module.exports.update = function(event, callback,col,id, update) {
    MongoClient.connect(conf.db_url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server : update");
      var collection = db.collection(col);
      console.log(id)
      var o_id = new mongodb.ObjectID(id);
     delete update._id; 
       collection.updateOne({ "_id": o_id },{ $set: update} , function(err, result) {
            db.close();

            var status = false;
            console.log(err)
            if(result.result.nModified == 1){
              status = true;
            }
            const response = {
              statusCode: 200,
              body: JSON.stringify({
                status: status,
                data: update,
              }),
            };
            callback(null, response )
      });
    });
};