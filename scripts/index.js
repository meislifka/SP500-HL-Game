var wins = 0;

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
    // console.log("TEST:" + test[8]);
    // console.log("TEST:" + test[9]);


    const lowerButton = document.getElementById("js-lower-button");
    const higherButton = document.getElementById("js-higher-button");
    const newGameButton = document.getElementById("js-new-game-button");
    document.getElementById('button-lower-text').innerHTML;
    document.getElementById('button-higher-text').innerHTML;



    var oldGuess = [];
    lowerButton.addEventListener("click", () => {

      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 0);
      // console.log("BUTTON PRESSED");
      if (oldGuess === -1) {
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";
        document.getElementById('button-higher-text').innerHTML = "";
        document.getElementById('button-lower-text').innerHTML = "";
        document.getElementById('guessStock-price').innerHTML = `$${guessPrice}`;
      }
      //console.log(oldGuess);
      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];
      // console.log("guessLogo in lowerButton: " + oldGuess[4]);
      document.getElementById("wins").innerText = `Wins: ${wins}`;
    })

    higherButton.addEventListener("click", () => {

      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, 1);
      //console.log("BUTTON PRESSED");
      //console.log(oldGuess);

      if (oldGuess === -1) {
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";
        document.getElementById('button-higher-text').innerHTML = "";
        document.getElementById('button-lower-text').innerHTML = "";
        document.getElementById('guessStock-price').innerHTML = "";
      }

      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      guessTrend = oldGuess[3];
      guessLogo = oldGuess[4];
      document.getElementById("wins").innerText = `Wins: ${wins}`;
    })

    newGameButton.addEventListener("click", () => {
      document.getElementById('button-higher-text').innerHTML = "Higher";
      document.getElementById('button-lower-text').innerHTML = "Lower";
      document.getElementById('guessStock-price').innerHTML = "";

      newGameButton.style.display = "none";
      higherButton.style.display = "inline";
      lowerButton.style.display = "inline";

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
      // console.log("next button: " + guessLogo);
      wins = 0;
      document.getElementById("wins").innerText = `Wins: ${wins}`;
    }
    )
  });

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
  //console.log("set elements guess: " + guessLogo);
  // console.log("set elements comp: " + compLogo);

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
  //console.log("compLogo in set elements: " + compLogo);
  document.getElementById("compStock-image").src = compLogo;
  document.getElementById("guessStock-name").innerText = guessName + `(${guessTick})`;

  document.getElementById("guessStock-trend").innerText = guessTrend;
  document.getElementById("guessStock-image").src = guessLogo;


}

function beginGame(data) {
  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);
  // console.log(compTicker);

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
  console.log("GUESS: " + guessName + " " + guessPrice);
  // console.log("Comp: " + compName + " " + compPrice);

  //console.log("begin game: " + guessLogo);
  //console.log("begin game: " + compLogo);


  setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  return [compName, compTick, compPrice, guessName, guessTick, guessPrice, compTrend, guessTrend, compLogo, guessLogo];

}

function getData(data, guessPrice, compPrice, guessName, guessTick, guessPrice, guessTrend, guessLogo, higher) {
  //console.log("GUESS: " + guessName + " " + guessPrice);
  //console.log("Comp: " + compName + " " + compPrice);
  //console.log("compLogo in getData: " + compLogo);
  //console.log("higher (1): " + higher);

  //console.log("GUESS PRICE:" + guessPrice);
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
  // console.log("next Game: " + compLogo);
  //console.log(guessName + guessPrice);


  setElements(compName, compTick, compPrice, guessName, guessTick, compTrend, guessTrend, compLogo, guessLogo);
  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
  return ([guessName, guessTick, guessPrice, guessTrend, guessLogo]);
}