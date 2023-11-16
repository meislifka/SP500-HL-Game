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
    const newGameButton = document.getElementById("js-new-game-button");
    const howToButton = document.getElementById("js-how-to-button");
    const closeButton = document.getElementById("js-close-button");
    const bannerImg = document.getElementById("banner-img");
    const guessSide = document.getElementById("guess-side");
    const compSide = document.getElementById("comp-side");
    var oldGuess = [];

    lowerButton.addEventListener("click", () => {
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 0);

      //Condition if guess was wrong
      if (oldGuess === -1) {
        newGameButton.classList.remove("hide");
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');
        setHighScore(wins);
        resultColor(guessSide, 'wrong');
      }
      else {
        resultColor(guessSide, 'correct');
        //slide(guessSide, compSide);
        if (window.innerWidth < 768) {
          slideSmallScreen(guessSide, compSide);
        } else {
          slideFullScreen(guessSide, compSide);
        }


        guessName = oldGuess[0];
        guessTick = oldGuess[1];
        guessPrice = oldGuess[2];
        guessTrend = oldGuess[3];
        guessLogo = oldGuess[4];



      }

      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;

    })

    higherButton.addEventListener("click", () => {
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 1);

      //Condition if guess was wrong
      if (oldGuess === -1) {
        newGameButton.classList.remove("hide");
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');

        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";
        setHighScore(wins);
        resultColor(guessSide, 'wrong');
      }
      else {
        resultColor(guessSide, 'correct');
        if (window.innerWidth <= 768) {
          slideSmallScreen(guessSide, compSide);
        } else {
          slideFullScreen(guessSide, compSide);
        }

        guessName = oldGuess[0];
        guessTick = oldGuess[1];
        guessPrice = oldGuess[2];
        guessTrend = oldGuess[3];
        guessLogo = oldGuess[4];

      }
      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;

    })

    howToButton.addEventListener("click", () => {
      document.getElementById('how-to-overlay').style.display = "block";
      document.getElementById('how-to-overlay-container').style.display = "block";
      bannerImg.style.animationPlayState = 'paused';

    })

    closeButton.addEventListener("click", () => {
      document.getElementById('how-to-overlay').style.display = "none";
      bannerImg.style.animationPlayState = 'running';
    })


  });

function setHighScore(score) {
  if (parseInt(score) > parseInt(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);

  } else {
    localStorage.setItem("highscore", localStorage.getItem("highscore"));
  }
}

function getTicker(data) {
  //array of object keys
  const keys = Object.keys(data);

  //random index
  const randIndex = Math.floor(Math.random() * keys.length);

  // Select a key from the array of keys using the random index
  const randTicker = keys[randIndex];
  return (randTicker);
}

function setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo) {
  console.log("hi")
  if (compTrend.includes("-")) {
    document.getElementById("compStock-trend").style.color = "rgb(210, 74, 74)";
  } else {
    document.getElementById("compStock-trend").style.color = "rgb(76, 210, 74)";
  }
  if (guessTrend.includes("-")) {
    document.getElementById("guessStock-trend").style.color = "rgb(210, 74, 74)";
  } else {
    document.getElementById("guessStock-trend").style.color = "rgb(76, 210, 74)";
  }

  document.getElementById("compStock-name").innerText = compName + `(${compTick})`;
  document.getElementById("compStock-price").innerText = `$ ${compPrice}`;
  document.getElementById("compStock-trend").innerHTML = compTrend;

  document.getElementById("compStock-image").src = compLogo;
  document.getElementById("guessStock-name").innerText = guessName + `(${guessTick})`;

  document.getElementById("guessStock-trend").innerText = guessTrend;
  document.getElementById("guessStock-image").src = guessLogo;
}

function beginGame(data) {
  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);

  while (compTicker === guessTicker) { //made it here instead of returning array of 2 values from getTicker() because getTicker is used for only one value from here on
    guessTicker = getTicker(data);
  }

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

function getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, higher) {
  if (guessPrice.includes(',')) {
    guessPrice = guessPrice.replace(/,/g, '');
  }
  if (compPrice.includes(',')) {
    compPrice = compPrice.replace(/,/g, '');
  }

  if (higher) {
    if (Number(guessPrice) > Number(compPrice)) {
      wins++;
      return (nextGame(data, guessName, guessTick, guessPrice, guessTrend, guessLogo));
    }
    else {
      return (-1);
    }
  }
  else {
    if (Number(guessPrice) < Number(compPrice)) {
      wins++;
      return (nextGame(data, guessName, guessTick, guessPrice, guessTrend, guessLogo));
    }
    else {
      return (-1);
    }
  }
};

function nextGame(data, prevGuessName, prevGuessTick, prevGuessPrice, prevGuessTrend, prevGuessLogo) {
  compName = prevGuessName;
  compTick = prevGuessTick;
  compPrice = prevGuessPrice;
  compTrend = prevGuessTrend;
  compLogo = prevGuessLogo;
  var guessTicker = getTicker(data);
  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;
  var guessTrend = data[guessTicker].trend;
  var guessLogo = data[guessTicker].logoUrl;
  setTimeout(function () {
    setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  }, 2000)

  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
  return ([guessName, guessTick, guessPrice, guessTrend, guessLogo]);
}

function resultColor(side, result) {
  //document.getElementById("guessStock-image").src = guessLogo;

  setTimeout(function () {
    side.classList.add(result);
  }, 0)

  setTimeout(function () {
    side.classList.remove(result);
  }, 500);

}


function slideFullScreen(guessSide, compSide) {
  guessSide.style.animation = 'slide-left 2s ease-in-out';
  compSide.style.animation = 'slide-down 2s ease-in-out';

  //wait 2 seconds (for animation to finish) then remove animation
  setTimeout(function () {
    guessSide.style.animation = '';
    compSide.style.animation = '';
  }, 2000)

  //wait 1ms (for animation to remnove) then run slide-in
  setTimeout(function () {
    guessSide.style.animation = 'slide-in 2s ease-in-out';
  }, 2001)

  //wait 2s (for animation to finish) then remove
  setTimeout(function () {
    guessSide.style.animation = '';
  }, 4001)
}


function slideSmallScreen(guessSide, compSide) {
  guessSide.style.animation = 'slide-up 2s ease-in-out';
  compSide.style.animation = 'slide-up 2s ease-in-out';

  //wait 2 seconds (for animation to finish) then remove animation
  setTimeout(function () {
    guessSide.style.animation = '';
    compSide.style.animation = '';
  }, 2000)

  //wait 1ms (for animation to remnove) then run slide-in
  setTimeout(function () {
    guessSide.style.animation = 'slide-up-in 2s ease-in-out';
  }, 2001)

  //wait 2s (for animation to finish) then remove
  setTimeout(function () {
    guessSide.style.animation = '';
  }, 4001)
}