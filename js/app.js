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

}

document.querySelector('form').addEventListener('submit', e => {
  const name = document.querySelector('#name');
  const bday = document.querySelector('#birthdate');
  e.preventDefault();
  console.log(name.value, bday.value);
})
