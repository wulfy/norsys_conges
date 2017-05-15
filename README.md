## 🏗 Installation
The project is using casperjs to parse Norsys API and algolia to store data.
You have to
- install casperjs 
- add config files (the project do not include configuration files with algolia API keys and norsys account credentials)

## 🔧 config files

Please add a conf/ directory with 2 files

**algolia.php**

_Define algolia API key, App key and index name._

You must use admin key because the php script is clearing the DB before adding new data.

example:
```
<?php
define("API_KEY","admin_key");

// initialize API Client & Index
$client = new \AlgoliaSearch\Client("app_id", API_KEY);
$index = $client->initIndex('index_name');
```


**norsys_cras.js**

_store norsys account credentials_

example
```
var login = "norsys_account_login";
var password = "norsys_account_password";
```
