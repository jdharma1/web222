//#149674186
//WEB222 NHH
//Jacob Wiradharma

// Add the text to the <span>...<span> element in the element with id=table-title
function updateTitle(title) {
  document.getElementById("data-title").textContent = title;
}

// Add the given <tr>...</tr> element to the table body element with id=rows
function addCardToDiv(row) {
  var referenceTable = document.getElementById("observation-cards");
  referenceTable.appendChild(row);
}

// Remove all content from the table body element with id=rows
function clearAllCards() {
  var cardDiv = document.getElementById("observation-cards");
  while (cardDiv.hasChildNodes()) {
    cardDiv.removeChild(cardDiv.firstChild);
  }
}

// Creates and returns new table row <tr> element with the specified id value.
function createCard(id) {
  const card = document.createElement("div");
  card.setAttribute("id", id);
  card.setAttribute("class", "card");

  return card;
}

function createCardBody() {
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  return cardBody;
}


//SET ATTRIBUTE
// Given a URL src string and alt text string, create an <img> element and return:
// <img src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680" alt="Muskrat">
function createCardImg(src, alt) {
  let img = document.createElement("div");
  img.setAttribute("class", "card-img");
  img.style.backgroundImage = "url('" + src + "')";
  img.setAttribute("alt", alt);
  return img;
}

// Given a string of text, create and return a TextNode
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
function createText(text) {
  var newtext = document.createTextNode(text);
  return newtext;

}

// create and return an anchor element.
// <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>.  NOTE:
function createAnchor(href, innerContent, bodyToAppend) {
  let anchorDemo = document.createElement("A");
  anchorDemo.setAttribute("href", href);
  anchorDemo.appendChild(innerContent);
  let headerThree = document.createElement("H3");
  headerThree.appendChild(anchorDemo);
  bodyToAppend.appendChild(headerThree);

}

// Return a proper time element with its dateTime property set:
// <time datetime="2020-09-18">2020-09-18</time>
function createCardTime(href, formatted, bodyToAppend) {
  let newTime = document.createElement("TIME");
  newTime.setAttribute("datetime", formatted);
  newTime.innerHTML = newTime.dateTime;

  let anchorDemo = document.createElement("A");
  anchorDemo.setAttribute("href", href);
  anchorDemo.innerHTML = newTime.dateTime;
  let headerFour = document.createElement("H4");

  headerFour.appendChild(anchorDemo);
  bodyToAppend.appendChild(headerFour);

}


// Converts an Observation object into DOM nodes that produce the following HTML:
//
//  <tr id="67868131">
//    <td>
//      <a href="https://www.inaturalist.org/observations/67868131">
//        <img
//          src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680"
//          alt="Muskrat">
//      </a>
//    </td>
//    <td>
//      <time datetime="2020-09-18">2020-09-18</time>
//    </td>
//    <td>
//      <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>
//    </td>
//    <td>No</td>
//    <td>Yes</td>
//    <td>No</td>
//    <td>No</td>
//  </tr>
//
// Things to note in your solution:
//
// - Give the table row an id, using the observation's id
// - Create an anchor so you can click the photo and go to the observation's uri
// - Use the observation's name as the alt text of the image, and photoUrl as its src
// - Use a proper <time> element, and format the observation's date using a locale aware format, see
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// - Use the observation's wikipediaUrl to provide a link when you click the name
// - Convert all the boolean values for endangered, native, threatened, introduced to "Yes" or "No" strings
function buildCardForObservation(observation) {
  const cardBase = createCard(observation.id);

  const cardPhoto = createCardImg(observation.photoUrl, observation.name);
  cardBase.appendChild(cardPhoto);

  const cardBody = createCardBody();
  cardBase.appendChild(cardBody);
  createAnchor(observation.wikipediaUrl,  createText(observation.name) ,cardBody);
  
  // 4. Create the date and put in the second cell
  createCardTime(observation.uri, observation.date.toLocaleDateString(),cardBody);

  // 5. Create the name with a link to its Wikipedia page in the third cell
  const iconDiv = document.createElement("div");
  iconDiv.setAttribute("class", "card-icons");

  ["isEndangered", "isNative", "isThreatened", "isIntroduced"].forEach(
    (characteristic) => {
      const isRelevant = observation[characteristic];
      if (isRelevant) 
      {
        let icon = document.createElement("i");
        switch(characteristic)
        {
          case "isEndangered":
            icon.setAttribute("class", "fas fa-skull-crossbones");
            icon.setAttribute("title", "Endangered");
          break;


          case "isNative":
            icon.setAttribute("class", "fas fa-leaf");
            icon.setAttribute("title", "Native");
          break;


          case "isThreatened":
            icon.setAttribute("class", "fas fa-radiation-alt");
            icon.setAttribute("title", "Threatened");
          break;

          case "isIntroduced":
            icon.setAttribute("class", "fas fa-frog");
            icon.setAttribute("title", "Introduced");
          break;

          default:
          break;
        }

        iconDiv.appendChild(icon);
      }
    }
  );
  cardBase.appendChild(iconDiv);
  return cardBase;
}
