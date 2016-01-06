<?php
$randInt = rand(1, 100);
echo "Your new random value is $randInt\n";
date_default_timezone_set("AMERICA/Los_Angeles");

for ($x = 1; $x <= 12; $x++) {
    $monthName = date('F', mktime(0, 0, 0, $x));
    echo "$monthName ";
    
}

?>