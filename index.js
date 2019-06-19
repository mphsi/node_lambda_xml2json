var xml2js = require('./node_modules/xml2js');

exports.handler = async (event) => {
    const xml  = event['body-json'];
    const json = xml2js.parseString(
      xml,
      {
        mergeAttrs: true,
        explicitArray: false
      }, function (err, result) {
        return JSON.stringify(result);
    });

    const response = {
        statusCode: 200,
        json: json,
    };

    return response;
};
