// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO

  var canvas = document.getElementById('user-image');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  var dimensions = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, dimensions.startX, dimensions.startY, dimensions.width, dimensions.height);
  document.querySelector("button[type='reset']").disabled = false;

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});


// Input Image Method
document.querySelector('#image-input').addEventListener('change', () => {
  
  const inputtedImage = document.querySelector('#image-input').files[0];
  img.src =  URL.createObjectURL(inputtedImage);

});

// function to grab text from input and generate it into canvas
function generateText() {

  //load user inputted text
  var toptext = document.getElementById('text-top').value;
  var bottomtext = document.getElementById('text-bottom').value;

  // get canvas properties
  var canvas = document.getElementById('user-image');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.font = "40px Comic Sans MS";
  
  //fill the text in canvas
  ctx.textAlign = 'center';
  ctx.fillText(toptext, canvas.width/2, canvas.height/8);
  ctx.fillText(bottomtext, canvas.width / 2, 7 / 8 * canvas.height);
  document.querySelector("button[type='reset']").disabled = false;
  document.querySelector("button[type='button']").disabled = false;


}
//calling generate text function
document.getElementById('generate-meme').addEventListener('submit', (event) => {
  event.preventDefault();
  generateText();

});


// function to reset canvas
function resetCanvas() {
  var canvas = document.getElementById('user-image');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// function to call reset canvas
document.querySelector("button[type='reset']").addEventListener('click', () => {
  resetCanvas();
  document.querySelector("button[type='reset']").disabled = true;
  document.querySelector("button[type='button']").disabled = true;
});

function readText() {
  var toptext = document.getElementById('text-top').value;
  var bottomtext = document.getElementById('text-bottom').value;

  let topUtterance = new SpeechSynthesisUtterance(toptext);
  let bottomUtterance = new SpeechSynthesisUtterance(bottomtext);

  speechSynthesis.speak(topUtterance);
  speechSynthesis.speak(bottomUtterance);
}

document.querySelector("button[type='button']").addEventListener('click', () => {
  readText();
});




/**
 * Takes in the dimensions of th0e canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
