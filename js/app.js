class Tamagotchi {
  constructor(name) {
    this.name = name ? name : 'Tamago Jūnin';
    this.hunger = 6;
    this.boredom = 6;
    this.sleepiness = 6;
    this.age = 0;
  }
}

const game = {
  playerName: '',
  playerBirthdate: '',
  _timer: null,
  hunger: document.querySelector('#hunger'),
  sleep: document.querySelector('#sleepiness'),
  boredom: document.querySelector('#boredom'),
  tamaElem: document.querySelector('#display p'),
  _tamaSan: undefined,
  // a setter to trigger stat display on creation of pet
  set tamaSan(tama) {
    this._tamaSan = tama;
    this.updateMeters();
  },
  // a setter to prevent unauthorized time changes
  set time(newTime) {
    if (!this._timer) {
      this._timer = 0
    } else alert('Time set at beginning of universe.');
  },
  birthTamagotchi(name = '') {
    this.tamaSan = new Tamagotchi(name);
    this.beginTimer();
  },
  beginTimer() {},
  startGame(name,bday) {
    this.playerName = name;
    this.playerBirthdate = bday ? bday : '1996-09-06';
    // this.updateDisplay();
  },
  initialize() {
    const name = document.querySelector('#name');
    const bday = document.querySelector('#birthdate');
    const form = document.querySelector('#game form');
    const gameArea = document.querySelector('#game');
    game.startGame(name.value,bday.value);
    form.removeChild(bday);
    // removing anonymous listeners is ~impossible in vanill JS so..
    const newForm = form.cloneNode(true);
    gameArea.removeChild(form);
    gameArea.prepend(newForm);
    this.addNameListener(newForm);
  },
  updateMeters() {
    this.hunger.textContent = this._tamaSan.hunger;
    this.sleep.textContent = this._tamaSan.sleepiness;
    this.boredom.textContent = this._tamaSan.boredom;
  },
  updateDisplay() {

  },
  addNameListener(elem) {
    elem.addEventListener('submit', e => {
      e.preventDefault();
      game.birthTamagotchi(document.querySelector('#name').value);
      document.querySelector('#game').removeChild(e.currentTarget);
    });
  }
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  game.initialize();
})
