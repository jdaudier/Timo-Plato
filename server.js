var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
require('colors');

app.set('port', process.env.PORT || 8080);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(app.get('port'), function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('      _______________________'.magenta);
    console.log('()===(                      (@===()'.magenta);
    console.log('     \'______________________\'|'.magenta);
    console.log('       |                     |'.magenta);
    console.log('       |  Timo Plato         |'.magenta);
    console.log('       |  is                 |'.magenta);
    console.log('       |  now                |'.magenta);
    console.log('       |  running!           |'.magenta);
    console.log('       |                     |'.magenta);
    console.log('       |                     |'.magenta);
    console.log('       |             love,   |'.magenta);
    console.log('       |           Joanne    |'.magenta);
    console.log('      _)_____________________|'.magenta);
    console.log('()===(                      (@===()'.magenta);
    console.log('      \'----------------------\''.magenta);
    console.log('                                '.magenta);


    console.log('Check out the app at http://localhost:' + server.address().port);
    console.log('Press Ctrl+C to stop.');
});