// Event-Listener für das Formular-Submit-Event
document.getElementById("comparison-form").addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  setLoadingAnimationState(true);

  // Werte der Eingabefelder abrufen
  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;
  const imageUrl = document.getElementById("imageUrl").value;

  // API-Anfrage senden
  const response = await fetch(`/api/compare?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&imageUrl=${encodeURIComponent(imageUrl)}`);

  setLoadingAnimationState(false);

  // Ergebnis anzeigen
  if (response.ok) {
    const probabilities = await response.json();
    displayResult([probabilities[0], probabilities[1]]);
  } else {
    displayResult("An error occurred.");
  }
}

// Ladeanimation ein- oder ausschalten
function setLoadingAnimationState(isLoading) {
  const text1Progress = document.getElementById("text1-progress");
  const text2Progress = document.getElementById("text2-progress");

  if (isLoading) {
    text1Progress.classList.add("progress-bar-loading");
    text2Progress.classList.add("progress-bar-loading");
  } else {
    text1Progress.classList.remove("progress-bar-loading");
    text2Progress.classList.remove("progress-bar-loading");
  }
}


function displayResult(probabilities) {
  const resultElement = document.getElementById("result");

  document.getElementById("text1-label").textContent = `${document.getElementById("text1").value}:`;
  const text1Progress = document.getElementById("text1-progress");
  const text1Percentage = (probabilities[0] * 100).toFixed(2);
  text1Progress.style.width = `${text1Percentage}%`;
  setProgressBarColor(text1Progress, text1Percentage);
  document.getElementById("text1-percentage").textContent = `${text1Percentage}%`;

  document.getElementById("text2-label").textContent = `${document.getElementById("text2").value}:`;
  const text2Progress = document.getElementById("text2-progress");
  const text2Percentage = (probabilities[1] * 100).toFixed(2);
  text2Progress.style.width = `${text2Percentage}%`;
  setProgressBarColor(text2Progress, text2Percentage);
  document.getElementById("text2-percentage").textContent = `${text2Percentage}%`;

  resultElement.classList.remove("d-none");
  displayHint(probabilities);
}

// Funktion zum Anzeigen eines Hinweises
function displayHint(probabilities) {
  const hintElement = document.getElementById("hint");
  const text1Percentage = probabilities[0] * 100;
  const text2Percentage = probabilities[1] * 100;

  let hintText;

  if (text1Percentage >= 30 && text1Percentage <= 70 && text2Percentage >= 30 && text2Percentage <= 70) {
    hintText = "The classification is inconclusive. Try to use other terms.";
  } else {
    const higherPercentageText = text1Percentage > text2Percentage ? document.getElementById("text1").value : document.getElementById("text2").value;
    hintText = `The image is more likely to be classified as <strong>${higherPercentageText}</strong>.`;
  }

  hintElement.innerHTML = hintText;
  hintElement.classList.remove("d-none");
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

  // Prozentbalken einfärben
  function setProgressBarColor(progressBar, value) {
    if (value >= 70) {
      progressBar.style.backgroundColor = "green";
    } else if (value <= 30) {
      progressBar.style.backgroundColor = "red";
    } else {
      progressBar.style.backgroundColor = "yellow";
    }
  }  
  

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

// Nachtmodus Schalter
document.getElementById("nightModeSwitch").addEventListener("change", (e) => {
  const nightModeStylesheet = document.getElementById("night-mode-stylesheet");
  nightModeStylesheet.disabled = !e.target.checked;
});
