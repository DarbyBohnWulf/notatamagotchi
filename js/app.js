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
  tamaSan: undefined,
  birthTamagotchi() {
    this.tamaSan = new Tamagotchi();
  },
  beginTimer() {},
  startGame() {}
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const bday = document.querySelector('#birthdate');
  console.log(name.value, bday.value);
  game.birthTamagotchi();
})
