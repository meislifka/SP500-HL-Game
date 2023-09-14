fetch("./stocks.json")
  .then(response => {
    return response.json();
  })
  .then(data => {

    beginGame(data)


  });

function getTicker(data) {
  //array of object keys
  const keys = Object.keys(data)
  //console.log(keys)
  //random index 
  const randIndex = Math.floor(Math.random() * keys.length)
  //console.log(randIndex)
  // Select a key from the array of keys using the random index
  const randTicker = keys[randIndex]
  return (randTicker)
}


function beginGame(data) {

  var compTicker = getTicker(data);
  var guessTicker = getTicker(data);

  var compName = data[compTicker].name;
  var compTick = compTicker;
  var compPrice = data[compTicker].price;

  var guessName = data[guessTicker].name;
  var guessTick = guessTicker;
  var guessPrice = data[guessTicker].price;




  /*
    console.log(compTicker);
    console.log(data[compTicker].name);
    console.log(data[compTicker].price);
  
    console.log(guessTicker)
    console.log(data[guessTicker].name)
    console.log(data[guessTicker].price)
  */

  document.getElementById("compStock-name").innerText = compName;
  document.getElementById("compStock-ticker").innerText = compTick;
  document.getElementById("compStock-price").innerText = `$ ${compPrice}`;

  document.getElementById("guessStock-name").innerText = guessName;
  document.getElementById("guessStock-ticker").innerText = guessTick;
  console.log(guessPrice);

  document.getElementById('js-higher-button')
    .addEventListener('click', () => {
      if (guessPrice > compPrice) {
        console.log("correct")

        document.getElementById("result").innerText = `Correct: price: $${guessPrice}`;
        setTimeout(() => {
          console.log("wait 2 seconds");
          nextGame(guessName, guessTick, guessPrice);
        }, 2000);
      } else {
        console.log("wrong")

        document.getElementById("result").innerText = `Incorrect: price: $${guessPrice}`;
        setTimeout(() => {
          console.log("wait 2 seconds");
          endGame();
        }, 2000);
      }

    });

  document.getElementById('js-lower-button')
    .addEventListener('click', () => {
      if (guessPrice < compPrice) {
        console.log("correct");

        document.getElementById("result").innerText = `Correct: price: $${guessPrice}`;
        setTimeout(() => {
          console.log("wait 2 seconds");
          nextGame(guessName, guessTick, guessPrice);
        }, 2000);
      }
      else {
        console.log("wrong");

        document.getElementById("result").innerText = `Incorrect: price: $${guessPrice}`;
        setTimeout(() => {
          console.log("wait 2 seconds");
          endGame();
        }, 2000);
      }

    });
}

function nextGame(prevGuessName, prevGuessTick, PrevGuessPrice) {
  document.getElementById("compStock-name").innerText = prevGuessName;
  document.getElementById("compStock-ticker").innerText = prevGuessTick;
  document.getElementById("compStock-price").innerText = `$ ${PrevGuessPrice}`;
  var guessTicker = getTicker(data);



}




function endGame() {
  alert("you lose");

}