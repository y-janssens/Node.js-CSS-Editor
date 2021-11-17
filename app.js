const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')

app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Routes

app.get('/',  (req, res) => {
    res.render("index", { title: "CSS Editor" });
});


app.get('/valid',  (req, res) => {
    res.render("index", { title: "CSS Editor" });
});

app.post('/valid',  (req, res, next) => {

    let data = req.body.css_file;

    fs.writeFile('./public/main.css', data, (err) => {
        if (err) throw err;
    });
    res.redirect('/');
});

app.get('/cancel',  (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});