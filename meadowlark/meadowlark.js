const express = require('express')
const path = require('path')
var expressHandlebars = require('express3-handlebars')
var app = express()
var router = express.Router()
var handlebars = expressHandlebars.create({defaultLayout: '../../meadowlark/views/layouts/main'})

var reslove = (__path) => path.join(__dirname, __path)

app.set('views', reslove('views'))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.use(express.static(reslove('/public')))

app.set('port', process.env.PORT || 3000);

app.get('/', function (req ,res) {
    res.render('home')
})

app.get('/about', function (req ,res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    console.log(randomFortune)
    res.render('about', { fortune: randomFortune })
})

app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
})

app.use(function (err, req, res, next) {
    res.status(500)
    res.render('500')
})

app.listen(3000)

console.log('express server : 3000')
