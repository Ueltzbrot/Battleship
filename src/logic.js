
class Ship{
    constructor(length){
      this.length = length,
      this.hits = 0,
      this.sunk = false
    
    }
    hit(){
      this.hits+=1
      this.isSunk();
    }
  
    isSunk(){
    return this.hits == this.length ? this.sunk = true : this.sunk = false   
    }
  }

  class Gameboard {
    constructor(){
      this.ship = [],
      this.size = 10,
      this.board = Array.from(new Array(this.size), () => Array(10).fill(null)),
      this.missedShots = [],
      this.gotHit = []
      this.alreadyPlaced = new Set()
    }
  
    placeShip(name,row, col, direction, length){

      const newShip = new Ship(length);
      this.ship.push(newShip)
      for (let i = 0; i < length; i++) {
        const r = direction === 'vertical' ? row + i : row;
        const c = direction === 'horizontal' ? col + i : col;
        this.board[r][c] = newShip;
      }
      }
  
  
/*       checkIfAvailable(name, row, col, direction, length) {
        if (direction === 'horizontal') {
          if (col + length > this.size) throw new Error(`${name} is too big for this row`);
          for (let i = 0; i < length; i++) {
            if (this.board[row][col + i] !== null) {
              throw new Error(`There are two boats colliding Please change: ${name}`);
            }
          }
        } else if (direction === 'vertical') {
          if (row + length > this.size) throw new Error(`${name} is too big for this row`);
          for (let i = 0; i < length; i++) {
            if (this.board[row + i][col] !== null) {
              throw new Error(`There are two boats colliding Please change: ${name}`);
            }
          }
        } else {
          throw new Error('Invalid direction');
        }
        return true;
      } */
  

      checkIfAvailable2(name,row,col,direction,length){

        for (let i = 0; i<length; i++){
          const column = direction === 'horizontal' ? Number(col)-1 + i : Number(col)-1
          const rows = direction === 'vertical' ? Number(row)-1 + i : Number(row)-1

          let key = `${rows},${column}`

          if(column > 9 || rows >9 || rows <0 || column <0){
            throw new Error(`${name} is too big for this placement`)
          }

          if (this.alreadyPlaced.has(key)){
            throw new Error(`${name} kollidiert bei Feld ${rows+1}, ${column+1}`)

          }
          
          else {this.alreadyPlaced.add(key)}
        }


      }
  
      checkSunk() {
        const remainingShips = this.ship.filter(ship => !ship.isSunk());
        return {
          allSunk: remainingShips.length === 0,
          remaining: remainingShips.length
        };
      }
  
  
      receiveAttack(row, col){
        let target = this.board[row][col]
  
        if(this.missedShots.some(shot=>shot.row === row && shot.col === col)){
          throw new Error('this was already attacked, please choose a new one!')
        } 
  
        if(this.gotHit.some(shot=>shot.row === row && shot.col === col)){
          throw new Error('this was already attacked, please choose a new one!')
        } 
  
        if(this.board[row][col]!==null){
          target.hit();
          this.gotHit.push({row, col})
          
          return {hit:true, ship:target}
        }else {
           this.missedShots.push({row, col})
           return {hit: false, coordinates:{ row,col }}
        }
      }
    }
  
  
  class Player{
    constructor(playerType, playerName){
      this.playerType = playerType,
      this.playerName = playerName
      this.playerBoard = new Gameboard()
    }
  
  
  }
  
  export {Ship, Player, Gameboard}