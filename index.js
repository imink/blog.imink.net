var fs = require('fs');

var marked = require('marked');



var TemplateEg = function(tplt, data) {
	var re = /<%([^%>]+)?%>/g;
  while(match = re.exec(tplt)) {
  	tplt = tplt.replace(match[0], data);
  }
  return tplt;
};


var tplt = fs.readFile('./app/template/index.html', 'utf-8', function(err, data) {
	var tplt = data;
	var sample = fs.readFile('./app/archive/sample.md', 'utf-8', function(err, data) {
		var content = marked(data);
		var output = TemplateEg(tplt, content);	
		// console.log(output);

		fs.writeFile('./index.html', output, (err) => {
			if (err) throw err;
			console.log('Render Success.');
		});
	});
});

// copy the css js files 
var copyStaticFiles = function(src, dst, cb) {
	var cbCalled = false;

  var rd = fs.createReadStream(src);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(dst);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
};

copyStaticFiles('./app/template/css/custom.css', './public/css/custom.css', function(err) {
	if (err) throw err;
});




