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

// Tasca 2: Mostrar un producte que rebi un objecte producte i mostri per consola
function mostrarProducte(producte) {
  console.log(`Nom: ${producte.nom}`);
  console.log(`Marca: ${producte.marca}`);
  console.log(`Categoria: ${producte.categoria}`);
  console.log(`Preu: ${producte.preu}`);
  console.log(`Disponibilitat: ${producte.disponibilitat}`);
  console.log(`Caracteristiques: ${JSON.stringify(producte.caracteristiques, null, 2)}`);
}

// Tasca 3: Mostrar la llista de productes i imprimir-ho a la consola
function mostrarLlistaProductes() {
  const productes = llegirProductes();
  console.log('Llista de productes:');
  productes.forEach(producte => mostrarProducte(producte));
}

// Tasca 4: Mostrar producte per ID
function mostrarProducteID(id) {
  const productes = llegirProductes();
  const producte = productes.find(p => p.id === id);
  if (producte) {
    console.log(`\n Mostrant producte amb ID: ${id}`);
    mostrarProducte(producte);
  } else {
    console.log(`Producte amb ID: ${id} no trobat`);
  }
}

mostrarLlistaProductes();
mostrarProducte
mostrarProducteID(1); 
