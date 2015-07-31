
/*
 * Work in progress - messy workbench state, just working out my thoughts.
 *
 * c. 2015 Lucas Gonze
 * MIT license
 */

var program = require('commander');

var cmd;
var sep;

program
  .version('0.0.1')
  .arguments('<command-template> [separator]')
  .action(function (cmdParam, sepParam) {
     cmd = cmdParam;
     sep = sepParam;
  });

program.parse(process.argv);

if (typeof cmd === 'undefined') {
   console.error('no command given!');
   process.exit(1);
}
console.log('command:', cmd);
console.log('separator:', sep || "no separator given");

//*****************

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout) };

if( sep )
  var regex = new RegExp(sep);

rl.on('line', function(line){

    // first case: neither separator nor regex
    // use incoming line as replacement for $0 in replace str
    var newStr = cmd.replace("%0", line);

    // second case: separator
    if( typeof regex != "undefined" )
    var arr = line.split(regex);
    for( var i=0; i<arr.length; i++){
      newStr = newStr.replace("%"+i,arr[i]);
    }

    exec(newStr, puts);

})
