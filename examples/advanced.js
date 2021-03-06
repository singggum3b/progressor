var async = require('async');
var Progressor = require('./../lib/index.js').Progressor;
var Helpers = require('./../lib/helpers.js').Helpers;



Progressor.addFormat("test", " \033[44;37m %title:-37s% \033[0m\n %current%/%max%  %bar% %percent:3s%%\n 🏁  %remaining:-20s% Mem:%memory:11s%");

var progressor = new Progressor({
  format: 'test',
  //barChar: "\033[32m●\033[0m",
  beforeNewlines: 2,
  afterNewlines: 1,
//  emptyBarChar: "\033[31m●\033[0m",
  //progressChar: "\033[32m➤ \033[0m"
}, 10);

progressor.setMessage('Starting the demo... fingers crossed', 'title');
progressor.start();

async.timesSeries(10, function (n, next) {
  require('request').get('http://lorempixel.com/g/700/500/', function (err, data) {
    progressor.setMessage('Downloaded image ' + (n + 1) + ' of ' + 10, 'title');
    progressor.advance();
    next(err, data);
  });
}, function () {
  setTimeout(function () {
    progressor.setMessage('Completed download', 'title');
    progressor.finish();
  }, 1000);
});
