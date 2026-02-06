<?php

# Flashscore API Sports

$headers = [];
$headers[] = "x-rapidapi-key: __YOUR_KEY__";
$headers[] = "x-rapidapi-host: flashlive-sports.p.rapidapi.com";

$baseUrl = "https://flashlive-sports.p.rapidapi.com";
$flashliveSession = curl_init();
curl_setopt($flashliveSession, CURLOPT_RETURNTRANSFER, true);
curl_setopt($flashliveSession, CURLOPT_HTTPHEADER, $headers);
curl_setopt($flashliveSession, CURLOPT_ENCODING, "");


echo "\r\n__________________ LIST OF SPORTS __________________\n";
curl_setopt($flashliveSession, CURLOPT_URL, $baseUrl . "/v1/sports/list");
$response = curl_exec($flashliveSession);
$responseCode = curl_getinfo($flashliveSession, CURLINFO_HTTP_CODE);
if ($responseCode != 200) {
    throw new Exception($responseCode . ": " . $response);
}
$sports = json_decode($response, true);
foreach ($sports["DATA"] as $sport) {
    echo sprintf("%s: %s\n", $sport["ID"], $sport["NAME"]);
}
curl_close($flashliveSession);
