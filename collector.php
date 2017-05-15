<?php
require_once __DIR__ . '/vendor/autoload.php';
require_once 'conf/algolia.php';

define("CASPER_COMMAND",'casperjs --ignore-ssl-errors=yes --web-security=no  collector.js --ssl-protocol=any >> logs/logs.log');
exec(CASPER_COMMAND);

$algoliaData = file_get_contents("data.json");
if(strlen($algoliaData)>1)
{
	$index->clearIndex();
	$res = $index->addObjects(json_decode($algoliaData));
	$index->waitTask($res['taskID']);
}
