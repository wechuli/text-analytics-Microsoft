//This handles actual functionality of the webpage, includes event listeners and code to utilise the included library -textAnalyticsLib.js

//Get references of the various ui elemets from the DOM
const input = document.getElementById("input");
const btn = document.querySelector("button");
const languageUi = document.querySelector(".language");
const sentimentUi = document.querySelector(".sentiment");
const keyPhrasesUi = document.querySelector("ul");

//Attach event listeners to them
btn.addEventListener("click", getAnalytics);
input.addEventListener("input", clearDisplay);

//Instantiate the getanalytics and UI class
const analytics = new TextAnalytics("3437fd062d7d4de7a729ce2eadfe80d0");

//worker function
function getAnalytics() {
  const message = {
    documents: [
      {
        id: "mytext",
        text: input.value
      }
    ]
  };
  const languageData = analytics.detectLanguage(message);
  const sentimentData = analytics.sentimentAnalysis(message);
  const keyPhrasesData = analytics.keyWords(message);

  keyPhrasesData
    .then(data => {
      keyPhrasesUi.innerHTML = "";
      const phrases = data.documents[0].keyPhrases;
      console.log(phrases.length);
      if (!phrases.length == 0) {
        let listheading = document.createElement("p");
        listheading.className = "boldy";
        listheading.textContent = "Key Words and Phrases: ";
        keyPhrasesUi.append(listheading);
      }

      phrases.forEach(phrase => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.className = "ml-5";
        listItem.textContent = phrase;
        keyPhrasesUi.append(listItem);
      });
    })
    .catch(err =>
      console.log("There was an error while fetching key phrases", err)
    );

  sentimentData
    .then(data => {
      const score = parseFloat(data.documents[0].score).toFixed(3);
      let sentiment = "";
      if (score > 0.5) {
        sentiment = "positive";
      } else if (score == 0.5) {
        sentiment = "neutral";
      } else {
        sentiment = "negative";
      }
      sentimentUi.innerHTML = `
        <p>
            <b>Sentiment: </b>${sentiment}
        </p>
    
    `;
    })
    .catch(err =>
      console.log("An error occured while fetching sentiment analysis", err)
    );

  languageData
    .then(data => {
      const language = data.documents[0].detectedLanguages[0].name;

      languageUi.innerHTML = `
        <p>
            <b>Language: </b>${language}
        </p>
    
    `;
    })
    .catch(err =>
      console.log("An error occured while fetching the language: ", err)
    );
}
function clearDisplay() {
  languageUi.innerHTML = "";
  sentimentUi.innerHTML = "";
  keyPhrasesUi.innerHTML = "";
}
