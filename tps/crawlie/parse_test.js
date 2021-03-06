var sys = require('sys'),
    fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    console.log(sys.inspect(result));
    console.log('Done.');
});

fs.readFile(__dirname + '/deal.xml', function(err, data) {
    parser.parseString(data);
});
