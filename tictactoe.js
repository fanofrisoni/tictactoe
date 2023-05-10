const gridsquares = document.querySelectorAll('.gamesquare');
const labelvs = document.getElementById('labelvs');

var winner = false;
var replay = false;
var player = true;
var plays = 0;
var playing ;

let gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER
const startPVP = () => {
  gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];
  console.log(playing)
  if(playing){
    if(replay) {
      playing = true;
      winner = false;
      plays = 0;
      player = true;
      document.getElementById('replaybutton').classList.add('invisible')
      labelvs.innerHTML = "Player VS Player"
      for(let i = 0; i < gridsquares.length; i++){
        gridsquares[i].innerHTML = '';
        if(!gridsquares[i].classList.contains('selectable')){
          gridsquares[i].classList.add('selectable');
        }
      }
    }
    playing = true;
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
          if(!winner){
            game.endDraw();
          }
          
        }
      })
    }
  } else {
    return
  }
  
  
}

//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER//PLAYER VS PLAYER PLAYER VS PLAYER VS PLAYER PLAYER

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
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  const endPlayer1 = () => {
    winner = true;
    labelvs.innerHTML = "Player 1 WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  const endPlayer2 = () => {
    winner = true;
    labelvs.innerHTML = "Player 2 WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  return {
    putX, putO, endDraw, checkWinner, endPlayer1, endPlayer2
  };
})();

//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI

const startAI = () => {
  gameboard = [[9, 9, 9],[9, 9, 9],[9, 9, 9]];
  if(!playing){
    if(replay) {
      playing = false;
      winner = false;
      plays = 0;
      player = true;
      document.getElementById('replaybutton').classList.add('invisible')
      labelvs.innerHTML = "Player VS AI"
      for(let i = 0; i < gridsquares.length; i++){
        gridsquares[i].innerHTML = '';
        if(!gridsquares[i].classList.contains('selectable')){
          gridsquares[i].classList.add('selectable');
        }
      }
    }
    playing = false;
    replay = false;
    for(let i = 0; i < gridsquares.length; i++){
      gridsquares[i].addEventListener('click',()=>{
        if(player && gridsquares[i].classList.contains('selectable') && !winner){
          gameAI.putXAI(gridsquares[i]);
          player = !player
          gameAI.checkWinnerAI(gridsquares[i]);
        } 
        if(!player && !winner && plays<9) {
          let x, y;
          do {
            x = Math.floor(Math.random()*(3-0));
            y = Math.floor(Math.random()*(3-0));
          } while (!document.querySelector(`[x='${x}'][y='${y}']`).classList.contains('selectable') && !winner)
          
          console.log(x,y)
          gameAI.putOAI(document.querySelector(`[x='${x}'][y='${y}']`));
          player = !player
          gameAI.checkWinnerAI(document.querySelector(`[x='${x}'][y='${y}']`));
        } 
        if(plays==9){
          gameAI.checkWinnerAI(gridsquares[i]);
          if(!winner){
            gameAI.endDrawAI();
          }
        }
      })
      
    }
  } else {
    return
  }
  
  
  
}

//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI//PLAYER VS AI AI VS PLAYER VS AI AI

const gameAI = (() => {
  const putXAI = (i) => {
    gameboard[i.getAttribute('x')][i.getAttribute('y')] = 1;
    console.log(gameboard)
    i.innerHTML = 'X';
    i.classList.remove('selectable');
    plays++;
  }
  const putOAI = (i) => {
    gameboard[i.getAttribute('x')][i.getAttribute('y')] = 0;
    console.log(gameboard)
    i.innerHTML = 'O'
    i.classList.remove('selectable');
    plays++;
  }
  const checkWinnerAI = (i) => {
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
      endPlayer2AI();
    } else if (sumHor==3 || sumVert==3 || sumDiagDown==3 || sumDiagUp==3){
      endPlayer1AI();
    }
    console.log({sumHor, sumVert, sumDiagUp,sumDiagDown})
  }
  const endDrawAI = () => {
    winner = true;
    labelvs.innerHTML = "It's a Draw!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  const endPlayer1AI = () => {
    winner = true;
    labelvs.innerHTML = "Humanity WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  const endPlayer2AI = () => {
    winner = true;
    labelvs.innerHTML = "Computer WINS!"
    document.getElementById('replaybutton').classList.remove('invisible')
    document.getElementById('replaybutton').addEventListener('click', ()=>{replay=true
      if(playing){
        startPVP()
      } else {
        startAI();
      }});
  }
  return {
    putXAI, putOAI, endDrawAI, checkWinnerAI, endPlayer1AI, endPlayer2AI
  };
})();

document.getElementById('aibutton').addEventListener('click', ()=> {
  replay=true
  playing=false;
  startAI()
});
document.getElementById('playerbutton').addEventListener('click',()=> {
  replay=true
  playing=true;
  startPVP()
});
document.getElementById('backbutton').addEventListener('click', ()=>{replay=true
location.reload()});