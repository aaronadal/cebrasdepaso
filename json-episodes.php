<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die;
}

$c = curl_init('https://anchor.fm/s/c0099e38/podcast/rss');
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
$rawXml = curl_exec($c);
curl_close($c);

$rawXml = str_replace('itunes:', 'itunes_', $rawXml);

$xml = simplexml_load_string($rawXml, "SimpleXMLElement", LIBXML_NOCDATA);

$counts = [
  'full' => 0,
  'bonus' => 0,
  'trailer' => 0
];

$parsed = [
    'link' => (string) $xml->channel->link,
    'date' => (new \DateTime($xml->channel->lastBuildDate))->format('Y-m-d'),
    'episodes' => [],
];
foreach($xml->channel->item as $item) {
    $parsed['episodes'][] = [
        'type' => (string)$item->itunes_episodeType,
        'number' => intval(substr(explode('] ', (string)$item->title)[0], 2)),
        'date' => (new \DateTime($item->pubDate))->format('Y-m-d'),
    ];
}

header('Content-Type: application/json');
echo(json_encode($parsed));
