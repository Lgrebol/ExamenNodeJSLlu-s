const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
const jsonFile = path.join(__dirname, 'productes.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Tasca 1 Llegir el fitxer JSON i retornar un array d'objectes

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

