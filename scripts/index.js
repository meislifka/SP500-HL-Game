fetch("./stocks.json")
  .then(response => {
    return response.json();
  })

  .then(data => {
    beginGame(data);
  });



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



function nextGame(data, prevGuessName, prevGuessTick, prevGuessPrice) {
  console.log("prev guess name: " + prevGuessName);
  compName = prevGuessName;
  console.log("compName now: " + compName);
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
  console.log("C:" + Number(compPrice) + "vs  G:" + Number(guessPrice));
  document.getElementById('js-lower-button').onclick = () => {
    if (Number(guessPrice) > Number(compPrice)) {
      console.log("correct");
      //console.log("GUESS NAME is higher:" + guessName + "price: " + guessPrice);
      setTimeout(() => { nextGame(data, guessName, guessTick, guessPrice); }, 2000);
    }
    else {
      console.log("wrong in higher button");
    }
  };

  document.getElementById('js-lower-button').onclick = () => {
    if (Number(guessPrice) < Number(compPrice)) {
      console.log("correct");
      console.log("GUESS NAME is lower:" + guessName + "price: " + guessPrice);
      setTimeout(() => { nextGame(data, guessName, guessTick, guessPrice); }, 2000);
    }
    else {
      console.log("wrong in lower button");
    }
  };
}



function setElements(compName, compTick, compPrice, guessName, guessTick, guessPrice) {
  document.getElementById("compStock-name").innerText = compName;
  document.getElementById("compStock-ticker").innerText = compTick;
  document.getElementById("compStock-price").innerText = `$ ${compPrice}`;

  document.getElementById("guessStock-name").innerText = guessName;
  document.getElementById("guessStock-ticker").innerText = guessTick;
  document.getElementById("guessStock-price").innerText = `$ ${guessPrice}`;
}



function beginGame(data) {
  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);

  //make sure the tickers arent the same
  while (compTicker === guessTicker) { //made it here instead of returning array of 2 values from getTicker() because getTicker is used for only one value from here on
    console.log("here");
    guessTicker = getTicker(data);
  }

  var compName = data[compTicker].name;
  var compTick = compTicker;
  var compPrice = data[compTicker].price;

  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;

  setElements(compName, compTick, compPrice, guessName, guessTick, guessPrice);

  /*

    console.log(compTicker);

    console.log(data[compTicker].name);

    console.log(data[compTicker].price);

 

    console.log(guessTicker)

    console.log(data[guessTicker].name)

    console.log(data[guessTicker].price)

  */

  guessPrice = guessPrice.replace(/,/g, '');
  compPrice = compPrice.replace(/,/g, '');
  console.log("C:" + Number(compPrice) + "vs  G:" + Number(guessPrice));
  document.getElementById('js-higher-button')
    .addEventListener('click', () => {

      if (Number(guessPrice) > Number(compPrice)) {
        console.log("correct");
        // console.log("GUESS NAME is higher:" + guessName + "price: " + guessPrice);
        setTimeout(() => { nextGame(data, guessName, guessTick, guessPrice); }, 2000);
      }

      else {
        console.log("wrong in higher button");
      }
    });

  document.getElementById('js-lower-button')
    .addEventListener('click', () => {
      if (Number(guessPrice) < Number(compPrice)) {
        console.log("correct");
        cOnsole.log("GUESS NAME is lower:" + guessName + "price: " + guessPrice);
        setTimeout(() => { nextGame(data, guessName, guessTick, guessPrice); }, 2000);
      }
      else {
        console.log("wrong in lower button");
      }
    });
}

