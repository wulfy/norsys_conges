require('conf/norsys_cras.js');//load private data

var urlLogin = "https://norsys-daily.norsys.fr/login";
var urlAbsences = "https://norsys-daily.norsys.fr/absences?idPerson=";
var formSelect = 'form[id="login-form"]';
var fs = require('fs');

//var contactsJSON = require('./contacts.json');

var users = [98,99,100,142,150,160,180];

var casper = require('casper').create({   
    verbose: true, 
	logLevel: "info",
    pageSettings: {
         loadImages:  true,         // The WebPage instance used by Casper will
         loadPlugins: true,        // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    },
	 viewportSize: {
        width: 1400,
        height: 768
    },
    onWaitTimeout: function() {
        //logConsole('Wait TimeOut Occured');
        casper.capture('/data/screens/xWait_timeout.png');
        casper.echo("wait timeout");
        casper.exit();
    },
    onStepTimeout: function() {
        //logConsole('Step TimeOut Occured');
        casper.echo("step timeout");
        casper.capture('xStepTimeout.png');
        casper.exit();
    }
});

function formatDate(norsysDate)
{
	var date = norsysDate.split(",");
	casper.log(date);
	return new Date(date[0],date[1],date[2]).getTime();
}

function formatAbsences(absences){
	var newAbsences = [];
	
	for(var i=0; i<absences.length; i++)
	{
		casper.log("formating ..."+absences[i].absenceStartDate);
		absences[i].absenceStartDate = formatDate(""+absences[i].absenceStartDate);
		absences[i].absenceEndDate = formatDate(""+absences[i].absenceEndDate);
	}
	
	return absences;
}

casper.start(urlLogin);

casper.then(function openWebsite() {

	
		this.echo("connexion");
//capture(screenshots,'norsys.png');
	casper.waitForSelector('input[name = username ]', function(){

	       this.fill('form', {
    'username': login, 
    'password': password}, true);

	       this.capture(screenshots+'norsys.png');
	});
	
});

casper.waitForSelector('.container-fluid',function(){
var allAbsences = [];

for(i in users)
{
	casper.thenOpen(urlAbsences+users[i], function openWebsite() {
		this.echo(urlAbsences+users[i]);
	var currentURL = this.getCurrentUrl();
    var absences = JSON.parse(this.getPageContent());
    var formatedAbsences = formatAbsences(absences);
    allAbsences = allAbsences.concat(formatedAbsences);

  
	});
}

casper.then(function() {
	this.echo(urlAbsences+users[i]);
  fs.write(screenshots+"data.json", JSON.stringify(allAbsences), 'w');
});

});


casper.run();