<?php
function getConnection() {
    //include will only throw a warning if it can't find file. Require will fail
    //which is nice
    require_once 'secret/db-credentials.php';

    //is there an error thrown by anything in "try"? then enter catch
    try {
        $conn = new PDO("mysql:host=$dbHost;dbname=$dbDatabase",
            $dbUser, $dbPassword);

        return $conn;
        
    } catch (PDOException $e) {
        die('Could not connect to database ' . $e);
    }
}

?>