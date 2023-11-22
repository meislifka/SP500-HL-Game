var wins = 0;
var highscore = localStorage.getItem("highscore"); // Retrieve the highscore from local storage

if (highscore === null) {
  // If the highscore is not in local storage, set it to 0
  highscore = 0;
  localStorage.setItem("highscore", highscore);
}

console.log(localStorage);

fetch("./stocks.json")
  .then(response => {
    return response.json();
  })

  .then(data => {
    document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;


    //Getting and setting startings values
    var test = beginGame(data);

    compName = test[0];
    compTick = test[1];
    compPrice = test[2];
    guessName = test[3];
    guessTick = test[4];
    guessPrice = test[5];
    compTrend = test[6];
    guessTrend = test[7];
    compLogo = test[8];
    guessLogo = test[9];

    //Declaring constants
    const lowerButton = document.getElementById("js-lower-button");
    const higherButton = document.getElementById("js-higher-button");
    const howToButton = document.getElementById("js-how-to-button");
    const closeButton = document.getElementById("js-close-button");
    const bannerImg = document.getElementById("banner-img");
    const guessSide = document.getElementById("guess-side");
    const compSide = document.getElementById("comp-side");
    var oldGuess = [];

    //Actions for when lower button is pressed
    lowerButton.addEventListener("click", () => {
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 0);

      //Condition if guess was wrong
      if (oldGuess === -1) {

        //show guess price
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";

        //Remove higher and lower buttons
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');

        //Set high score
        setHighScore(wins);

        //Call game over function
        setTimeout(function () {
          gameOver(guessSide);
        }, 0)

      }

      //If guess is right
      else {

        //Change slide based on window size
        if (window.innerWidth < 768) {
          slideSmallScreen(guessSide, compSide, lowerButton, higherButton);
        } else {
          slideFullScreen(guessSide, compSide, lowerButton, higherButton);
        }

        //Change previous guess slide to comp side
        guessName = oldGuess[0];
        guessTick = oldGuess[1];
        guessPrice = oldGuess[2];
        guessTrend = oldGuess[3];
        guessLogo = oldGuess[4];
      }

      //Update score
      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;

    })

    //Actions for higher button
    higherButton.addEventListener("click", () => {
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 1);

      //Condition if guess was wrong
      if (oldGuess === -1) {
        //Remove higher and lower buttons
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');

        //show guess price
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";

        //Set high score
        setHighScore(wins);

        //Call game over function
        setTimeout(function () {
          gameOver(guessSide);
        }, 0)
      }
      //If guess is right
      else {
        //Change slide based on window size
        if (window.innerWidth <= 768) {
          slideSmallScreen(guessSide, compSide, lowerButton, higherButton);
        } else {
          slideFullScreen(guessSide, compSide, lowerButton, higherButton);
        }
        //Change previous guess slide to comp side
        guessName = oldGuess[0];
        guessTick = oldGuess[1];
        guessPrice = oldGuess[2];
        guessTrend = oldGuess[3];
        guessLogo = oldGuess[4];

      }
      //Update score
      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;
    })


    //Action for how to button
    howToButton.addEventListener("click", () => {

      //Add text and pause banner
      document.getElementById('how-to-overlay').style.display = "block";
      document.getElementById('how-to-overlay-container').style.display = "block";
      bannerImg.style.animationPlayState = 'paused';

    })

    //Action for close button
    closeButton.addEventListener("click", () => {
      //Remove text and resume banner
      document.getElementById('how-to-overlay').style.display = "none";
      bannerImg.style.animationPlayState = 'running';
    })


  });


function setHighScore(score) {

  //if current score is higher than high score, update high score to current score
  if (parseInt(score) > parseInt(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);

  } else {
    localStorage.setItem("highscore", localStorage.getItem("highscore"));
  }
}


//Function to get the ticker by selecting a random key
function getTicker(data) {
  const keys = Object.keys(data);
  const randIndex = Math.floor(Math.random() * keys.length);
  const randTicker = keys[randIndex];
  return (randTicker);
}

//Function to set elements 
function setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo) {
  if (compTrend.includes("-")) {
    document.getElementById("compStock-trend").style.color = "rgb(210, 74, 74)";
  } else {
    document.getElementById("compStock-trend").style.color = "rgb(76, 210, 74)";
  }
  if (guessTrend.includes("-")) {
    document.getElementById("guessStock-trend").style.color = "rgb(210, 74, 74)";
  } else {
    document.getElementById("guessStock-trend").style.color = "rgb(0, 123, 0)";
  }

  document.getElementById("compStock-name").innerText = compName + `(${compTick})`;
  document.getElementById("compStock-price").innerText = `$ ${compPrice}`;
  document.getElementById("compStock-trend").innerHTML = compTrend;

  document.getElementById("compStock-image").src = compLogo;
  document.getElementById("guessStock-name").innerText = guessName + `(${guessTick})`;

  document.getElementById("guessStock-trend").innerText = guessTrend;
  document.getElementById("guessStock-image").src = guessLogo;
}


//Function to begin the game
function beginGame(data) {
  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);


  //Made it here instead of returning array of 2 values from getTicker() because getTicker is used for only one value from here on
  while (compTicker === guessTicker) {
    guessTicker = getTicker(data);
  }

  //Setting variables
  var compName = data[compTicker].name;
  var compTick = compTicker;
  var compPrice = data[compTicker].price;
  var compTrend = data[compTicker].trend;
  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;
  var guessTrend = data[guessTicker].trend;
  var compLogo = data[compTicker].logoUrl;
  var guessLogo = data[guessTicker].logoUrl;

  setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  return [compName, compTick, compPrice, guessName, guessTick, guessPrice, compTrend, guessTrend, compLogo, guessLogo];
}


//Function to get data 
function getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, higher) {
  //Removes comma if it exists in the price of either
  if (guessPrice.includes(',')) {
    guessPrice = guessPrice.replace(/,/g, '');
  }
  if (compPrice.includes(',')) {
    compPrice = compPrice.replace(/,/g, '');
  }

  //If guess is right for higher
  if (higher) {
    if (Number(guessPrice) > Number(compPrice)) {
      wins++;
      return (nextGame(data, guessName, guessTick, guessPrice, guessTrend, guessLogo));
    }
    //If guess is wrong for higher
    else {
      return (-1);
    }
  }
  //If guess is right for lower
  else {
    if (Number(guessPrice) < Number(compPrice)) {
      wins++;
      return (nextGame(data, guessName, guessTick, guessPrice, guessTrend, guessLogo));
    }
    //If guess is wrong for higher
    else {
      return (-1);
    }
  }
};

//Resets the game 
function nextGame(data, prevGuessName, prevGuessTick, prevGuessPrice, prevGuessTrend, prevGuessLogo) {
  compName = prevGuessName;
  compTick = prevGuessTick;
  compPrice = prevGuessPrice;
  compTrend = prevGuessTrend;
  compLogo = prevGuessLogo;

  //Get new data for guess
  var guessTicker = getTicker(data);
  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;
  var guessTrend = data[guessTicker].trend;
  var guessLogo = data[guessTicker].logoUrl;

  //Set the elementss
  setTimeout(function () {
    setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  }, 2000)

  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
  return ([guessName, guessTick, guessPrice, guessTrend, guessLogo]);
}


function slideFullScreen(guessSide, compSide, lowerButton, higherButton) {
  guessSide.style.animation = ('green-flash 1s ease-in-out');

  guessSide.classList.add('correct');
  guessSide.style.animation = 'slide-left 2s ease-in-out';
  compSide.style.animation = 'slide-down 2s ease-in-out';
  lowerButton.classList.add('hide');
  higherButton.classList.add('hide');
  //wait 2 seconds (for animation to finish) then remove animation
  setTimeout(function () {
    guessSide.style.animation = '';
    compSide.style.animation = '';
  }, 2000)

  //wait 1ms (for animation to remnove) then run slide-in
  setTimeout(function () {

    guessSide.style.animation = 'slide-in 2s ease-in-out';
    lowerButton.classList.remove('hide');
    higherButton.classList.remove('hide');
  }, 2000)

  //wait 2s (for animation to finish) then remove
  setTimeout(function () {
    guessSide.style.animation = '';
  }, 4001)
}

function slideSmallScreen(guessSide, compSide, lowerButton, higherButton) {
  guessSide.style.animation = 'slide-up 2s ease-in-out';
  compSide.style.animation = 'slide-up1  2s ease-in-out';
  lowerButton.classList.add('hide');
  higherButton.classList.add('hide');
  //wait 2 seconds (for animation to finish) then remove animation
  setTimeout(function () {
    guessSide.style.animation = '';
    compSide.style.animation = '';
  }, 2000)

  //wait 1ms (for animation to remove) then run slide-in
  setTimeout(function () {
    guessSide.style.animation = 'slide-up-in 2s ease-in-out';
    lowerButton.classList.remove('hide');
    higherButton.classList.remove('hide');
  }, 2001)

  //wait 2s (for animation to finish) then remove
  setTimeout(function () {
    guessSide.style.animation = '';
  }, 4001)

}

function gameOver(side) {
  side.style.backgroundColor = 'red';
  const gameArea = document.getElementById('gameArea');
  gameArea.classList.remove("flipIn");
  gameArea.classList.add("flipIn");
  gameArea.innerHTML = '<p>Game Over</p></button>';

  // Set up the countdown timer
  let count = 3;
  const countdownElement = document.createElement('p');
  setTimeout(gameArea.appendChild(countdownElement), 1000);
  function updateCountdown() {
    countdownElement.innerText = `New game in ${count} seconds`;
    count--;

    if (count >= 0) {
      setTimeout(updateCountdown, 1000);
    }
  }
  //Call function to count down
  updateCountdown();

  gameArea.classList.remove("flipOut");
  gameArea.classList.add("flipOut");
  setTimeout(function () {
    location.reload();
  }, 4000)
}
