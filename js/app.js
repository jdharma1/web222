//#149674186
//WEB222 NHH
//Jacob Wiradharma

// An instance of our SimpleMap, created below when the window loads.
let map;

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();

  for (let i = 0; i < observations.length; i++) {
    let observation = observations[i];
    map.addObservation(observation);
  }

  // TODO: call the Simple Map's addObservation method for every one
  // of the observations in order to add markers to the map.
}

// Update the table to show markers for the set of observations
function updateCards(observations) {
  // Remove any current data from the table
  clearAllCards();

  // Populate the table with all observation data we want to show

  for (let i = 0; i < observations.length; i++) {
    let observation = observations[i];
    const rowToAdd = buildCardForObservation(observation);
    addCardToDiv(rowToAdd);
    

    // TODO: call the buildRowForObservation function with the current observation
    // and use that to add it to the table with the addRowToTable function.
  }
}

// Show all species on the map and table
function showAll() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();

  // Update the map and table
  updateMap(observations, map);
  updateCards(observations);
  updateTitle(`All Species (${observations.length})`);
}

// Show native species on the map and table
function showOnlyNative() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  // Filter out any that aren't native species
  const native = filterOnlyNative(observations);

  // Update the map and table
  updateMap(native, map);
  updateCards(native);
  updateTitle(`Only Native Species (${native.length})`);
}

// Show introduced species on the map and table
function showOnlyIntroduced() {
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  // Filter out any that aren't introduced species
  const introduced = filterOnlyIntroduced(observations);

  // Update the map and table
  updateMap(introduced, map);
  updateCards(introduced);
  updateTitle(`Only Introduced Species (${introduced.length})`);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  // TODO: create click handlers for all three buttons.
  // The "All Species" button should call the showAll function.
  document.getElementById("show-all").onclick = () => {
    showAll();
  };

  // The "Only Native Species" button should call the showOnlyNative function.
  document.getElementById("show-native").onclick = () => {
    showOnlyNative();
  };

  // The "Only Introduced Species" button should call the showOnlyIntroduced function.
  document.getElementById("show-introduced").onclick = () => {
    showOnlyIntroduced();
  };

  // In your solution, show both ways of creating click event handlers (i.e.,
  // using the on* property and also addEventListener function).

  // Show all species observations by default when we start.
  showAll();
}

// TODO: replace this console.log with the code necessary to call the start
// function when the page has finished fully loading.
// console.log(`OK, let's begin!`);
window.start = start;
