<?php
// erzeuge einen neuen cURL-Handle
$ch = curl_init();

// setze die URL und andere Optionen
curl_setopt($ch, CURLOPT_URL, "http://api.trakt.tv/movies/trending.json/9d10cd057c3ae8d3531cffdef7ea8aec");
curl_setopt($ch, CURLOPT_HEADER, 0);

// führe die Aktion aus und gebe die Daten an den Browser weiter
curl_exec($ch);

// schließe den cURL-Handle und gebe die Systemresourcen frei
curl_close($ch);
?>
