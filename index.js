var xml2js = require('./node_modules/xml2js');

const fieldsToSkip = [
  'NoCertificadoSAT',
  'Impuesto',
];

function valueAsNumber(value, name){
  if (fieldsToSkip.includes(name)) {
    return value;
  }
  
  let typ = typeof value
  if (typ === 'number' || (typ === 'string' && value.toUpperCase().indexOf('E') !== -1)) {
    return value;
  }
  if (!isNaN(value) && isFinite(value)) {
      value = value % 1 === 0 ? parseInt(value, 10) : parseFloat(value);
  }
  return value;
}

exports.handler = async (event) => {
    const xml  = event['body-json'];
    let   json = null;
    
    xml2js.parseString(
      xml,
      {
        mergeAttrs: true,
        explicitArray: false,
        attrValueProcessors: [valueAsNumber]
      }, function (err, result) {
        json = JSON.stringify(result);
    });

    const response = {
        statusCode: 200,
        json: json,
    };

    return response;
};
