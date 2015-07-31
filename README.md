# yargh

Given a series of lines on stdin, massages each one and executes the result as a command.

Usage: ````data-lines | yargh separator command-template````

Inputs:
  1. A newline-separated data file on stdin
  2. A separator for parsing the data lines
  3. A command template to merge parsed data into, and then run

For example this...
````
$ echo "Hello," | yargh , "echo %1 World"
````
...turns into this:
````
$ echo Hello World
````

And this...
````
$ echo "a,b
c,d" | yargh "," "echo %2"
````
turns into these:
````
$ echo b
$ echo d
````

In the command template:
   1. Fields of the parsed string are addressed as variables in the form %1 (where the number is any field).
   2. %0 is replaced with the entire input line, unparsed.

---

The separator argument is optional. If there is only one argument, it is treated as the command-template. In this case %0 is the only field available. 

So this:
````
echo example.png | yargh "file %0"
````

Turns into this:
````
file example.png
````

---

If %0 is not present in the command template, it is appended instead of inserted.

So this yargh command:
````
echo example.png | yargh file
````
Spawns this command:
````
file example.png
````

## Recipe Book

The separator can be a regular expression.

These standard regular expressions may be useful to you:

* output of "ls -l": use ''''/\s+/''''.

## Future

Ability to recognize standardized command outputs. Recognize a command from history and intelligently match it to a pattern.

Ability to skip header, aka first line. --header.



### Predefined separators
* Whitespace: \s+. Useful for "ls -l" and many others. Use -p whitespace for separator.
* CSV.



---

See also:
* xargs
* Gnu Parallel.
