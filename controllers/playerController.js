const Player = require('../models/Player');

exports.getAllPlayers = async (req, res) => {
    try {
        const jugadores = await Player.getAll();
        res.render('select-player', { jugadores });
    } catch (error) {
        res.status(500).send('Error al cargar los jugadores');
    }
};

exports.getPlayerById = async (req, res) => {
    try {
        const jugador = await Player.getById(req.params.id);
        if (jugador) {
            res.render('index', { jugador });
        } else {
            res.status(404).send('Jugador no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al cargar el jugador');
    }
};

exports.getAddPlayerForm = (req, res) => {
    res.render('add-player');
};

exports.addPlayer = async (req, res) => {
    try {
        const { nombre, tecnica, fisico, mental } = req.body;
        await Player.add({ 
            nombre, 
            tecnica: Number(tecnica), 
            fisico: Number(fisico), 
            mental: Number(mental),
            energia: 100,
            forma: 100
        });
        res.redirect('/players');
    } catch (error) {
        res.status(500).send('Error al añadir jugador');
    }
};

exports.getEditPlayerForm = async (req, res) => {
    try {
        const jugador = await Player.getById(req.params.id);
        res.render('edit-player', { jugador });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

exports.editPlayer = async (req, res) => {
    try {
        const { nombre, tecnica, fisico, mental } = req.body;
        await Player.update(req.params.id, { nombre, tecnica: Number(tecnica), fisico: Number(fisico), mental: Number(mental) });
        res.redirect(`/players/${req.params.id}`);
    } catch (error) {
        res.status(500).send('Error al editar jugador');
    }
};

exports.performAction = async (req, res) => {
    try {
        const tipo = req.params.type;
        const jugador = await Player.getById(req.params.id);
        
        if (!jugador) {
            return res.status(404).send('Jugador no encontrado');
        }

        switch(tipo) {
            case 'entrenarTecnica':
                jugador.tecnica += 2;
                jugador.energia -= 10;
                jugador.forma -= 5;
                break;
            case 'entrenarFisico':
                jugador.fisico += 2;
                jugador.energia -= 15;
                jugador.forma -= 10;
                break;
            case 'entrenarMental':
                jugador.mental += 2;
                jugador.energia -= 5;
                break;
            case 'descansar':
                jugador.energia = Math.min(jugador.energia + 30, 100);
                jugador.forma = Math.min(jugador.forma + 10, 100);
                break;
        }
        
        // Asegurar que los valores estén en el rango correcto
        jugador.energia = Math.max(0, Math.min(jugador.energia, 100));
        jugador.forma = Math.max(0, Math.min(jugador.forma, 100));

        await Player.update(jugador.id, jugador);
        res.redirect(`/players/${jugador.id}`);
    } catch (error) {
        res.status(500).send('Error al realizar la acción');
    }
};