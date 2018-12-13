//This file/library houses all classes necessary to perform text analytics along with classes for displaying content to the UI

//The text analytics class containing all needed methods
class TextAnalytics {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  async detectLanguage(body) {
    const response = await fetch(
      `https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/languages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Ocp-Apim-Subscription-Key": `${this.apiKey}`
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();
    return data;
  }
  async sentimentAnalysis(body) {
    const response = await fetch(
      `https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Ocp-Apim-Subscription-Key": `${this.apiKey}`
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();
    return data;
  }
  async keyWords(body) {
    const response = await fetch(
      `https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Ocp-Apim-Subscription-Key": `${this.apiKey}`
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();
    return data;
  }
}

