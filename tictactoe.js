const gridsquares = document.querySelectorAll('.gamesquare');
const labelvs = document.getElementById('labelvs');

var winner = false;
var replay = false;
var player = true;
var plays = 0;

let gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];

const startPVP = () => {
  gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];
  if(replay) {
    winner = false;
    plays = 0;
    player = true;
    document.getElementById('replaybutton').classList.add('invisible')
    labelvs.innerHTML = "Player VS. Player"
    for(let i = 0; i < gridsquares.length; i++){
      gridsquares[i].innerHTML = '';
      if(!gridsquares[i].classList.contains('selectable')){
        gridsquares[i].classList.add('selectable');
      }
    }
  }
  replay = false;
  for(let i = 0; i < gridsquares.length; i++){
    gridsquares[i].addEventListener('click',()=>{
      if(player && gridsquares[i].classList.contains('selectable') && !winner){
        game.putX(gridsquares[i]);
        player = !player
        game.checkWinner(gridsquares[i]);
      } else if(!player && gridsquares[i].classList.contains('selectable') && !winner) {
        game.putO(gridsquares[i]);
        player = !player
        game.checkWinner(gridsquares[i]);
      } 
      if(plays==9){
        game.checkWinner(gridsquares[i]);
        game.endDraw();
      }
    })
  }
  
}

const startAI = () => {
  gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];
  if(replay) {
    plays = 0;
    player = true;
    document.getElementById('replaybutton').classList.add('invisible')
    labelvs.innerHTML = "Player VS. Player"
    for(let i = 0; i < gridsquares.length; i++){
      gridsquares[i].innerHTML = '';
      if(!gridsquares[i].classList.contains('selectable')){
        gridsquares[i].classList.add('selectable');
      }
    }
  }
  replay = false;
  for(let i = 0; i < gridsquares.length; i++){
    gridsquares[i].addEventListener('click',()=>{
      if(player && gridsquares[i].classList.contains('selectable') && !winner){
        game.putX(gridsquares[i]);
        player = !player
        game.checkWinner(gridsquares[i]);
      } else if(!player && gridsquares[i].classList.contains('selectable') && !winner) {
        game.putO(gridsquares[i]);
        player = !player
        game.checkWinner(gridsquares[i]);
      } 
      if(plays==9){
        game.checkWinner(gridsquares[i]);
        game.endDraw();
      }
    })
  }
  
}

const game = (() => {
  const putX = (i) => {
    gameboard[i.getAttribute('x')][i.getAttribute('y')] = 1;
    console.log(gameboard)
    i.innerHTML = 'X';
    i.classList.remove('selectable');
    plays++;
  }
  const putO = (i) => {
    gameboard[i.getAttribute('x')][i.getAttribute('y')] = 0;
    console.log(gameboard)
    i.innerHTML = 'O'
    i.classList.remove('selectable');
    plays++;
  }
  const checkWinner= (i) => {
    let x = i.getAttribute('x');
    let y = i.getAttribute('y');
    let sumDiagUp = 9;
    let sumDiagDown = 9;
    let sumVert = 9;
    let sumHor = 9;

    if(x==0){
      //ROW
      sumHor = gameboard[0].reduce ((sum,item) => sum+=item)
    } else if (x==1){
      //ROW
      sumHor = gameboard[1].reduce ((sum,item) => sum+=item)
    } else {
      //ROW
      sumHor = gameboard[2].reduce ((sum,item) => sum+=item)
    }

    if(y==0){
      //COLUMN
      sumVert = gameboard[0][0]+gameboard[1][0]+gameboard[2][0];
    } else if (y==1){
      //COLUMN
      sumVert = gameboard[0][1]+gameboard[1][1]+gameboard[2][1];
    } else {
      //COLUMN
      sumVert = gameboard[0][2]+gameboard[1][2]+gameboard[2][2];
    }

    if((x==1 && y==1)){
      sumDiagUp = gameboard[2][0]+gameboard[1][1]+gameboard[0][2];
      sumDiagDown = gameboard[0][0]+gameboard[1][1]+gameboard[2][2];
    }
    if((x==0 && y==0) || (x==2 && y==2)){
      sumDiagDown = gameboard[0][0]+gameboard[1][1]+gameboard[2][2];
    }
    if ((x==2 && y==0) || (x==0 && y==2)){
      sumDiagUp = gameboard[2][0]+gameboard[1][1]+gameboard[0][2];
    }

    if(sumHor==0 || sumVert==0 || sumDiagDown==0 || sumDiagUp==0){
      endPlayer2();
    } else if (sumHor==3 || sumVert==3 || sumDiagDown==3 || sumDiagUp==3){
      endPlayer1();
    }
    console.log({sumHor, sumVert, sumDiagUp,sumDiagDown})
  }
  const endDraw = () => {
    winner = true;
    labelvs.innerHTML = "It's a Draw!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      startPVP()});
  }
  const endPlayer1 = () => {
    winner = true;
    labelvs.innerHTML = "Player 1 WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      startPVP()});
  }
  const endPlayer2 = () => {
    winner = true;
    labelvs.innerHTML = "Player 2 WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
    startPVP()});
  }
  return {
    putX, putO, endDraw, checkWinner, endPlayer1, endPlayer2
  };
})();

document.getElementById('playerbutton').addEventListener('click', startPVP());
document.getElementById('aibutton').addEventListener('click', startAI());
document.getElementById('backbutton').addEventListener('click', ()=>{replay=true});