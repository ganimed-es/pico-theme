/* CAROUSEL */
if (document.getElementsByClassName("carousel")[0]) {
	var carousel = document.getElementsByClassName("carousel")[0],
	figure = carousel.getElementsByClassName("figure")[0],
	numImages = figure.childElementCount,
	theta =  2 * Math.PI / numImages,
	currentImage = 0;

	function nextImage () {
		currentImage--;
		figure.style.transform = 'rotateY('+(currentImage*theta)+'rad)';
	}

	function loop () {
		nextImage();
		setTimeout(function(){
			loop();
		}, 2000);
	}

	loop();
}


/* MAIL OBFUSCATING */
function decryptMailto(s) {
	var n = 0;
	var r = "";
	for (var i = 0; i < s.length; i++) {
		n = s.charCodeAt(i);
		if (n >= 8364) {
			n = 128;
		}
		r += String.fromCharCode(n - 1);
	}
	location.href = r;
}

/* TEXT ROTATION */
var TxtRotate = function(el, toRotate, roll) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = 2000;
	this.txt = '';
	this.roll = roll;
	this.tick();
	this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
	this.roll.style.transform = 'translateY(-'+i+'rem)';

	var that = this;
	var delta = 200 - Math.random() * 100;
	if (this.isDeleting) { 
		delta /= 2; 
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

window.addEventListener('load', (event) => {
	var rotates = document.getElementsByClassName('rotate');
	var rolls = document.getElementsByClassName('roll');
	for (var i=0; i<rotates.length; i++) {
		var toRotate = rotates[i].innerHTML;
		if (toRotate) {
			new TxtRotate(rotates[i], JSON.parse(toRotate), rolls[i % rotates.length]);
		}
	}
});
