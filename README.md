# yargh

Given a series of lines on stdin, massages each one and executes the result as a command.

In one case, each line is split on a separator and the command includes portions of it.

````
$ echo "-rw-r--r--  1 lucasgonze  staff   425 Jul 21 22:36 README.md
-rw-r--r--  1 lucasgonze  staff   592 Jul 20 22:01 package.json
-rwxr-xr-x  1 lucasgonze  staff  1289 Jul 21 22:39 yargh.js
" | yargh --separator "\s" "echo $2" -
````

In the other case, each line is split with a regular expression and the command includes matched components.

````
$ echo "-rw-r--r--  1 lucasgonze  staff   425 Jul 21 22:36 README.md
-rw-r--r--  1 lucasgonze  staff   592 Jul 20 22:01 package.json
-rwxr-xr-x  1 lucasgonze  staff  1289 Jul 21 22:39 yargh.js
" | yargh --regex '([a-z])' "echo $1" -
````
