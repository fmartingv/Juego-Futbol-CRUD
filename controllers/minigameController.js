const Player = require('../models/Player');

exports.getPenaltyGame = async (req, res) => {
    const jugador = await Player.getById(req.params.id);
    res.render('penalty', { jugador, resultado: null });
};

exports.playPenalty = async (req, res) => {
    try {
        const jugador = await Player.getById(req.params.id);
        const direccionJugador = req.body.direccion;
        
        const direcciones = ['izquierda', 'centro', 'derecha'];
        const direccionPortero = direcciones[Math.floor(Math.random() * 3)];

        let resultado = {};
        
        if (direccionJugador !== direccionPortero) {
            resultado.exito = true;
            resultado.mensaje = "¡Gol! Has anotado un penalti.";
            jugador.moral = Math.min(100, jugador.moral + 10);
            jugador.tecnica = Math.min(100, jugador.tecnica + 2);
        } else {
            resultado.exito = false;
            resultado.mensaje = "El portero ha parado el tiro.";
            jugador.moral = Math.max(0, jugador.moral - 5);
        }
        
        jugador.experiencia = Math.min(100, jugador.experiencia + 1);
        await Player.update(jugador.id, jugador);
        
        res.render('penalty', { jugador, resultado });
    } catch (error) {
        res.status(500).send('Error al jugar el penalti');
    }
};