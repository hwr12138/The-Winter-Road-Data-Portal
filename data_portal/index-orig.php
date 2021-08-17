<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <title>Data Portal</title>
    <!--style sheet-->
    <link rel="stylesheet" type="text/css" href="./style.css">
    <link rel="stylesheet" type="text/css" href="../navbar_style.css">
    <script src="../nav.js"></script>
    <!--Google fonts-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>

<body>
    <div id="navbar">
        <a href="#default" id="logo">Winter Road Data Portal</a>
        <div id="sidebar_right">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="../index.html">Home</a>
            <a href="../about/index.html">About</a>
            <a href="../esri_leaflet/map.html">Map</a>
            <a href="../survey/survey.html">Share</a>
            <a class="active" href="../data_portal/index.php">Data Portal</a>
            <a href="../login/index.html" style="padding-right: 20px;">Login</a>
        </div>
        <div id="main">
            <button class="openbtn" onclick="openNav()">&#9776;</button>
        </div>
    </div>
    <div id="navbar_spacing"></div>
    
    <?php
	$servername = 'localhost';
	$username = 'ruian134_test';
	$password = 'ZG-Y4A~HyN4$';
	$dbname = "ruian134_testdb";

	// Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
	    die("Connection Failed: " . $conn->connect_error);
	}
    
	$sql = "SELECT cityName, latitude, longitude FROM Coordinates";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        echo "<table><tr><th>City</th><th>Latitude</th><th>Longitude</th></tr>";       
        while($row = mysqli_fetch_assoc($result)) {
            echo "<tr><td>".$row["cityName"]. "</td><td>" . $row["latitude"]. "</td><td>" . $row["longitude"]. "</td></tr>";
        }
        echo "</table>"; 
    } else {
        echo "0 results";
    }
    mysqli_close($conn);
    ?>
</body>

</html>