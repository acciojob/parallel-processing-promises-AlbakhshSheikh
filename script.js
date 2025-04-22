const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

// Function to download all images
async function downloadImages() {
  // Reset previous states
  output.innerHTML = "";
  errorDiv.style.display = "none";
  errorDiv.innerHTML = "";
  
  // Show loading spinner
  loading.style.display = "block";
  
  try {
    // Download all images in parallel
    const images = await Promise.all(
      imageUrls.map(url => downloadImage(url))
    );
    
    // Hide loading spinner
    loading.style.display = "none";
    
    // Display all images
    images.forEach(img => {
      output.appendChild(img);
    });
    
  } catch (error) {
    // Hide loading spinner
    loading.style.display = "none";
    
    // Show error message
    errorDiv.style.display = "block";
    errorDiv.textContent = error.message;
  }
}

// Add click event listener to button
btn.addEventListener("click", downloadImages);