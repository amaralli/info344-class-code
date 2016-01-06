Hey this is content above the code
<?php
$name = 'Allison';
$fullName = $name. 'Amaral';
echo "Hello $name\n";

//example of a class
class Person {
    protected $name;

    public function __construct($n) {
        //this is the same this.name
        //when doing this, you don't need the dollar sign in front of the variable being altered
        $this->name = $n;
    }

    public function getName() {
        return $this->name;
    }
}

//function example
//all params need to have a dollar sign in front of it as well
function foo($bar) {
    echo "Hey this is the foo fighting seciton\n";
}

//to create a concatenation in the text
echo "Hello {$name}s\n";
foo(NULL);
?>
And this is some content below