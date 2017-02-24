'use strict';
var fs = require('fs');
var marked = require('marked');
var yaml = require('js-yaml');
var helper = require('./app/utilities/utilities');


var TemplateEg = function(tplt, data) {
	var re = /<%([^%>]+)?%>/g;
  var match;
  while(match = re.exec(tplt)) {
  	tplt = tplt.replace(match[0], data[match[1]]);
  }
  return tplt;
};


var tplt = fs.readFile('./app/template/index.html', 'utf-8', function(err, data) {
	var tplt = data;
	var sample = fs.readFile('./app/archive/sample.md', 'utf-8', function(err, data) {
		var content = marked(data);
    var post = helper.getPostMeta('./app/archive/sample.yml');
    post.content = content;
		var output = TemplateEg(tplt, post);	
		// console.log(output);

		fs.writeFile('./index.html', output, (err) => {
			if (err) throw err;
			console.log('Render Success.');
		});
	});
});




helper.copyStaticFiles('./app/template/css/custom.css', './public/css/custom.css', function(err) {
	if (err) throw err;
});




