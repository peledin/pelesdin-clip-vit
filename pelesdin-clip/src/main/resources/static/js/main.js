// Event-Listener für das Formular-Submit-Event
document.getElementById("comparison-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Zeige den Fortschrittsbalken an und verstecke das Ergebniselement
  showProgressBar();

  // Werte der Eingabefelder abrufen
  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;
  const imageUrl = document.getElementById("imageUrl").value;

  // API-Anfrage senden
  const response = await fetch(`/api/compare?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&imageUrl=${encodeURIComponent(imageUrl)}`);

  // Fortschrittsbalken ausblenden
  hideProgressBar();

  // Ergebnis anzeigen
  if (response.ok) {
      const probabilities = await response.json();
      displayResult(`Probabilities: Text 1: ${(probabilities[0] * 100).toFixed(2)}%, Text 2: ${(probabilities[1] * 100).toFixed(2)}%`);
  } else {
      displayResult("An error occurred.");
  }
});

function showProgressBar() {
  const progressBarContainer = document.getElementById("progress-bar-container");
  const progressBar = document.getElementById("progress-bar");
  const resultElement = document.getElementById("result");

  resultElement.classList.add("d-none");
  progressBarContainer.classList.remove("d-none");
  progressBar.style.width = "100%";
}

function hideProgressBar() {
  const progressBarContainer = document.getElementById("progress-bar-container");
  const progressBar = document.getElementById("progress-bar");

  progressBarContainer.classList.add("d-none");
  progressBar.style.width = "0%";
}

function displayResult(message) {
  const resultElement = document.getElementById("result");

  resultElement.innerHTML = message;
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
