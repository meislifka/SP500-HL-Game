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

    var oldGuess = [];
    lowerButton.addEventListener("click", () => {

      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 0);
      if (oldGuess === -1) {
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";

        //document.getElementById('gStock-name').innerHTML = `${guessName}`;
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        setHighScore(wins)
        document.getElementById('end-game-overlay').style.display = "block"

      }
      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];
      document.getElementById("score").innerHTML = `Score: ${wins} <br> High Score: ${localStorage.getItem("highscore")} `;
      if (parseInt(wins) > parseInt(localStorage.getItem("highscore"))) {
        document.getElementById("newHS").style.color = "gold";
      }

    })

    higherButton.addEventListener("click", () => {

      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 1);
      if (oldGuess === -1) {
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";
        // document.getElementById('gStock-name').innerHTML = `${guessName}`;
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
        document.getElementById('end-game-overlay').style.display = "block"
        setHighScore(wins)
      }

      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];
      document.getElementById("score").innerHTML = `Score: ${wins} <br> High Score: ${localStorage.getItem("highscore")} `;
      if (parseInt(wins) > parseInt(localStorage.getItem("highscore"))) {
        document.getElementById("newHS").style.color = "gold";
      }
    })

    newGameButton.addEventListener("click", () => {
      document.getElementById('guessStock-price').innerHTML = "";
      //document.getElementById("newHS").style.color = "rgb(108, 3, 3)";


      newGameButton.style.display = "none";
      higherButton.style.display = "inline";
      lowerButton.style.display = "inline";
      document.getElementById('end-game-overlay').style.display = "none"
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
      document.getElementById("score").innerHTML = `Score: ${wins} <br> High Score: ${localStorage.getItem("highscore")} `;
    }

    )
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
  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
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