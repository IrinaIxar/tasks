<?php
class RouteException extends Exception {
	public function getErrorMessage() {
		echo "No such route. Please verify it";
	}
}