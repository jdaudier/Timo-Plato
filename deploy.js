// Create a child process that will run the production bundle command

var exec = require('child_process').exec;
exec('webpack -p --config webpack.config.js', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
