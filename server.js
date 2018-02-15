const exec = require('child_process').execFile;
const http = require("http");
const fs = require('fs');
const buttons = {
    test: {
        file: "file.exe",
        name: "Test"
    },
    test2: {
        file: "file2.exe",
        name: "Test 2"
    },
};

http.createServer(function (req, res) {
    if (req.url != '/') {
        if (buttons[req.url.slice(1)]) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            exec(buttons[req.url.slice(1)].file, function (err, data) {
                if (err) {
                    res.end(JSON.stringify({'success': 'false'}));
                } else {
                    res.end(JSON.stringify({'success': 'true'}));
                }
            });
        } else {
            res.end();
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('server.html', function(error, content) {
            let output = '';
            for (let i in buttons) {
                output += '<button class="' + i + '" data-value="' + i + '">' + buttons[i].name + '</button>';
            }
            res.end(content.toString().replace('{{buttons}}', output));
        });
    }
}).listen(9000);