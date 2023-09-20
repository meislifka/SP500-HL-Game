var wins = 0;

fetch("./stocks.json")
  .then(response => {
    return response.json();
  })

  .then(data => {
    var test = beginGame(data);
    //console.log(test);
    //console.log(typeof test);
    //console.log(test[0] + test[1] + test[3] + test[4]);
    compName = test[0];
    compTick = test[1];
    compPrice = test[2];
    //console.log(test);
    guessName = test[3];
    guessTick = test[4];
    guessPrice = test[5];

    const lowerButton = document.getElementById("js-lower-button");
    const higherButton = document.getElementById("js-higher-button");
    const newGameButton = document.getElementById("js-new-game-button");

    var oldGuess = [];

    lowerButton.addEventListener("click", () => {
      // console.log("BUTTON CLICKED (L)");
      // console.log("GUESS PRICE: " + guessPrice + "and COMP PRICE: " + compPrice);
      // console.log("head to getData function");
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, 0);
      //  console.log("newGuess: " + oldGuess);

      if (oldGuess === -1) {
        //  console.log("HERE");
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";
      }

      //  console.log(oldGuess[0]);
      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      document.getElementById("wins").innerText = `Wins: ${wins}`;
    })

    higherButton.addEventListener("click", () => {
      // console.log("BUTTON CLICKED (H)");
      // console.log("GUESS PRICE: " + guessPrice + "and COMP PRICE: " + compPrice);
      //  console.log("head to getData function");
      oldGuess = getData(data, guessPrice, compPrice, guessName, guessTick, 1);
      //  console.log("newGuess: " + oldGuess);

      if (oldGuess === -1) {
        newGameButton.style.display = "block";
        higherButton.style.display = "none";
        lowerButton.style.display = "none";
      }

      guessName = oldGuess[0];
      guessTick = oldGuess[1];
      guessPrice = oldGuess[2];
      //console.log(oldGuess[1]);
      //  console.log(oldGuess[2]); 

      document.getElementById("wins").innerText = `Wins: ${wins}`;
    })



    newGameButton.addEventListener("click", () => {
      newGameButton.style.display = "none";
      higherButton.style.display = "inline";
      lowerButton.style.display = "inline";
      var test = beginGame(data);
      //console.log(test);
      //console.log(typeof test);
      //console.log(test[0] + test[1] + test[3] + test[4]);
      compName = test[0];
      compTick = test[1];
      compPrice = test[2];
      //   console.log(test);
      guessName = test[3];
      guessTick = test[4];
      guessPrice = test[5];
      wins = 0;
      document.getElementById("wins").innerText = `Wins: ${wins}`;
    }
    )

  });



function endGame(lowerButton, higherButton) {
  lowerButton.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }

  higherButton.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }
}



function getTicker(data) {
  //array of object keys
  const keys = Object.keys(data);
  //console.log(keys)
  //random index
  const randIndex = Math.floor(Math.random() * keys.length);
  //console.log(randIndex)
  // Select a key from the array of keys using the random index
  const randTicker = keys[randIndex];
  return (randTicker);
}



function setElements(compName, compTick, compPrice, guessName, guessTick, guessPrice) {
  document.getElementById("compStock-name").innerText = compName;
  document.getElementById("compStock-ticker").innerText = compTick;
  document.getElementById("compStock-price").innerText = `$ ${compPrice}`;
  document.getElementById("guessStock-name").innerText = guessName;
  document.getElementById("guessStock-ticker").innerText = guessTick;
  // document.getElementById("guessStock-price").innerText = `$ ${guessPrice}`;
}



function beginGame(data) {
  // console.log("IN BEGIN GAME")
  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);
  //console.log("in begin Game function")
  //make sure the tickers arent the same
  while (compTicker === guessTicker) { //made it here instead of returning array of 2 values from getTicker() because getTicker is used for only one value from here on
    guessTicker = getTicker(data);
  }

  var compName = data[compTicker].name;
  var compTick = compTicker;
  var compPrice = data[compTicker].price;
  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;
  setElements(compName, compTick, compPrice, guessName, guessTick, guessPrice);

  return [compName, compTick, compPrice, guessName, guessTick, guessPrice];
}



function getData(data, guessPrice, compPrice, guessName, guessTick, higher) {
  //console.log("IN GETDATA")
  // console.log(" guessPrice:" + guessPrice + " compPrice:" + compPrice);

  if (higher) {
    if (Number(guessPrice) > Number(compPrice)) {
      wins++;
      // console.log("correct");
      // console.log("GUESS NAME is higher:" + guessName + "price: " + guessPrice);
      // console.log("-----loading in new game----");
      // setTimeout(() => { return (nextGame(data, guessName, guessTick, guessPrice)); }, 2000);
      return (nextGame(data, guessName, guessTick, guessPrice));
      //console.log("returning new guess");
      //  console.log("new guess in getData: " + newGuess)
      //  return ("hello");
    }
    else {
      //  console.log("in getData game higher");
      return (-1);
    }
  }
  else {
    if (Number(guessPrice) < Number(compPrice)) {
      wins++;
      // console.log("correct");
      // console.log("GUESS NAME is higher:" + guessName + "price: " + guessPrice);
      // console.log("-----loading in new game----");
      return (nextGame(data, guessName, guessTick, guessPrice));
      //setTimeout(() => { return (nextGame(data, guessName, guessTick, guessPrice)); }, 2000);
      //console.log("returning new guess");
      //  console.log("new guess in getData: " + newGuess)
      // return ("hello");
    }
    else {
      // console.log("in getData game lower");
      return (-1);
    }
  }
};

function nextGame(data, prevGuessName, prevGuessTick, prevGuessPrice) {
  // console.log("IN NEXT GAME")
  compName = prevGuessName;
  compTick = prevGuessTick;
  compPrice = prevGuessPrice;

  var guessTicker = getTicker(data);
  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;
  //console.log("comp Price: " + compPrice);
  //console.log("guess Price: " + guessPrice);

  setElements(compName, compTick, compPrice, guessName, guessTick, guessPrice);

  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');

  // console.log("C:" + Number(compPrice) + "vs  G:" + Number(guessPrice));
  //console.log("comp Price: " + compPrice);
  // console.log("guess Price: " + guessPrice);
  return ([guessName, guessTick, guessPrice]);


}