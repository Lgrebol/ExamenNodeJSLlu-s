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
    return JSON.parse(data);
  } catch (error) {
    console.error('Error llegint el fitxer JSON:', error);
    return [];
  }
}

// Tasca 2: Funció per mostrar un sol producte a la consola
function mostrarProducte(producte) {
  console.log(`Nom: ${producte.nom}`);
  console.log(`Marca: ${producte.marca}`);
  console.log(`Categoria: ${producte.categoria}`);
  console.log(`Preu: ${producte.preu}`);
  console.log(`Disponibilitat: ${producte.disponibilitat}`);
  console.log(`Caracteristiques: ${JSON.stringify(producte.caracteristiques)}`);
}

// Tasca 3: Mostrar la llista de productes al navegador
app.get('/productes', (req, res) => {
  const productes = llegirProductes();
  res.send(productes);
});

// Tasca 4: Mostrar un producte segons ID
app.get('/producte/:id', (req, res) => {
  const productes = llegirProductes();
  const producte = productes.find(p => p.id === parseInt(req.params.id));
  if (!producte) {
    return res.status(404).send('Producte no trobat');
  }
  res.send(producte);
});

// Tasca 5: Exemple d'ús de mostrarProducteID amb un ID específic
function mostrarProducteID(id) {
  const productes = llegirProductes();
  const producte = productes.find(p => p.id === id);
  if (producte) {
    mostrarProducte(producte); 
  } else {
    console.log('Producte no trobat');
  }
}

llegirProductes
mostrarProducte
mostrarProducteID(1);

