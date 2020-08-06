'use strict';

function template(literal, data) {
  var tmpl = literal.replace(/(\$\{)/gm, '$1data.');
  let blacklist = ['&', ';', '|', '-', '$', '`', '||'];

  if (blacklist.some(v => tmpl.includes(v))) {
    console.log("command injection detected");
    for(var i=0; i<tmpl.length; i++){
      if(blacklist.includes(tmpl[i])){
        tmpl = tmpl.replace(tmpl[i], "");
      }
    }
    return eval('`' + tmpl + '`'); 
  } else {
    return eval('`' + tmpl + '`');   
  }
  
}

function encodeStatements(statements, data) {
  if (!statements) {
    throw new SyntaxError('Must include statements to encode');
  }

  if (!data) {
    return statements;
  }

  var output = template(JSON.stringify(statements), data);
  output = JSON.parse(output);

  Object.defineProperty(output, 'encoded', {
    __proto__: null,
    value: true
  });

  return output;
}

module.exports = encodeStatements;
