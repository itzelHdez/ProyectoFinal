<?php
	header('Accept: application/json');
	header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["accion"];

	switch($action)
	{
		case "LOGIN" : 
			loginFunction();
			break;
		case "REGISTER" : 
			registerFunction();
			break;
		case "NEWEVENT" :
			newEventFunction();
			break;
		case "COOKIE" : 
			cookieServiceFunction();
			break;
		case "SESSIONSERVICE" :
			sessionServiceFunction();
			break;
		case "COMMENTSSERVICE" : 
			commentsServiceFunction();
			break;
		case "SAVECOMMENTSERVICE" : 
			saveCommentServiceFunction();
			break;
		case "LOGOUT" : 
			logoutFunction();
			break;
        case "COMMENTSSERVICE" : 
			commentsServiceFunction();
			break;
        case "SAVECOMMENTSERVICE" : 
			saveCommentServiceFunction();
			break;
        case "TRAVELERSSERVICE" : 
			travelersServiceFunction();
			break;
        case "EVENTSSERVICE" : 
			eventsServiceFunction();
			break;
        case "SETCOOKIEEVENT" : 
			setCookieEventFunction();
			break;
        case "COOKIE2" : 
			cookieServiceFunction2();
			break;
	}
    
    function loginFunction()
    {
        $username = $_POST['username'];
        $password = $_POST['password'];

		$response = attemptLogin($username, $password);

		if ($response["status"] == "EXITO")
		{
			startSession($response["fName"], $response["lName"], $username, $response["country"]);
			startCookie($username);

			echo json_encode($response);
		}
		else
		{
			errorHandling($response["status"]);
		}
    }

    function registerFunction() 
    {
		$first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $username = $_POST['username'];
        $password = $_POST['password'];
		$email = $_POST['email'];
		$birthday = $_POST['birthday'];
		$country = $_POST['country'];

		$response = attemptRegister($first_name, $last_name, $username, $password, $email, $birthday, $country);

		if ($response["status"] == "EXITO")
        {   
			startSession($first_name, $last_name, $username, $country);
			echo json_encode($response);
		}
		else
        {
			errorHandling($response["status"]);
		}

	}

	function newEventFunction() 
	{
        session_start();
	        $userName = $_SESSION['username'];
			$eventName = $_POST['eventName'];
	        $eventCategory = $_POST['eventCategory'];
	        $date = $_POST['date'];
	        $hour = $_POST['hour'];
	        $maxUsers = $_POST['maxUsers'];
	        $minUsers = $_POST['minUsers'];
	        $equipment = $_POST['equipment'];
	        $description = $_POST['description'];
	        $latitude = $_POST['latitude'];
	        $longitude = $_POST['longitude'];

			$response = attemptNewEvent($userName, $eventName, $eventCategory, $date, $hour, $maxUsers, $minUsers, $equipment, $description, $latitude, $longitude);
			if ($response["status"] == "EXITO") 
			{
				echo json_encode($response);
			}
			else {
				errorHandling($response["status"]);
			}
	}	

	function startSession($fName, $lName, $usuario, $pais)
    {
		session_start();

		$_SESSION["firstName"] = $fName;
		$_SESSION["lastName"] = $lName;
        $_SESSION["username"] = $usuario;
		$_SESSION["pais"] = $pais;
	}

	function startCookie($username)
	{
		$remember = $_POST["remember"];

		if ($remember == "true")
		{
			setcookie("username", $username, time() + 3600*24*20);
		}	
	}


	function cookieServiceFunction()
	{
		if (isset($_COOKIE["username"])) {
			echo json_encode(array("username" => $_COOKIE["username"]));
		}
		else {
			errorHandling("409d");
		}
	}

    function logoutFunction()
    {
        session_start();
		if (isset($_SESSION["firstName"]) && isset($_SESSION["lastName"]) && isset($_SESSION["username"]) && isset($_SESSION["pais"])) 
        {
			unset($_SESSION["firstName"]);
			unset($_SESSION["lastName"]);
            unset($_SESSION["username"]);
			unset($_SESSION["pais"]);
			session_destroy();
			echo json_encode(array("successMessage" => "Session deleted successfully"));
		}
		else {
			errorHandling("406b");
		}
    }

    function sessionServiceFunction(){
        session_start();
		if (isset($_SESSION["firstName"]) && isset($_SESSION["lastName"]) && isset($_SESSION["username"]) && isset($_SESSION["pais"])) 
        {
			echo json_encode(array("fName" => $_SESSION["firstName"], "lName" => $_SESSION["lastName"],"username" => $_SESSION["username"],"pais" => $_SESSION["pais"]));
		}
		else {
			errorHandling("406b");
		}
    }

    function commentsServiceFunction()
	{
		$response = attemptSeeComments();
		$responseE = $response["responseE"];
		//echo $responseE;

		if ($responseE["status"] == "EXITO")
		{	
			$responseA = $response["responseA"];
			echo json_encode($responseA);
		}
		else
		{
			errorHandling($responseE["status"]);
		}

	}

    function saveCommentServiceFunction()
	{
        session_start();
		$username = $_SESSION["username"];
		$textarea = $_POST["textarea"];

		$response = attemptsaveComment($username,$textarea);

		if ($response["status"] == "EXITO")
		{	
			echo json_encode($response);
		}
		else
		{
			errorHandling($response["status"]);
		}	
	}

    function travelersServiceFunction()
	{
		$response = attemptSeeTravelers();
		$responseE = $response["responseE"];
		//echo $responseE;

		if ($responseE["status"] == "EXITO")
		{	
			$responseA = $response["responseA"];
			echo json_encode($responseA);
		}
		else
		{
			errorHandling($responseE["status"]);
		}
	}

    function eventsServiceFunction()
    {
        session_start();
        $username = $_SESSION["username"];
        $response = attemptSeeEvents($username);
		$responseE = $response["responseE"];
		//echo $responseE;
		if ($responseE["status"] == "EXITO")
		{	
			$responseA = $response["responseA"];
			echo json_encode($responseA);
		}
		else
		{
			errorHandling($responseE["status"]);
		}
    }

    function setCookieEventFunction()
    {
        $eventName = $_POST['eventName'];
        startCookie2($eventName);
        echo json_encode(array("eventName" => $_COOKIE["eventName"]));
    }

    function startCookie2($eventName)
	{   
        setcookie("eventName", $eventName, time() + 3600*24*20);
	}

	function cookieServiceFunction2()
	{
        $eventName = $_COOKIE["eventName"];
        $response = attemptSeeEventInfo($eventName);

		if ($response["status"] == "EXITO")
		{

			echo json_encode($response);
		}
		else
		{
			errorHandling($response["status"]);
		}
	}



	function errorHandling($errorStatus)
	{
		switch ($errorStatus)
		{
			case "406" : header("HTTP/1.1 406 User not found");
	 					die("El usuario no esta registrado, da click en Registrar");
						break;
			case "406b" : header('HTTP/1.1 406 Session has expired.');
						die("Your session has expired, you have to login");
						break;
			case "409a" : header("HTTP/1.1 409 User already exists in DataBase");
	 					die("The Username already exists, try a new one");
	 					break;
			case "409b" : header("HTTP/1.1 409 Incomplete credentials");
		 				die("Some field is missing. Try again");
						break;
			case "409c" :header('HTTP/1.1 409 Bad connection, something went wrong while saving your data, please try again later');
					    die("The username alredy exists, try a new one");
					    break;				 
			case "409d" :header('HTTP/1.1 Cookie has not been set');
						die("There are no cookies saved yet.");		
					    break;
			case "409e" :header("HTTP/1.1 409 Bad connection, something went wrong with the DataBase, please try again later");
		 				die("Something went wrong. Try again later");
					    break;	
			case "409f" :header("HTTP/1.1 409 The event already exists in DataBase");
		 				die("The Event already exists, try a new one");
					    break;
            case "409g" :header("HTTP/1.1 409 There are no events for this user");
		 				die("There are no events for this user");
					    break;	
			case "500" : header('HTTP/1.1 500 Bad connection to Database');
						die("The server is down, we couldn't establish the DB connection");
						break;
		}
	}
?>
