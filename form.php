<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

<style>
 
</style>

</head>
<body>
<h2>Votre message a bien été envoyé.</h2>

<?php
// define variables and set to empty values
$fname = $lname = $emailRequired = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $fname = test_input($_POST["fname"]);
  $lname = test_input($_POST["lname"]);
  $email = test_input($_POST["email"]);
  $email = test_input($_POST["message"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  echo $data."<br><br>";
}
?>


