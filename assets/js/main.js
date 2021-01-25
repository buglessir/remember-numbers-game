'use strict';

class Puzzle {
  constructor() {
    this.remember_time = 10; // 10 seconds
    this.game_size = 10;
    this.game_intro = document.querySelector('.game-intro');
    this.game_finished = document.querySelector('.game-finished');
    this.game_board = document.querySelector('.game-board');
    this.numbers_list = document.querySelector('.numbers-list');
    this.remember_timer = document.getElementById('remember-timer');
    this.remember_title = document.getElementById('remember-title');
    this.started_title = document.getElementById('started-title');
    this.check_btn = document.querySelector('.check-btn');
    this.numbers = [];
  }

  checkAnswers() {
    var inputs = document.querySelectorAll('.numbers-list > li > input');
    var success = false;
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var answer = this.numbers[input.name];
      success = +input.value === answer;
    }
    if (success) {
      this.game_board.classList.add('none');
      this.game_finished.classList.remove('none');
      this.check_btn.classList.add('none');
    } else {
      alert('You had the wrong answer');
    }
  }

  createRandomNumbers() {
    var numbers = [];
    var html = '';
    for (var i = 0; i < this.game_size; i++ ) {
      numbers.push(Math.floor(Math.random() * 100));
    }
    this.numbers = numbers;
    for (var i of numbers) {
      html += `<li>${i}</li>`;
    }
    this.numbers_list.innerHTML = html;
  }

  convertNumbersToInput() {
    var selection = [];
    while(selection.length < this.game_size/2){
      var random = Math.floor(Math.random() * this.game_size-1);
      if (selection.indexOf(random) === -1) {
        selection.push(random);
      }
    }
    var items = document.querySelectorAll('.numbers-list > li');
    for (var i = 0; i < items.length; i++) {
      if (selection.includes(i)) {
        items[i].innerHTML = `<input maxlength="2" type="text" name="${i}" />`;
      }
    }
  }

  rememberTimeout() {
    if (this.remember_time === -1) {
      this.remember_time = 10;
      this.remember_title.classList.add('none');
      this.started_title.classList.remove('none');
      this.convertNumbersToInput();
      this.check_btn.classList.remove('none');
    } else {
      setTimeout(() => {
        this.remember_timer.innerText = `(${this.remember_time})`;
        this.remember_time -= 1;
        this.rememberTimeout();
      }, 1000);
    }
  }

  startGame() {
    this.game_intro.classList.add('none');
    this.game_board.classList.remove('none');
    this.game_finished.classList.add('none');
    this.remember_title.classList.remove('none');
    this.started_title.classList.add('none');
    this.createRandomNumbers();
    this.rememberTimeout();
  }
}

var game = new Puzzle();
