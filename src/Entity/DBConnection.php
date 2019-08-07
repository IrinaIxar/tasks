<?php

class DBConnection {
	protected $host = 'localhost';
	protected $user = 'root';
	protected $password = '';
	protected $dbName = 'tasks';
	protected $mysql;


	public function __construct() {
		$this->mysql = new mysqli($this->host, $this->user, $thhis->password, $this->dbName);
		if ($this->mysql->connect_error) {
			die("Connection failed: " . $this->mysql->connect_error);
		}
	}

	public function query($query) {
		$result = $this->mysql->query($query);

		//return error if query hasn't been done
		if (!$result) {
		    return $this->mysql->error;
		} elseif ($result->num_rows > 0) { //return array with results for SELECT queries
			if($result->num_rows === 1) {
				return $result->fetch_assoc();
			} else {
				$array = [];
				while($row=$result->fetch_assoc()) {
					$array[] = $row;
				}
				return $array;
			}
		} else { // for INSERT, UPDATE, DELETE queries
			return $result;
		}
		
	}

	public function close() {
		$this->mysql->close();
	}
}

?>