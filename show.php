<!DOCTYPE html>
<html>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <input type="button" name="Truncate Table" value="Truncate Table" id="b" class="b" />
<script>
	$('#b').click(function() {
  $.ajax({
    type: "POST",
    url: "show.php",
    data: { name: "truncate" }
  }).done(function( msg ) {
    alert( "Truncated Table: " );
  });
});
	</script>
<?php
$servername = "localhost";
$dbname = "loc";
$username = "root";
$password = "";
$port="3306";
// Create connection
$conn = new mysqli($servername.":".$port, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (isset($_POST["name"]))
{
	if($_POST["name"]=="truncate")
	{
		$sqlt = "truncate table `loc`";
		$result = $conn->query($sqlt);


    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
  

	}

}

$sql = "SELECT `id`,`lat`,`long` FROM `loc`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	$url = "https://www.google.com/maps/@". $row["lat"].",".$row["long"].",20z";
     echo "<br> id: ". $row["id"]. " Lattitude :- " . $row["lat"]." - Longitude: - ". $row["long"] ." <br> <a target=_blank href=".$url.">Click For Gmap</a></html><br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>

</body>
</html>