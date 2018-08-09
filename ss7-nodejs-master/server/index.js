'use strict';
import Express from 'express';
import BodyParser from 'body-parser';
import FS from 'fs-extra';
import Http from 'http';
import Path from 'path';

const app = Express();

app
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        next();
    })
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Express.static(Path.resolve(__dirname, '..', 'public'), {maxAge: 31557600000}))
	.set('views', Path.join(__dirname, '..', 'public', 'views'))
	.set('view engine', 'ejs');

const routePath = `${__dirname}/routes/`;
FS.readdirSync(routePath).forEach((file) => {
    require(`${routePath}${file}`)(app);
});

Http.createServer(app).listen(3000, () => {
    console.log(`App listening on 3000!`);
});