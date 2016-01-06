<?php

RandomInt();
monthList();

function RandomInt() {
    $randInt = rand(1, 100);
    echo "Your new random value is $randInt\n";
}

function monthList() {
    date_default_timezone_set("AMERICA/Los_Angeles");
    $monthArray = array();
    echo "Date Sorted Month List\n";
    for ($monthNum = 1; $monthNum <= 12; $monthNum++) {
        $monthName = date('F', mktime(0, 0, 0, $monthNum));
        $monthArray[$monthNum] = $monthName;
        echo "$monthName \n";
    }
    sort($monthArray);
    echo "Alphabetically Sorted Month List\n";
    for($sortedMonth = 1; $sortedMonth <= 12; $sortedMonth++) {
        echo "$monthArray[$sortedMonth] \n";
    }
}
?>