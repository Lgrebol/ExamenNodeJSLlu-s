const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
const jsonFile = JSON.parse(fs.readFileSync('productes.json', 'utf-8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Tasca 1 Llegir el fitxer JSON i retornar un array d'objectes (defineix una fucnió llegirProductes que llegeixi el fitxer productes.json i retorni les dades com un array d'objectes)

function llegirProductes() {
        return new Promise((resolve, reject) => {
          fs.readFile(jsonFile, 'utf8', (err, data) => {
            if (err) {
              reject(err);
            } else {
              try {
                const games = JSON.parse(data);
                resolve(games);
              } catch (error) {
                reject(error);
              }
            }
          });
        });
      }

//Tasca 2 Mostrar un producte

function mostrarProducte(producte) {
    app.get('/productes/:id', async (req, res) => {
    try {
      const games = await llegirProductes();
      const game = games.find((g) => g.id === parseInt(req.params.id));
  
      if (!game) {
        return res.status(404).send('Producte no trobat');
      }





