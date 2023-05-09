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
  console.log('labelup')
}
function removeLabelUp () {
  sleep(50).then(() => {
    document.getElementById('main').classList.add('invisible')
    sleep(20)
    document.getElementById('header').classList.remove('labelup')
    document.getElementById('playlabel').classList.remove('invisible')
    document.getElementById('playerbutton').classList.remove('invisible')
    document.getElementById('aibutton').classList.remove('invisible')
  });
  console.log('labeldown')
}

document.getElementById('playerbutton').onclick = addLabelUp;
document.getElementById('aibutton').onclick = addLabelUp;
document.getElementById('backbutton').onclick = removeLabelUp;

