const express = require('express');
const app = express(),
    bodyParser = require("body-parser");
const axios = require('axios');
port = 3080;

app.use(bodyParser.json());

app.post('/core/token', (req, res) => {
    let options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(`${req.body.username}:${req.body.password}`).toString('base64')),
        },
        params: {
            grant_type: 'client_credentials'
        }
    }
    axios(options)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/search', (req, res) => {
    axios.get(`https://api.spotify.com/v1/search?query=${req.query.type}:${req.query.query}&type=${req.query.type}`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/browse/new-releases', (req, res) => {
    axios.get(`https://api.spotify.com/v1/browse/new-releases`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/artists/id', (req, res) => {
    axios.get(`https://api.spotify.com/v1/artists/${req.query.id}`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/artists/id/albums', (req, res) => {
    axios.get(`https://api.spotify.com/v1/artists/${req.query.id}/albums`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/albums/id', (req, res) => {
    axios.get(`https://api.spotify.com/v1/albums/${req.query.id}`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/albums/id/tracks', (req, res) => {
    axios.get(`https://api.spotify.com/v1/albums/${req.query.id}/tracks`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});

app.get('/core/tracks', (req, res) => {
    axios.get(`https://api.spotify.com/v1/tracks?ids=${req.query.ids}`,
        {
            headers: {
                'Authorization': req.headers.authorization,
            }
        }
    )
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.json(error.response.data);
        })
});


app.get('/', (req, res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
