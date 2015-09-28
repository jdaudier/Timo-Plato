var env = process.env.NODE_ENV || 'dev';
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

var app = express();
app.use(express.static('dist'));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.set('port', process.env.PORT || 8080);

if (env === 'dev') {
    var webpack = require('webpack');
    var config = require('./webpack.config.dev');
    require('colors');

    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = app.listen(app.get('port'), function(err) {
    if (err) {
        console.log(err);
        return;
    }

    if (env === 'dev') {
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
    }
});