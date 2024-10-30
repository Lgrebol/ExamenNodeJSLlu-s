const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Tasca 1: Llegir el fitxer JSON i retornar un array d'objectes
function llegirProductes() {
  try {
    const data = fs.readFileSync('productes.json', 'utf8');
    const productes = JSON.parse(data);
    return productes;
  } catch (error) {
    console.error('Error llegint el fitxer JSON:', error);
    return [];
  }
}

// Tasca 2: Mostrar un producte segons ID
function mostrarProducte(producte){
    app.get('/producte/:id', (req, res) => {
        const productes = llegirProductes();
        const producte = productes.find(p => p.id === parseInt(req.params.id));
        if (!producte) {
          return res.status(404).send('Producte no trobat');
        }
        res.send(producte);
      });
}

// Tasca 3: Mostrar la llista de productes
function mostrarProductes(productes){
    app.get('/productes', (req, res) => {
        const productes = llegirProductes();
        res.send(productes);
      });
}

// Tasca 5 Exemple d'ús
try {
  const productes = llegirProductes();
  console.log("Llista de productes:", productes);

// Tasca 4 Mostrar productes segons id
function mostrarProducteID(productes, id){
    app.get('/exemple/producte/:id', (req, res) => {
        const producte = productes.find(p => p.id === parseInt(req.params.id));
        if (!producte) {
          return res.status(404).send('Producte no trobat');
        }
        res.send(producte);
      });
    } catch (error) {
      console.error('Error llegint el fitxer en l\'exemple:', error);
    }
};
