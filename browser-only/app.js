//This handles actual functionality of the webpage, includes event listeners and code to utilise the included library -textAnalyticsLib.js


//Get references of the various ui elemets from the DOM




//Attach event listeners to them

const message = {
  documents: [
    {
      id: "1",
      text: "Hello world"
    },
    {
      id: "2",
      text: "Bonjour tout le monde"
    },
    {
      id: "3",
      text: "La carretera estaba atascada. Había mucho tráfico el día de ayer."
    },   
    {
      id: "4",
      text: "Hebu tuone kama anaweza ongea hii lugha yetu"
    }
  ]
};


const app = new TextAnalytics("3437fd062d7d4de7a729ce2eadfe80d0");

const myData = app.detectLanguage(message);

myData.then(data => console.log(data));
