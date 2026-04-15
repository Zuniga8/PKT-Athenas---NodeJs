const express = require('express');
const path = require('path')
const hbs = require('hbs')
const newsInfo = require('./utils/apiNews')


const app = express();


const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
/*
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs'); */

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {

  res.render('index', { title: 'Znews', name: 'Gabriel Zuniga' });
})

app.get('/search', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'You must provide in search!'
    })
  }
  newsInfo(req.query.search, (error, { newsTitle, newsDescription, newsAuthor } = {}) => {

    if (error) {
      return res.send({ error })
    }

    res.send({
      newsTitle: newsTitle,
      newsDescription: newsDescription,
      newsAuthor: req.query.search
    })
  })

});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About us',
    name: 'Gabriel Zuniga'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    name: 'Gabriel Zuniga'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'zuniga error ',
    errorMessage: 'page not found'
  })
  //res.send('my 404 send')
})


app.get('/api', (req, res) => {
  res.json({ "msg": "Hello world" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})

// api b5b8fb769e304f879142e2d45b0eeb40