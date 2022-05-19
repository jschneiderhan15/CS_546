const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    //Specify helpers which are only registered on this instance
    helpers: {
        asJSON: (obj, spacing) => {
            if(typeof spacing === 'number')
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if(req.body && req.body_method) {
        req.method = req.body_method;
        delete req.body_method;
    }

    next();
}

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes can be found on http://localhost:3000");
})