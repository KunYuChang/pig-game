'use strict';

/*
  STEP1 : 骰子骰出來
  - Math.trunc(Math.random() * 6) + 1
  - 顯示出骰子 -> classList.remove('hidden') & src 替換圖片

  STEP2 : 判斷是否能繼續骰
  - 判斷是否骰到1 -> 如果沒有把數值累計，如果有就換手
  

  STEP3 : 換手細節
  - 換手前要先清空累計的變數值
  - activePlayer變數切換, 0 -> 1 , 1 -> 0
  - player0El & player1El -> toggle 外觀

  STEP4 : HOLD
  - 累計值儲存到陣列中
  - DOM也更新成陣列中最新的值

  STEP5 : 贏了
  - DOM 給贏的外觀
  - 贏了就不能操作，所以用一個playing變數來判斷是否遊戲已結束
  - 按鈕要操作之前都要先看playing是不是true
*/

// 選擇元素
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// 初始設定
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 骰子函式
btnRoll.addEventListener('click', () => {
  if (playing === true) {
    // 1. 產生隨機的骰子
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 畫面上顯示骰子
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. 確認是否骰到1, 如果是, 換下一個玩家
    if (dice !== 1) {
      currentScore += dice;

      // 一種技巧性寫法
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] > 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
