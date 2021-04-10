//#149674186
//WEB222 NHH
//Jacob Wiradharma

// An iNaturalist observation Object contains a tremendous amount of data, much of
// it not useful in our current program. We need to transform these Observation
// objects into a new format that matches our needs.
//
// Here's a simplified version of the current structure of an observation Object
// (see src/data.js for a complete example of what it looks like). Many of the
// properties and values have been removed to highlight the ones we do
// care about:
//
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   geojson: {
//     coordinates: [ -79.3565522733, 43.798774894 ],
//     type: "Point"
//   },
//   created_at: "2021-01-10T09:51:48-10:00",
//   taxon: {
//     threatened: false,
//     introduced: false,
//     native: true,
//     name: "Ondatra zibethicus",
//     wikipedia_url: "http://en.wikipedia.org/wiki/Muskrat",
//     default_photo: {
//       square_url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//       attribution: "(c) Stephen Garvey, all rights reserved",
//       flags: [],
//       medium_url:
//         "https://static.inaturalist.org/photos/109319291/medium.jpg?1609877680",
//       id: 109319291,
//       license_code: null,
//       original_dimensions: { width: 2048, height: 1365 },
//       url:
//         "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     },
//     iconic_taxon_name: "Mammalia",
//     preferred_common_name: "Muskrat"
//   }
// },
//
// Here's the same data transformed into a simpler format we want to use:
//
// {
//   id: 67868131,
//   uri: "https://www.inaturalist.org/observations/67868131",
//   coords: [ -79.3565522733, 43.798774894 ],
//   date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//   name: "Muskrat",
//   photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//   wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//   isNative: true,
//   isIntroduced: false,
//   isEndangered: false,
//   isThreatened: false
// }

// Given a string, convert the first letter of each word in the
// string to a capital letter. For example, convert 'muskrat' to
// 'Muskrat', and 'bittersweet nightshade' to 'Bittersweet Nightshade'
function titleCase(s) {
  const eachWordInAString = s.split(" "); // (' ')is to denote a space delimiter.
  //we use split to cut it into an array. We're delimiting by spaces so we get word chunks.

  for (let i = 0; i < eachWordInAString.length; i++) {
    const word = eachWordInAString[i];
    //we make a string out of each array member that we're working with. It's a temp, so that we don't mess up the
    //original-ish data.

    eachWordInAString[i] =
      word.substring(0, 1).toUpperCase() + word.substring(1);
    //substring 0, 1 cuts out exactly the first letter, toUpperCase it to change case.
    //ADDING that same word but substring with no second arg, lets us go through the rest of the word.
    //assigning it to each word in a string, reforms the word.
  }

  return eachWordInAString.join(" "); //put all the strings together, delimited.
}

// Given an Array of iNaturalist observation objects, transform the objects into
// our desired format, and return the new Array. For example:
//​
// [
//   {
//     id: 67868131,
//     uri: "https://www.inaturalist.org/observations/67868131",
//     coords: [ -79.3565522733, 43.798774894 ],
//     date: Date Sun Jan 10 2021 14:51:48 GMT-0500 (Eastern Standard Time),
//     name: "Muskrat",
//     photoUrl: "https://static.inaturalist.org/photos/109319291/square.jpg?1609877680",
//     wikipediaUrl: "http://en.wikipedia.org/wiki/Muskrat",
//     isNative: true,
//     isIntroduced: false,
//     isEndangered: false,
//     isThreatened: false
//   },
//   ...
// ]
//
// Things to note in your solution:
//
// - id: use the same value unmodified
// - uri: use the same value unmodified
// - coords: extract the array of [lng, lat] values from the geojson property
// - date: convert the created_at string property to a real JavaScript Date
// - name: use either the taxon's preferred_common_name or name property, converted to Title Case
// - photoUrl: use the taxon's default_photo square_url value
// - wikipediaUrl: use the taxon's wikipedia_url value
// - isNative: convert the taxon native value to a boolean
// - isIntroduced: convert the taxon introduced value to a boolean
// - isEndangered: convert the taxon endangered value to a boolean
// - isThreatened: convert the taxon threatened value to a boolean
function transformObservations(observations) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  return observations.map(function dataReassignment(observation) {
    // TODO Go through the debugger we made to find the right handles on Obsservation.
    let informationPack = {};
    informationPack.id = observation.id; //
    informationPack.uri = observation.uri;
    informationPack.coords = observation.geojson.coordinates.concat([]); //This might need to be an int. Or not. We'll find out later.
    informationPack.date = new Date(observation.created_at);
    informationPack.name = observation.taxon.preferred_common_name
      ? titleCase(observation.taxon.preferred_common_name)
      : titleCase(observation.taxon.name);

    if (observation.taxon) {
      if (observation.taxon.default_photo) {
        if (observation.taxon.default_photo.medium_url) {
          informationPack.photoUrl = observation.taxon.default_photo.medium_url;
        }
      }
    }
    if (!informationPack.photoUrl) {
      // If it still doesn't exist after all that
      informationPack.photoUrl = null;
    }

    informationPack.wikipediaUrl = observation.taxon.wikipedia_url;
    informationPack.isNative = observation.taxon.native;
    informationPack.isIntroduced = observation.taxon.introduced;
    informationPack.isThreatened = observation.taxon.threatened;
    if (observation.taxon.endangered) {
      informationPack.isEndangered = observation.taxon.endangered;
    }
    return informationPack;
  });
}

/**
     
     * `observation` is one element in `observations`
     * Use `observation` to pull out data and return an object that is holds what you want
     * 
     * - Watch out when extracting lang, lat and that you're not using it straight up
     * or else you will affect the original data memory!
     * Map goes through the object and applies whatever you do to it. If you're making a new object
     * grab the data from the original and return the new object, ie whatever you call it.
     * Object does not need to be initialized within curly braces.
     * New object assignment is like...
     * informationPack.attribute = "XZY"
     * And you do this for each element.
     * Don't include elements you don't need or want.
     */

// Take the array of observations and filter out any observations that haven't
// been identified yet (i.e., are missing the `taxon` property) and/or don't have
// a photo (i.e., are missing the `taxon.default_photo` property).
function filterObservations(observations) {
  return observations.filter(
    (observation) => observation.taxon && observation.taxon.default_photo
  );
}

// Process all observation data in the window.data.results array (see data.js)
// to a simpler format we can work with, and filter the observations to get
// rid of any that are missing data that we need.
function getAllObservations() {
  const filtered = filterObservations(data.results);
  const transformed = transformObservations(filtered);

  // TIP: if you need to see an Object while debugging, you can log it.
  // TODO: Remove this code when you're done debugging.
  // console.log("getAllObservations()", transformed);

  return transformed;
}

// Given an array of observations, filter out any that aren't native species
// and return the filtered array.
function filterOnlyNative(observations) {
  return observations.filter((observation) => observation.isNative);
}

// TODO

// Given an array of observations, filter out any that aren't introduced species
// and return the filtered array.
function filterOnlyIntroduced(observations) {
  // TODO
  return observations.filter((observation) => observation.isIntroduced);
}
