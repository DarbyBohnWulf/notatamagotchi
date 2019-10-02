class Tamagotchi {
  constructor() {
    this.name = 'Tamago Jūnin';
    this.hunger = 0;
    this.boredom = 0;
    this.sleepiness = 0;
    this.age = 0;
  }
}

const game = {
  playerName: '',
  playerBirthdate: '',
  timer: null,
  hunger: document.querySelector('#hunger'),
  sleep: document.querySelector('#sleepiness'),
  boredom: document.querySelector('#boredom'),
  _tamaSan: undefined,
  // a setter to trigger stat display on creation of pet
  set tamaSan(tama) {
    this._tamaSan = tama;
    this.updateMeters();
  },
  birthTamagotchi() {
    this.tamaSan = new Tamagotchi();
  },
  beginTimer() {},
  startGame() {
    this.birthTamagotchi();
  },
  updateMeters() {
    this.hunger.textContent = this._tamaSan.hunger;
    this.sleep.textContent = this._tamaSan.sleepiness;
    this.boredom.textContent = this._tamaSan.boredom;
  }
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const bday = document.querySelector('#birthdate');
  console.log(name.value, bday.value);
  game.startGame();
})
