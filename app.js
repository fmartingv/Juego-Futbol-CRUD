const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rutas
const playerRoutes = require('./routes/players');
const minigameRoutes = require('./routes/minigames');

app.get('/', (req, res) => {
    res.redirect('/players');
});

app.use('/players', playerRoutes);
app.use('/minigames', minigameRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));