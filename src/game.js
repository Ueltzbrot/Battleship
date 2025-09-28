import {Ship, Player, Gameboard} from './logic'


class Game {
    constructor(){
        this.Player1 = null,
        this.Player2 = null,
        this.activePlayer = null

    }

    startGame(){
        this.Player1= new Player('human', 'Player1')
        this.Player2= new Player('human', 'Player2')
        this.activePlayer = this.Player1
    }

    changeActive(){
        this.activePlayer = this.activePlayer == this.Player1 ? this.Player2 : this.Player1
    }
}

export {Game}