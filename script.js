function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function addLabelUp () {
  document.getElementById('header').classList.add('labelup')
  document.getElementById('playlabel').classList.add('invisible')
  document.getElementById('playerbutton').classList.add('invisible')
  document.getElementById('aibutton').classList.add('invisible')
  sleep(300).then(() => {
    document.getElementById('main').classList.remove('invisible')
  });
}
function removeLabelUp () {
  sleep(50).then(() => {
    document.getElementById('main').classList.add('invisible')
    document.getElementById('header').classList.remove('labelup')
    document.getElementById('playlabel').classList.remove('invisible')
    document.getElementById('playerbutton').classList.remove('invisible')
    document.getElementById('aibutton').classList.remove('invisible')
  });
}

function vsAI () {
  addLabelUp()
  document.getElementById('labelvs').innerHTML = 'Player VS. AI';
}

function vsPlayer () {
  addLabelUp()
  document.getElementById('labelvs').innerHTML = 'Player VS. Player';
}

document.getElementById('playerbutton').onclick = vsPlayer;

document.getElementById('aibutton').onclick = vsAI;

document.getElementById('backbutton').onclick = removeLabelUp;

