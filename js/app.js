
class Tamagotchi {
  constructor(name) {
    this.name = name ? name : 'Tamago Jūnin';
    this.hunger = 4;
    this.boredom = 4;
    this.sleepiness = 4;
    this.age = 0;
    this.face = game.faces[0];
    this.feeding = false;
    this.asleep = false;
    this.playing = false;
  }
  live() {
    if (game._tamaSan.hunger >= 10 || game._tamaSan.sleepiness >= 10 || game._tamaSan.boredom >= 10) {
      this.die();
    }
    if (this.feeding && this.hunger > 1) this.hunger--;
    if (this.asleep && this.sleepiness > 1) this.sleepiness--;
    if (this.playing && this.boredom > 1) this.boredom--;
    this.feeding = false;
    this.asleep = false;
    this.playing = false;
    if (game.timeElapsed % 7 === 0) {
      this.hunger++;
    } else if (game.timeElapsed % 9 === 0) {
      this.hunger++;
      this.boredom++;
    } else if (game.timeElapsed % 16 === 0) {
      this.hunger++;
      this.sleepiness++;
      this.boredom++;
    }
    this.getOlder();
  }
  getOlder() {
    if (game.timeElapsed === 100) {
      this.die();
    } else if (game.timeElapsed === 70) {
      this.growUp();
    } else if (game.timeElapsed === 50) {
      this.growUp();
    } else if (game.timeElapsed === 30) {
      this.growUp();
    } else if (game.timeElapsed === 3) {
      this.growUp();
    }
  }
  die() {
    this.face = game.faces[5];
    clearInterval(game._timer);
    this.shakeUpDown();
    game.updateDisplay();
  }
  growUp() {
    this.age++;
    this.shakeSideSide();
    this.face = game.faces[this.age];
  }
  shakeSideSide() {
    game.tamaElem.animate({
      transform: ['translateX(13px)','translateX(-13px)']
      // { transform: 'translateX(3em)'}
    }, {
      duration: 500,
      iterations: 3
    })
  }
  shakeUpDown() {
    game.tamaElem.animate({
      transform: ['translateY(13px)','translateY(-13px)']
    },{
      duration: 500,
      iterations: 3
    })
  }
}

const game = {
  playerName: '',
  playerBirthdate: '',
  _timer: null,
  timeElapsed: 0,
  selfElem: document.querySelector('#game'), //
  form: document.querySelector('#game form'),
  name: document.querySelector('#name'),
  bday: document.querySelector('#birthdate'),
  hunger: document.querySelector('#hunger'),
  sleep: document.querySelector('#sleepiness'),
  boredom: document.querySelector('#boredom'),
  tamaElem: document.querySelector('#display p'),
  _tamaSan: undefined,
  faces: [
    '👶','👧','🧑','👩','👵','💀'
  ],
  // a setter to trigger stat display on creation of pet
  set tamaSan(tama) {
    this._tamaSan = tama;
    this.updateMeters();
  },
  // a setter to prevent unauthorized time changes
  set timer(newTime) {
    // check to see if _timer already started i.e. game already in progress
    if (!this._timer) {
      // starts a timer or gives an annoying alert
      // this._timer = setInterval(game.tick, 1000);
    } else alert('Time set at beginning of universe.');
  },
  birthTamagotchi(name = '') {
    this.tamaSan = new Tamagotchi(name);
    setTimeout(this.beginTimer(), 200);
  },
  beginTimer() {
    this._timer = setInterval(game.tick, 1000);
  },
  startGame(name,bday) {
    this.playerName = name;
    this.playerBirthdate = bday ? bday : '1996-09-06';
    this.form.removeChild(this.bday);
    const newForm = this.form.cloneNode(true);
    this.selfElem.removeChild(this.form);
    this.selfElem.prepend(newForm);
    this.addNameListener(newForm);
  },
  // sets the scene to start the game
  initialize() {
    game.startGame(this.name.value,this.bday.value);
    // removing anonymous listeners is ~impossible in vanill JS so..
    // to change the form from being for your name to being for the pet's name
  },
  // method to stop pet from reaching back and messing with things
  updateMeters() {
    this.hunger.textContent = this._tamaSan.hunger;
    this.sleep.textContent = this._tamaSan.sleepiness;
    this.boredom.textContent = this._tamaSan.boredom;
  },
  updateDisplay() {
    this.tamaElem.textContent = this._tamaSan.face;
    this.updateMeters();
  },
  addNameListener(elem) {
    elem.addEventListener('submit', e => {
      e.preventDefault();
      game.birthTamagotchi(document.querySelector('#name').value);
      document.querySelector('#game').removeChild(e.currentTarget);
    });
  },
  tick() {
    game.updateDisplay();
    game.timeElapsed++;
    game._tamaSan.live();
  },
  setWidth() {
    this.selfElem.style.width = this.selfElem.scrollWidth + 'px';
  }
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  game.initialize();
})

document.querySelector('#feed').addEventListener('click', e => {
  game._tamaSan.feeding = true;
})
document.querySelector('#lights').addEventListener('click', e => {
  game._tamaSan.asleep = true;
})
document.querySelector('#play').addEventListener('click', e => {
  game._tamaSan.playing = true;
})
