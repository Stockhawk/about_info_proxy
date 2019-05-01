const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const URLS = require('./URLS.js');
console.log(URLS);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/stocks/:ticker', express.static(path.join(__dirname, 'public')));

const charts = axios.create({ baseURL: URLS.charts, });
const aboutInfo = axios.create({ baseURL: URLS.aboutInfo, });
const buySell = axios.create({ baseURL: URLS.buySell, });
const ratingsHistory = axios.create({ baseURL: URLS.ratingsHistory, });

//
// CHARTS
//

app.use('/api/stocks/:symbol/prices', (req, res) => {
  charts.get(`/api/stocks/${req.params.symbol}/prices`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

//
// ABOUT / INFO
//

app.use('/api/quotes/:symbol', (req, res) => {
  aboutInfo.get(`/api/stocks/${req.params.symbol}`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

app.use('/api/tags/:symbol', (req, res) => {
  aboutInfo.get(`/api/stocks/${req.params.symbol}`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

//
// BUY / SELL
//

app.use('/api/stocks/:symbol', (req, res) => {
  buySell.get(`/api/stocks/${req.params.symbol}`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

app.use('/api/accounts/:account_number', (req, res) => {
  buySell.get(`/api/accounts/${req.params.account_number}`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

//
// RATINGS
//

app.use('/api/stocks/:symbol/ratings', (req, res) => {
  ratingsHistory.get(`/api/stocks/${req.params.symbol}/ratings`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

app.use('/api/stocks/:symbol/history', (req, res) => {
  ratingsHistory.get(`/api/stocks/${req.params.ticker}/history`)
    .then(response => res.send(response.data))
    .catch(err => res.status(500).send(err));
});

//
// PROXY SERVER LISTEN
//

app.listen(port, () => {
  console.log(`[Server] Listening on port ${port}`);
});
