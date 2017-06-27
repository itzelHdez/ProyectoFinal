<?php
	
	function connectionToDataBase()
	{
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "DB_Journey";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		// Check connection
		if ($conn-> connect_error) 
		{
			return null;
		}
		else
		{	
			return $conn;
		}
    }
	
    
    function attemptLogin($username, $password)
	{
		$connection = connectionToDataBase();

		if ($connection != null)
		{
	 		$sql = "SELECT fName,lName,country FROM Users WHERE username = '$username' AND passwrd='$password'";
	 		$result = $connection -> query($sql);

		 	if($result -> num_rows >0)
		 	{	
		 		while($row = $result -> fetch_assoc()) 
		 		{	
		 			$response = array("status" => "EXITO","fName"=>$row["fName"],"lName"=>$row["lName"],"country" => $row["country"]); 
		 		}

				$connection -> close();
				return $response;
			}
			else
			{	
				$connection -> close();
				return array("status" => "406");
			}
		}
		else
		{	

			return array("status" => "500");
		}
		
		return array("status" => "500");
	}


    function attemptRegister($first_name, $last_name, $username, $password, $email, $birthday, $country)
    {
		$connection = connectionToDataBase();

		if ($connection != null)
        {
			$sql = "SELECT username FROM Users WHERE username = '$username'";
			$result = $connection->query($sql);

			if ($result->num_rows > 0)
            {
				$connection -> close();
				return array("status" => "409a");
			}	
			else
            { 
                $sql = "INSERT INTO Users (fName, lName, username, passwrd, email, birthday, country) VALUES ('$first_name', '$last_name', '$username', '$password', '$email', '$birthday', '$country')";

                if (mysqli_query($connection, $sql)) 
			    {	
                        $response = array("status" => "EXITO");
                        $connection -> close();
                        return $response;

				} 
				else 
				{	
						$connection -> close();
						return array("status" => "409c");
				}
			}
		}
		else 
        {  
            return array("status" => "500"); 
        }
        
        return array("status" => "500");
	}

	function attemptNewEvent($userName, $eventName, $eventCategory, $date, $hour, $maxUsers, $minUsers, $equipment, $description, $latitude, $longitude) 
	{
		
		$connection = connectionToDataBase();

		if ($connection != null) {
			$sql = "SELECT eventName FROM Eventos WHERE eventName = '$eventName'";
            $sql2 = "SELECT username_e, eventName_e FROM users_eventos WHERE username_e = '$userName' AND eventName_e = '$eventName'";
            
			$result = $connection->query($sql);
            $result2 = $connection->query($sql2);

			if ($result->num_rows > 0 || $result2->num_rows > 0) {
				$connection -> close();
				return array("status" => "409f");
			}	
			else{
				$sql = "INSERT INTO Eventos (eventName,eventCat,eDate,eHour,maxUsers,minUsers,equipment,description,latitude,longitude) VALUES ('$eventName', '$eventCategory', '$date', '$hour', '$maxUsers', '$minUsers', '$equipment', '$description', '$latitude', '$longitude')";
				$sql2 = "INSERT INTO users_eventos (username_e, eventName_e) VALUES ('$userName', '$eventName')";
       			if (mysqli_query($connection, $sql) && mysqli_query($connection, $sql2)) 
			    {	
                        $response = array("status" => "EXITO");
                        $connection -> close();
                        return $response;

				} 
				else 
				{	
						$connection -> close();
						return array("status" => "409c");
				}
			}
		}
		else {
			return array("status" => "500");
		}
		return array("status" => "500");		
	}

    function attemptSeeComments()
	{
		$connection = connectionToDataBase();

		if ($connection != null)
		{
			//echo "connection sql";
			$sql = "SELECT username,ucomment FROM Comments"; 
			$result = $connection ->query($sql);

			if($result ->num_rows > 0)
			{
	  			$responseE = array("status" =>"EXITO");
	  			$responseA = array();

	  			while ($row = $result->fetch_assoc())
			    {	
			    	array_push($responseA,array("name" => utf8_encode($row["username"]),"ucomment" => utf8_encode($row["ucomment"])));
			    }
			    $connection -> close();
				return array("responseE"=>$responseE,"responseA"=>$responseA);
			}
			else
			{	
				$connection -> close();
				$responseE = array("status" => "409e");
				return array("responseE"=>$responseE);;
			}	

		}
		else
		{
			$responseE = array("status" => "500");
			return array("responseE"=>$responseE);;
		}

		$responseE = array("status" => "500");
		return array("responseE"=>$responseE);;
	}

    function attemptsaveComment($username, $textarea)
	{
		$connection = connectionToDataBase();

		if ($connection != null)
		{	
			if ($textarea=="")
			{
				$connection -> close();
				return array("status"=>"409b");;
			}
			else
			{
				$sql = "INSERT INTO Comments(username,ucomment) VALUES ('$username','$textarea')";
					
				if (mysqli_query($connection, $sql)) 
			    {	
						$response = array("status"=>"EXITO","username" => $username);
						return $response;
				} 
				else 
				{
					$connection -> close();
					return array("status"=>"409e");;
				}

			}
	
		}
		else
		{
			$responseE = array("status" => "500");
			return array("responseE"=>$responseE);;
		}

		$responseE = array("status" => "500");
		return array("responseE"=>$responseE);;
	}

    function attemptSeeTravelers()
	{
		$connection = connectionToDataBase();

		if ($connection != null)
		{
			//echo "connection sql";
			$sql = "SELECT fName,lName,email,country FROM Users"; 
			$result = $connection ->query($sql);

			if($result ->num_rows > 0)
			{
	  			$responseE = array("status" =>"EXITO");
	  			$responseA = array();

	  			while ($row = $result->fetch_assoc())
			    {	
			    	array_push($responseA,array("fName" => utf8_encode($row["fName"]),"lName" => utf8_encode($row["lName"]),"email" => utf8_encode($row["email"]),"country" => utf8_encode($row["country"]) ));
			    }
			    $connection -> close();
				return array("responseE"=>$responseE,"responseA"=>$responseA);
			}
			else
			{	
				$connection -> close();
				$responseE = array("status" => "409e");
				return array("responseE"=>$responseE);;
			}	

		}
		else
		{
			$responseE = array("status" => "500");
			return array("responseE"=>$responseE);;
		}

		$responseE = array("status" => "500");
		return array("responseE"=>$responseE);;
	}

    function attemptSeeEvents($username)
    {
        $connection = connectionToDataBase();

		if ($connection != null)
		{
			//echo "connection sql";
			$sql = "SELECT eventName_e FROM users_eventos WHERE username_e = '$username'"; 
			$result = $connection ->query($sql);

			if($result ->num_rows > 0)
			{
	  			$responseE = array("status" =>"EXITO");
	  			$responseA = array();

	  			while ($row = $result->fetch_assoc())
			    {	
			    	array_push($responseA,array("eventName_e" => utf8_encode($row["eventName_e"]) ));
			    }
			    $connection -> close();
				return array("responseE"=>$responseE,"responseA"=>$responseA);
			}
			else
			{	
				$connection -> close();
				$responseE = array("status" => "409g");
				return array("responseE"=>$responseE);
			}	

		}
		else
		{
			$responseE = array("status" => "500");
			return array("responseE"=>$responseE);
		}

		$responseE = array("status" => "500");
		return array("responseE"=>$responseE);
        
    }

    function attemptSeeEventInfo($eventName)
    {   
        $connection = connectionToDataBase();

		if ($connection != null)
		{
			$sql = "SELECT eventName, eDate, eHour, equipment, description FROM eventos WHERE eventName = '$eventName'"; 
			$result = $connection ->query($sql);

            if($result -> num_rows >0)
		 	{	
		 		while($row = $result -> fetch_assoc()) 
		 		{	
		 			$response = array("status" => "EXITO","eventName"=>$row["eventName"], "eDate"=>$row["eDate"], "eHour" => $row["eHour"], "equipment" => $row["equipment"], "description" => utf8_encode($row["description"])); 
		 		}

				$connection -> close();
				return $response;
			}
			else
			{	
				$connection -> close();
				return array("status" => "406");
			}
		}
		else
		{	

			return array("status" => "500");
		}
		
		return array("status" => "500");
        
    }

?>
