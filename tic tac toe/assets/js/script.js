const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".game--status");
const restart = document.querySelector(".game--restart");

let turn = "X";
let running = false; //in case of an end scenario
let board = ["","","","","","","","",""];

/////////////////////////////////////////////////////////////////////
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
///////////////////////////////////////////////
 const init= ()=> {
        cells.forEach(cell => cell.addEventListener("click",cellClicked));
        restart.addEventListener("click" , restartGame)
        status.innerHTML =  `It's ${turn}'s turn!!`;
        running = true;
 }
 init();
///////////////////////////////////////////////
 function cellClicked(){
    const cellIndex = this.getAttribute("data-cell-index");
    if(board[cellIndex] != "" || !running){
        return;
    }
    updateCell(this , cellIndex);
    checkWinner();
    
 }
 ////////////////////////////////////////////////
 function updateCell(cell, index){
    board[index] = turn;
    cell.innerHTML = turn;
 }
//////////////////////////////////////////////
 function changeTurn(){

    turn =(turn=="X" )?"O":"X";

    status.innerHTML = `It's ${turn}'s turn`
         
    }

//////////////////////////////////////////////////////////////
const checkWinner = () =>{
   let roundWon = false;

   for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
            const cellA = board[condition[0]];
            const cellB = board[condition[1]];
            const cellC = board[condition[2]];

    if(cellA == "" || cellB == "" || cellC == ""){
        continue;
    }

    if(cellA == cellB && cellB == cellC){
        roundWon = true;
        break;
    }
   }

  

   if(roundWon){
    status.innerHTML = `${turn} wins!!`;
    running = false;
   }

   else if(!board.includes("")){
    status.innerHTML = `Draw!!`;
    running = false;
   }
   else{
    changeTurn();
   }
};
////////////////////////////////////////////////
function restartGame(){
    turn = "X";
    board = ["","","","","","","","",""];
    status.innerHTML = `It's ${turn}'s turn`;
    cells.forEach(cell => cell.innerHTML = "");
    running = true;
}
