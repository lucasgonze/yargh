#!/usr/bin/env node

var program = require('commander');

/*

usecase 1:
$ echo "a
b
c" | yargh --separator "\S" "echo $2" -

usecase 2
$ echo "a
b
c" | yargh --regex '([a-z])' "echo $1" -
*/

program
  .version('0.0.1')
  .usage('[options] <command>\n\n\tSee https://github.com/lucasgonze/yargh')
  .option('-r, --regex <value>', 'Regular expression')
  .option('-s, --separator <value>', 'Separator')
  .action(function (command) {
      // I'm doing this because I don't know the proper way. this
      // approach is definitely not the right way.
       program.command = command;
    })
  .parse(process.argv);

if( (typeof program.regex != "undefined" || typeof program.separator != "undefined")
    && (typeof program.regex == typeof program.separator )
    ){
  console.log("Set either regex or separator, but not both.");
  process.exit(1);
}

if( typeof program.command == "undefined"){
    console.log("Missing required argument command");
}

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', function(line){
    console.log("got line: "+line);

    // first case: neither separator nor regex
    // use incoming line as replacement for $0 in replace str
    var newStr = program.command.replace("$0", line);
    console.log("BP 3: "+newStr+"\n");
})
