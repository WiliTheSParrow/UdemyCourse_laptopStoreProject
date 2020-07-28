const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    //console.log(url.parse(req.url, true));
    // url format: http://127.0.0.1:1337/laptop?id=4&name=apple&date=today

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end('This is the PRODUCTS page!');
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
            // ! We have to do it from the output bef for the other ones.
            output = output.replace(/{%IMAGE%}/g, laptop.image);
            output = output.replace(/{%PRICE%}/g, laptop.price);
            output = output.replace(/{%SCREEN%}/g, laptop.screen);
            output = output.replace(/{%CPU%}/g, laptop.cpu);
            output = output.replace(/{%STORAGE%}/g, laptop.storage);
            output = output.replace(/{%RAM%}/g, laptop.ram);
            output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            // sending data to the page
            res.end(output);
        });

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('URL was not found on the server!');
    }


});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for request now');
})