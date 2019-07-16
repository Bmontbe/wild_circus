const express = require('express');
const mysql = require('mysql');
const connection = require('./conf');
const port = 8000;
const api = express();

api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})


connection.connect((err) => {
  if (err) throw err;
  console.log("MYSQL connected ..");
});

api.get('/', (req, res) => {
  res.send('ok, good');
});

api.get('/comments', (req, res) => {
  connection.query('SELECT * FROM comment',(err, result) => {
    if (err) throw err;
    res.send(result);
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


// app.post('/api/events', (req, res) => {
//   console.log(req.body);
//   const data = { event: req.body.event, date_event: req.body.date_event, picture: req.body.picture, comment: req.body.comment };
//   const sql = 'INSERT INTO event SET ?';
//   connection.query(sql, data, (err, results) => {
//     if (err) {
//       // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
//       res.status(500).send('Erreur lors de la récupération des évènements');
//     } else {
//       console.log(results);
//       res.sendStatus(200);
//     }
//   });
// });

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
