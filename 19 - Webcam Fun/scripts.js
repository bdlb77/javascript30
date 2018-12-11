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
		 ctx.drawImage(video, 0, 0, width, height);
		 //  take pixels out
		 let pixels = ctx.getImageData(0, 0, width, height);
		 // mess with them
		 pixels = redEffect(pixels);

		 //  put them back
		 ctx.putImageData(pixels, 0, 0);
	}, 16);
}

function redEffect(pixels){
	for(let i = 0; i < pixels.data.length; i+=4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100;  //Red
		pixels.data[i + 1] = pixels.data[i + 1] - 50; //Green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
	}
	return pixels;
}

function takePhoto(){
	//play sound
	snap.currentTime = 0;
	snap.play();

	// take data out
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'brybry-bug');
	link.innerHTML = `<img src="${data}" alt="brybry" />`;
	strip.insertBefore(link, strip.firstChild);

}

video.addEventListener('canplay', paintingToCanvas);

getVideo();