const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const jsonFile = JSON.parse(fs.readFileSync('productes.json', 'utf-8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Tasca 1 Llegir el fitxer JSON i retornar un array d'objectes

const fs = require('fs');

function llegirProductes() {

    const data = fs.readFileSync('productes.json', 'utf8');

    const productes = JSON.parse(data);
    return productes;
}

/*

try {
    const productes = llegirProductes();
    console.log(productes);
} catch (error) {
    console.error('Error llegint el fitxer:', error);
}

*/
//Tasca 2 Mostrar un producte

app.get('/producte/:id', (req, res) => {

    const producte = productes.find(p => p.id === parseInt(req.params.id));

    if (!producte) {
        return res.status(404).send('Producte no trobat');
    }


    res.send(producte);
});






