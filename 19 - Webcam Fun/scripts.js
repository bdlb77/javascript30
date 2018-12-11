const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(userMediaStream => {
			// window.URL.create.... is deprecated 

			// video.src = window.URL.createObjectURL(userMediaStream);

			// use instead: 
			 video.srcObject = userMediaStream;

			video.play();
		})
		.catch(err => {
			console.error(`Your video isn't working!`, err);
		});
}

function paintingToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;

	canvas.width = width;
	canvas.height = height;
	
	setInterval(() => {
		return ctx.drawImage(video,0, 0, width, height);
	}, 16)
}


getVideo();