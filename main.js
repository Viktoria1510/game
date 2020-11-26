const getB = b => {
  return document.getElementById(b);
}

var arrow =  getB('turn-arrow');
var turn = true;
var effectTime = 500;

const crosh = {
  baseHP: 100,
  realHP: 100,
  name: 'Крош',
  textHP: getB('health-character'),
  barHP: getB('progressbar-character'),
  container: document.getElementsByClassName('character')[0]
}

const hedgehog = {
  baseHP: 100,
  realHP: 100,
  name: 'Йожик',
  textHP: getB('health-enemy'),
  barHP: getB('progressbar-enemy'),
  container: document.getElementsByClassName('enemy')[0]
}

const updateHP = player => {
  player.textHP.innerText = player.realHP + ' / ' + player.baseHP;
  player.barHP.style.width = player.realHP + '%';
  player.container.prepend(arrow);
}

const victory = () => {
  var pl;
  if (!turn) pl = crosh;
  else pl = hedgehog;
  getB('victory-screen').style.display = 'flex';
  getB('victory-text').innerText = 'Переміг ' + pl.name;
  getB('victory-image').src = pl.container.getElementsByClassName('sprite')[0].src;
}

const dealDamage = player => {
turn = !turn;
  var damage = getRand(40);
  player.realHP = player.realHP - damage;
  var dmgEl = document.createElement('span');
  dmgEl.innerText = '-' + damage;
  dmgEl.classList.add('damage');
  player.container.parentElement.appendChild(dmgEl);
  setTimeout(function()
  {
    player.container.style.animation = "";
    dmgEl.remove();
  }, effectTime);
  if (player.realHP < 0) {
    player.realHP = 0;
    victory();
  }
  updateHP(player);
}

getB('character-btn-kick').addEventListener('click', function() {
  if (turn) {
    dealDamage(hedgehog);
  } 
});

getB('enemy-btn-kick').addEventListener('click', function() {
  if (!turn) {
    dealDamage(crosh);
  } 
});

getB('restart').addEventListener('click', function() 
{
  turn = true;
  crosh.realHP = crosh.baseHP;
  hedgehog.realHP = hedgehog.baseHP;
  updateHP(hedgehog); updateHP(crosh);
  getB('victory-screen').style.display = 'none';
});


const getRand = max => {
  return Math.floor(Math.random()*max);
}