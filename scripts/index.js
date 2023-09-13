fetch("./stocks.json")
  .then(response => {
    return response.json();
  })
  .then(data => {

    var compTicker = getTicker(data)
    var guessTicker = getTicker(data)

    console.log(compTicker)
    console.log(data[compTicker].name)
    console.log(data[compTicker].price)

    console.log(guessTicker)
    console.log(data[guessTicker].name)
    console.log(data[guessTicker].price)
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

