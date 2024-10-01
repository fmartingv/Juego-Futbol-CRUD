const fs = require('fs').promises;
const path = require('path');

const jugadoresFilePath = path.join(__dirname, '..', 'jugadores.json');

class Player {
    static async getAll() {
        const data = await fs.readFile(jugadoresFilePath, 'utf8');
        return JSON.parse(data);
    }

    static async getById(id) {
        const jugadores = await this.getAll();
        return jugadores.find(j => j.id === id);
    }

    static async add(jugador) {
        const jugadores = await this.getAll();
        jugador.id = Date.now().toString();
        jugador.nivel = this.calcularNivel(jugador);
        jugadores.push(jugador);
        await fs.writeFile(jugadoresFilePath, JSON.stringify(jugadores, null, 2));
    }

    static async update(id, updatedJugador) {
        const jugadores = await this.getAll();
        const index = jugadores.findIndex(j => j.id === id);
        if (index !== -1) {
            jugadores[index] = { ...jugadores[index], ...updatedJugador };
            jugadores[index].nivel = this.calcularNivel(jugadores[index]);
            await fs.writeFile(jugadoresFilePath, JSON.stringify(jugadores, null, 2));
        }
    }

    static calcularNivel(jugador) {
        return Math.floor((jugador.tecnica + jugador.fisico + jugador.mental) / 3);
    }
}

module.exports = Player;