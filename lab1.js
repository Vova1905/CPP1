const readlineSync = require('readline-sync');
const Height = readlineSync.question('Type in the height of board\n');
const Width = readlineSync.question('Type in the width of board\n');
const Density = readlineSync.question('Type in the board population density (0 < density < 1)\n');
let Step = 0;
let Life = true;


function CreateBoard(){
  let board=[];
  for(let i=0;i<Height;i++){
    board[i]=[];
    for(let j=0;j<Width;j++){
      board[i][j]=0;
    }
  }
  return board;
}

function RandomizeBoard(board){
  for(let i=0;i<Height;i++){
    for(let j=0;j<Width;j++){
        board[i][j] = (Math.random() > (1-Density));
      }
    }
}

function PrintBoard(board){
  for(let i=0;i<Height;i++){
    for(let j=0;j<Width;j++){
      if(board[i][j]) {process.stdout.write('O ');}
      else {process.stdout.write('  ');}
    }
    process.stdout.write('\n');
  }
}

function NextGeneration(board){
  let newboard=[];
  for(let i=0;i<Height;i++){
    newboard[i]=[];
    for(let j=0;j<Width;j++){
      newboard[i][j] = (Neighbors(board,i,j)==3||(Neighbors(board,i,j)==2 && board[i][j]));
    }
  }
  PrintBoard(newboard);
  if (JSON.stringify(board) == JSON.stringify(newboard)) {console.log('THE END'); Life = false;}
  for(let i=0;i<Height;i++){
    for(let j=0;j<Width;j++){
      board[i][j]=newboard[i][j];
    }
  }
}

function Neighbors(board,i,j){
  if(i<=0||j<=0||i>=Height-1||j>=Width-1) {return 0;}
  return board[i-1][j-1] + board[i-1][j] + board[i-1][j+1] +
         board[i]  [j-1] + 0             + board[i]  [j+1] +
         board[i+1][j-1] + board[i+1][j] + board[i+1][j+1];
}

function CountBeings(board){
  let count = 0;
  for(let i=0;i<Height;i++){
    for(let j=0;j<Width;j++){
      if (board[i][j]) count++;
    }
  }
  return count;
}

let ExistentBoard = CreateBoard();
RandomizeBoard(ExistentBoard);
setInterval(function(){
  if(Life){
    console.clear();
    Step++;
    NextGeneration(ExistentBoard);
    console.log('Generation: ' + Step);
    console.log('Number of beings: ' + CountBeings(ExistentBoard));
  }
}, 200);
