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
