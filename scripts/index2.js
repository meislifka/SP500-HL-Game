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

    const lowerButton = document.getElementById("js-lower-button");
    const higherButton = document.getElementById("js-higher-button");
    const newGameButton = document.getElementById("js-new-game-button");
    const howToButton = document.getElementById("js-how-to-button");
    const closeButton = document.getElementById("js-close-button");
    const bannerImg = document.getElementById("banner-img");
    const guessSide = document.getElementById("guess-side");
    var oldGuess = [];
    lowerButton.addEventListener("click", () => {

      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 0);
      if (oldGuess === -1) {
        newGameButton.classList.remove("hide");
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');

        document.getElementById("game-over-text").innerHTML = setHighScore(wins);
        //document.getElementById('button-container').style.display = "none";
        // document.getElementById('game-over-overlay').classList.remove("hide");
        setTimeout(function () {
          guessSide.classList.add('wrong');
          console.log("wrong");
        }, 0)

        setTimeout(function () {
          document.body.classList.remove('wrong');
        }, 0);
      }
      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];

      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;
      setTimeout(function () {
        guessSide.classList.add('correct');
        console.log("correct");
      }, 0)

      setTimeout(function () {
        document.body.classList.remove('correct');
      }, 0);

    })

    higherButton.addEventListener("click", () => {
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 1);
      if (oldGuess === -1) {
        newGameButton.classList.remove("hide");
        lowerButton.classList.add('hide');
        higherButton.classList.add('hide');

        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('guessStock-price').style.border = "dotted";
        //document.getElementById('button-container').style.display = "none";
        document.getElementById('game-over-overlay').classList.remove("hide");

        //document.getElementById("game-over-text").innerHTML = setHighScore(wins);
        setTimeout(function () {
          guessSide.classList.add('wrong');
          console.log("wrong");
        }, 0)

        setTimeout(function () {
          document.body.classList.remove('wrong');

        }, 0);

      }

      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];
      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;
      setTimeout(function () {
        guessSide.classList.add('correct');
        console.log("correct");
      }, 0)

      setTimeout(function () {
        guessSide.classList.remove('correct');
      }, 0)
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

    newGameButton.addEventListener("click", () => {
      document.getElementById('guessStock-price').innerHTML = "";
      document.getElementById('guessStock-price').style.border = "none";
      lowerButton.classList.remove('hide');
      higherButton.classList.remove('hide');
      //guessSide.classList.remove('wrong');

      newGameButton.classList.add("hide");
      higherButton.classList.remove("hide");
      lowerButton.classList.remove("hide");
      //document.getElementById('button-container').style.display = "flex";
      document.getElementById('game-over-overlay').classList.add("hide");
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
      wins = 0;
      document.getElementById("score").innerHTML = `<span class = "left-span"> Score:${wins} </span> <span class = "right-span">High Score:${localStorage.getItem("highscore")}</span>`;
    }

    )
  });

function setHighScore(score) {
  if (parseInt(score) > parseInt(localStorage.getItem("highscore"))) {
    localStorage.setItem("highscore", score);
    return "Game Over <br> New High Score!";

  } else {
    localStorage.setItem("highscore", localStorage.getItem("highscore"));
    return "Game Over";
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

  setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
  return ([guessName, guessTick, guessPrice, guessTrend, guessLogo]);
}