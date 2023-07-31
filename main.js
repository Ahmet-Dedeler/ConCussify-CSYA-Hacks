window.onload = function() {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture');

    const menu_btn = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    if (menu_btn && mobile_menu) {
        menu_btn.addEventListener('click', function (){
            menu_btn.classList.toggle('is-active');
            mobile_menu.classList.toggle('is-active');
        });
    }

    const constraints = {
        video: true,
    };

    captureButton.addEventListener('click', () => {
        // Pause the video when the user clicks "Take Picture".
        video.pause();
        // Set a timeout of 2 seconds, then redirect the user to a different page
        // based on which page they are currently on.
        setTimeout(() => {
            const pathname = window.location.pathname;
            if (pathname.includes('baseline-camera')) {
                window.location.href = '/pages/baseline-completed';
            } else if (pathname.includes('post-camera')) {
                window.location.href = '/pages/concussion-detected';
            }
        }, 2000);
    });

    // Access the device camera and stream to video element.
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        });
};
