// Connection URL

var locatl = false;
if(locatl)
	var db_url = 'mongodb://localhost:27017/relief';
else
	var db_url = '_MLABURL_';

var config = {
    'db_url': db_url
}

module.exports = config;


// Resolution_AfS12XbJ