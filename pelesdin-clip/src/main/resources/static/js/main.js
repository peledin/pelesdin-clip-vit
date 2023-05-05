document.getElementById("comparison-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const progressBarContainer = document.getElementById("progress-bar-container");
  const progressBar = document.getElementById("progress-bar");
  const resultElement = document.getElementById("result");
  resultElement.classList.add("d-none");
  progressBarContainer.classList.remove("d-none");
  progressBar.style.width = "100%";
  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const response = await fetch(`/api/compare?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&imageUrl=${encodeURIComponent(imageUrl)}`);
  progressBarContainer.classList.add("d-none");
  progressBar.style.width = "0%";
  if (response.ok) {
      const probabilities = await response.json();
      resultElement.innerHTML = `Probabilities: Text 1: ${(probabilities[0] * 100).toFixed(2)}%, Text 2: ${(probabilities[1] * 100).toFixed(2)}%`;
  } else {
      resultElement.innerHTML = "An error occurred.";
  }
  resultElement.classList.remove("d-none");
});





function getRandomImage() {
  const index = Math.floor(Math.random() * cocoImages.length);
  return cocoImages[index];
}

document.getElementById("shuffleButton").addEventListener("click", () => {
  const randomImage = getRandomImage();
  document.getElementById("imagePreview").src = randomImage;
  document.getElementById("imageUrl").value = randomImage;
});

const cocoImages = [
  "http://images.cocodataset.org/val2017/000000039769.jpg",
  "http://images.cocodataset.org/val2017/000000252219.jpg",
  "http://images.cocodataset.org/val2017/000000000285.jpg",       
  "http://images.cocodataset.org/val2017/000000000724.jpg",
  "http://images.cocodataset.org/val2017/000000002149.jpg",
  "http://images.cocodataset.org/val2017/000000002299.jpg",
  "http://images.cocodataset.org/val2017/000000001296.jpg",
  "http://images.cocodataset.org/val2017/000000002153.jpg",
  "http://images.cocodataset.org/val2017/000000001000.jpg",
  "http://images.cocodataset.org/val2017/000000008532.jpg",
  // ...
];

document.getElementById("imageUrl").addEventListener("input", () => {
  const imageUrl = document.getElementById("imageUrl").value;
  document.getElementById("imagePreview").src = imageUrl;
});