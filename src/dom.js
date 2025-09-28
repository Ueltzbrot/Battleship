import {Game} from './game'

let start = document.querySelector('.Start')
let choosePlayer = document.querySelector('.Player')
let comp = document.querySelector('.Computer')
let board1 = document.querySelector('.Spielfeld')
let board2 = document.querySelector('.Shots')
let container = document.querySelector('.container')
let weiter = document.querySelector('.weiter')
let playerName = document.createElement('div')
let formButton = document.querySelector('.formButton')
let form = document.querySelector('form')

let currentGame

window.addEventListener('DOMContentLoaded', () =>{
    start.addEventListener('click', () => startGame()) })

function startGame(){
         currentGame = new Game();
        choosePlayer.style.display = 'none'
            comp.style.display = 'none'
            start.style.display = 'none'
             weiter.style.display = 'flex'
             form.style.display = 'grid'
             weiter.disabled = true;
             currentGame.startGame();
            generateBoard(currentGame.Player1.playerBoard.size, currentGame);
            updateHitsAndMisses(currentGame)     
        }
    

weiter.addEventListener('click', () =>{
            weiter.disabled = true
            currentGame.changeActive()
            updateSpielfeld(currentGame)
            updateHitsAndMisses(currentGame)
        })        


function generateBoard(size, game){

    container.appendChild(playerName)
               playerName.innerHTML = `${currentGame.activePlayer.playerName} its your turn`

    board1.innerHTML =''
    board2.innerHTML =''

    board1.style.display='grid'    
    board2.style.display='grid'

    
    for (let row = 0; row<size; row++){
        for(let col = 0; col<size; col++){
            
            let div = document.createElement('div');
            let div2 = document.createElement('div')
    
            div.classList.add('cell');
            div2.classList.add('cell2');
    
            div.dataset.row = row;
            div.dataset.column = col;
    
            div2.dataset.row = row;
            div2.dataset.column = col;
    
            board1.appendChild(div)
            board2.appendChild(div2)
        }
        }
}




function updateSpielfeld(game){
    playerName.innerHTML = `${currentGame.activePlayer.playerName} its your turn`
    let shipArr = game.activePlayer.playerBoard.board
    shipArr.forEach((element, rowIndex) =>{
        element.forEach((div, colIndex) =>{
            const selectDiv = document.querySelector(`div[data-row="${rowIndex}"][data-column="${colIndex}"]`);
            if(div !== null){
                selectDiv.style.backgroundColor = 'black';
            } else{selectDiv.style.backgroundColor = 'white'}
        })
    })

    let curr = game.activePlayer

    let hits = curr.playerBoard.gotHit;
    hits.forEach((e) => {
        let impDiv = document.querySelector(`.cell[data-row="${e.row}"][data-column="${e.col}"]`);
        impDiv.style.backgroundColor = 'red'
    })



    let misses = curr.playerBoard.missedShots;
    misses.forEach((e) => {
        let impDiv = document.querySelector(`.cell[data-row="${e.row}"][data-column="${e.col}"]`);
        impDiv.style.backgroundColor = 'grey'
    })


}

(function setupBoardClick() {
    board2.addEventListener('click', (event) => {
        const cell = event.target.closest('.cell2');
        if (!cell) return;

        try{
            let curr = currentGame.activePlayer
            let tar = currentGame.activePlayer === currentGame.Player1 ? currentGame.Player2 : currentGame.Player1
        const result = tar.playerBoard.receiveAttack(`${cell.dataset.row}`, `${cell.dataset.column}`);
        if(result.hit){
            cell.style.backgroundColor = 'green'
            weiter.disabled = false
            checkStatus(currentGame)

    } else{
        cell.style.backgroundColor = 'red'
        weiter.disabled = false
        checkStatus(currentGame)

      }   }catch(e){window.alert(e)}
    });
})();


function checkStatus(game){
    let curr = game.activePlayer
    let tar = game.activePlayer === game.Player1 ? game.Player2 : game.Player1

    const result = tar.playerBoard.checkSunk()
    console.log(result)
    if(result.allSunk){
        window.alert('congrats! you won!')
        startGame();

    }

}



function updateHitsAndMisses(game){

    let tar = game.activePlayer === game.Player1 ? game.Player2 : game.Player1

    let allDivs = document.querySelectorAll('.Shots > .cell2')
    allDivs.forEach((element) =>{
         element.style.backgroundColor = 'white'
    })


    let hits = tar.playerBoard.gotHit;
    hits.forEach((e) => {
        let impDiv = document.querySelector(`.cell2[data-row="${e.row}"][data-column="${e.col}"]`);
        console.log(impDiv)
        impDiv.style.backgroundColor = 'green'
    })



    let misses = tar.playerBoard.missedShots;
    misses.forEach((e) => {
        let impDiv = document.querySelector(`.cell2[data-row="${e.row}"][data-column="${e.col}"]`);
        console.log(impDiv)
        impDiv.style.backgroundColor = 'red'
    })
}


formButton.addEventListener('click', (event) =>{
    event.preventDefault();
    const ships = [
    {
        name: 'Carrier',
        row: document.getElementById('CarrierRow').value,
        col: document.getElementById('CarrierCol').value,
        dir: document.querySelector('[name=CarrierDir]').value,
        length: 5

    },
    {
        name: 'Battleship',
        row: document.getElementById('BattleshipRow').value,
        col: document.getElementById('BattleshipCol').value,
        dir: document.querySelector('[name=BattleshipDir]').value,
        length: 4
    },
    
    {   
        name: 'Kreuzer',
        row: document.getElementById('KreuzerRow').value,
        col: document.getElementById('KreuzerCol').value,
        dir: document.querySelector('[name=KreuzerDir]').value,
        length: 3
    },
    {   
        name: 'UBoot',
        row: document.getElementById('UBootRow').value,
        col: document.getElementById('UBootCol').value,
        dir: document.querySelector('[name=UBootDir]').value,
        length: 3
    },
    {
        name: 'Destroyer',    
        row: document.getElementById('DestroyerRow').value,
        col: document.getElementById('DestroyerCol').value,
        dir: document.querySelector('[name=DestroyerDir]').value,
        length: 2 
    }]

    try{
        ships.forEach((element) =>{
            currentGame.activePlayer.playerBoard.checkIfAvailable2(element.name, Number(element.row), Number(element.col), element.dir, element.length)

        })


        ships.forEach((element) =>{
            currentGame.activePlayer.playerBoard.placeShip(element.name, Number(element.row), Number(element.col), element.dir, element.length)
        })
        form.reset()
        currentGame.changeActive();
        if(currentGame.activePlayer === currentGame.Player1){
            form.style.display = 'none'
        }
        updateSpielfeld(currentGame)
        updateHitsAndMisses(currentGame)

    }catch(e){
        console.log(e)
        window.alert(e)
    }

})



