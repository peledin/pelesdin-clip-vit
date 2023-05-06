// Event-Listener für das Formular-Submit-Event
document.getElementById("comparison-form").addEventListener("submit", async (e) => {
  e.preventDefault();


  // Werte der Eingabefelder abrufen
  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;
  const imageUrl = document.getElementById("imageUrl").value;

  // API-Anfrage senden
  const response = await fetch(`/api/compare?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&imageUrl=${encodeURIComponent(imageUrl)}`);



  // Ergebnis anzeigen
  if (response.ok) {
      const probabilities = await response.json();
      displayResult([probabilities[0], probabilities[1]]);
  } else {
      displayResult("An error occurred.");
  }
});

function displayResult(probabilities) {
  const resultElement = document.getElementById("result");

  document.getElementById("text1-label").textContent = `${document.getElementById("text1").value}:`;
  document.getElementById("text1-progress").style.width = `${(probabilities[0] * 100).toFixed(2)}%`;
  document.getElementById("text1-percentage").textContent = `${(probabilities[0] * 100).toFixed(2)}%`;

  document.getElementById("text2-label").textContent = `${document.getElementById("text2").value}:`;
  document.getElementById("text2-progress").style.width = `${(probabilities[1] * 100).toFixed(2)}%`;
  document.getElementById("text2-percentage").textContent = `${(probabilities[1] * 100).toFixed(2)}%`;

  resultElement.classList.remove("d-none");
}


// Event-Listener für den Shuffle-Button
document.getElementById("shuffleButton").addEventListener("click", () => {
  const randomImage = getRandomImage();
  updateImagePreview(randomImage);
});

// Funktion zum Abrufen eines zufälligen Bildes aus dem cocoImages-Array
function getRandomImage() {
  const index = Math.floor(Math.random() * cocoImages.length);
  return cocoImages[index];
}

// Funktion zum Aktualisieren der Bildvorschau und des imageURL-Eingabefeldes
function updateImagePreview(url) {
  document.getElementById("imagePreview").src = url;
  document.getElementById("imageUrl").value = url;
}

// Event-Listener für das Ändern des imageURL-Eingabefeldes
document.getElementById("imageUrl").addEventListener("input", () => {
  const imageUrl = document.getElementById("imageUrl").value;
  document.getElementById("imagePreview").src = imageUrl;
});

    // Liste der verfügbaren Bilder aus dem COCO-Datensatz
    const cocoImages = [
      "http://images.cocodataset.org/val2017/000000039769.jpg",
      "http://images.cocodataset.org/val2017/000000252219.jpg",
      "http://images.cocodataset.org/val2017/000000000285.jpg",
      "http://images.cocodataset.org/val2017/000000000724.jpg",
      "http://images.cocodataset.org/val2017/000000002149.jpg",
      "http://images.cocodataset.org/val2017/000000002299.jpg",
      // Weitere URLs hier hinzufügen
  ];

  // Initialisiere die Bildvorschau und das imageURL-Eingabefeld mit einem zufälligen Bild
  const initialImage = getRandomImage();
  updateImagePreview(initialImage);

  function displayPlaceholderResult() {
    const resultElement = document.getElementById("result");
  
    document.getElementById("text1-label").textContent = `Text 1:`;
    document.getElementById("text1-progress").style.width = `0%`;
    document.getElementById("text1-percentage").textContent = `0%`;
  
    document.getElementById("text2-label").textContent = `Text 2:`;
    document.getElementById("text2-progress").style.width = `0%`;
    document.getElementById("text2-percentage").textContent = `0%`;
  
    resultElement.classList.remove("d-none");
  }
  
  // Anfangswerte setzen und Resultat mit Platzhaltern anzeigen
displayPlaceholderResult();
