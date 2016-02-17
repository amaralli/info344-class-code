<<<<<<< HEAD
<?php

class Zips {
    protected $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function search($q) {
        $sql = 'select * from zips where zip=? or primary_city=?';
        $statement = $this->conn->prepare($sql);
        $success = $statement->execute(array($q, $q)); 
        if(!success) {
            trigger_error($statement->errorInfo());
        } else {
            return $statement->fetchAll();
=======
<?php 
class Zips {
    protected $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function search($q) {
        $sql = 'select * from zips where zip=? or primary_city=?';
        $stmt = $this->conn->prepare($sql);
        $success = $stmt->execute(array($q,$q));
        if (!$success) {            
            var_dump($stmt->errorInfo());
            return false;
        } else {
            return $stmt->fetchAll();
>>>>>>> 278f399a03f67ccb40c80ec9fe59b166249f0dbb
        }
    }
}
?>