'use strict';
const confrc = new (require('confrc')).confrc();
const bucketrc = new (require('bucketrc')).bucketBase(999999999);
const http = require('http');


const serverBase = function(){
    const start=function(){
        http.createServer(function (req, res) {
            let post = '';
            req.on('data', function (chunk) {
                post += chunk;
            });
            req.on('end', async function () {
                if(req.url === '/')
                    return res.end();
                if(req.url.toLowerCase() === 'one')
                    return res.end();
                if(req.url.toLowerCase() === 'done')
                    return res.end();
                return end(res);
            });
        }).listen(
            confrc.get('httpd').port,
            confrc.get('httpd').address
        );
    };
    const end = function(res){
        res.writeHead(200);
        res.write(
            JSON.stringify({
                'result':'ok'
            })
        );
        return res.end();

    };
    process.on('EXIT', stop);
    process.on('SIGINT', stop);
    start();
};

(new serverBase());

