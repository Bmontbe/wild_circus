const express = require('express');
const api = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./conf');
const port = 8000;

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

api.use(bodyParser.json());
api.use(cors());

connection.connect((err) => {
  if (err) throw err;
  console.log("MYSQL connected ..");
});

api.get('/', (req, res) => {
  res.send('ok, good');
});

api.get('/comments', (req, res) => {
  connection.query('SELECT * FROM commentwithoutidcustomer',(err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

api.post('/comments', (req, res) => {
  console.log(req.body);
  const data = { pseudo: req.body.pseudo, customer_comment: req.body.customer_comment, score: req.body.score};
  const sql = 'INSERT INTO commentwithoutidcustomer SET ?';
  connection.query(sql, data, (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de l'envoi du commentaire");
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});


api.get('/shows', (req, res) => {
  connection.query('SELECT * FROM shows',(err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

api.get('/orders', (req, res) => {
  connection.query('SELECT o.id, s.name, s.city, s.code_postal, s.date_show, s.num_places, s.price_adult, o.adult_place, s.price_child, o.child_place FROM orderswithoutidcustomer o JOIN shows s ON s.id=o.id_show',(err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

api.post('/orders', (req, res) => {
  console.log(req.body);
  const data = { id_show: req.body.id_show, adult_place: req.body.adult_place, child_place: req.body.child_place};
  const sql = 'INSERT INTO orderswithoutidcustomer SET ?';
  connection.query(sql, data, (err, result) => {
    if (err) {
    console.log(err)
      res.status(500).send("Erreur lors de l'envoi du commentaire");
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

api.post('/shows', (req, res) => {
  console.log(req.body);
  const data = { name: req.body.name, city: req.body.city, date_show: req.body.date_show, num_places: req.body.num_places, price_adult: req.body.price_adult, price_child: req.body.price_child, code_postal: req.body.code_postal};
  const sql = 'INSERT INTO shows SET ?';
  connection.query(sql, data, (err, result) => {
    if (err) {
    console.log(err)
      res.status(500).send("Erreur lors de l'envoi du commentaire");
    } else {
      console.log(result);
      res.sendStatus(200);
    }
  });
});

api.get('/places', (req, res) => {
  connection.query('SELECT s.id, s.name, s.date_show, s.city, s.num_places, SUM(o.adult_place) AS total_adult, SUM(o.child_place) AS total_child FROM orderswithoutidcustomer o JOIN shows s ON s.id=o.id_show GROUP BY id_show',(err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


api.listen(port,(err) => {
  if(err) throw err;
  console.log('API running ..');
})


// app.delete('/api/events/:id', (req, res) => {
//   console.log(req.body);
//   const idEvent = { id: req.params.id };
//   const sql = 'DELETE FROM event WHERE id = ';
//   connection.query(sql + req.params.id, idEvent, (err, results) => {
//     if (err) {
//       res.status(500).send("Erreur lors de la suppression de l'évènement");
//     } else {
//       res.sendStatus(200);
//       console.log(results)
//     }
//   });
// });
