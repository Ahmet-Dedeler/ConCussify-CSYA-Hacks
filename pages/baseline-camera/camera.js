
let videoStream;
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let imageElement = document.getElementById("captured-image");
let takePictureButton = document.getElementById("take-picture-button");
let capturedImage;

async function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                var video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
            })
            .catch(function(error) {
                console.error('Error accessing camera:', error);
            });
    } else {
        console.error('getUserMedia is not supported in this browser.');
    }
}

function takePicture() {
    const vidStyleData = video.getBoundingClientRect();
    canvas.style.width = vidStyleData.width + "px";
    canvas.style.height = vidStyleData.height + "px";
    canvas.style.left = vidStyleData.left + "px";
    canvas.style.top = vidStyleData.top + "px";
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.style.display = "none";
    canvas.style.display = "inline"
    takePictureButton.disabled = true;

    setTimeout(function() {
        video.style.display = "inline";
        canvas.style.display = "none";
        takePictureButton.disabled = false; // Enable the button again
    }, 7000);
    
}

// Event listener for the "Take Picture" button
takePictureButton.addEventListener("click", takePicture);

startCamera();