var casper = require("casper").create({
    viewportSize: {width: 1600, height: 1200},
    //verbose: true,
    //logLevel: 'debug',
    onError: function(self, m) {   // Any "error" level message will be written
        console.log('FATAL:' + m); // on the console output and PhantomJS will
        self.exit();               // terminate
    }
});

casper.on('http.status.200', function(resource) {
    casper.test.comment(resource.url + ' loaded ok');
});

casper.on('wait.start', function(wait) {
    casper.test.comment('waiting...');
});

casper.on('capture.saved', function(capture) {
    casper.test.comment('capture made, stored at: ' + capture);
});

casper.start('http://dev.andyshora.com/', function() {
   
	
   
   this.test.comment('checking resources have loaded...');
    //this.wait(500, function() {
        this.test.assertResourceExists('m.min.js', 'main.js was loaded');
        this.test.assertResourceExists('s.min.css', 'main stylesheet was loaded');
    //});

});

casper.then(function(){
    this.test.comment('creating capture...');
    this.captureSelector('screencaptures/home.png', 'body');

/*this.open('http://cpdreview.com').then(function() {
casper.wait(3000, function() {
  this.captureSelector('screencaptures/cpd.png', 'body');
});
});*/
});


casper.run();