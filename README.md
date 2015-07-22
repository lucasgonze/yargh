# yargh

Given a series of lines on stdin, massages each one and executes the result as a command.

In one case, each line is split on a separator and the command includes portions of it.

````
$ echo "a
b
c" | yargh --separator "\S" "echo $2" -
````

In the other case, each line is split with a regular expression and the command includes matched components.

````
$ echo "a
b
c" | yargh --regex '([a-z])' "echo $1" -
````
