const convert = require('./node_modules/xml-js');

exports.handler = async (event) => {
    var xml  = event['body-json'];
    var json = convert.xml2json(xml, {compact: true, spaces: 4});
    const response = {
        statusCode: 200,
        json: json,
    };
    return response;
};
