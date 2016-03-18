$('a').click(function() {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
    return false;
});

var currentSlide = 1;
var left = document.getElementById('left');
var right = document.getElementById('right');
var wrapper = document.getElementsByClassName('text-wrapper');
var width = document.getElementById('slide').getBoundingClientRect().width;

var onTransitionend = function() {
  this.style.opacity = 1;
  this.removeEventListener("transitionend", onTransitionend);
};

for(var i = 1, l = wrapper.length; i < l; i++) {
  wrapper[i].style.left = width * i + "px";
  wrapper[i].addEventListener("transitionend", onTransitionend, false);
}

left.addEventListener("click",function() {
	if(currentSlide == 1)
		return;
	document.getElementById('slide' + currentSlide).style.left = width + "px";
  document.getElementById('slide' + (--currentSlide)).style.left = '0';
},false);

right.addEventListener("click",function() {
	if(currentSlide == 4)
		return;
	document.getElementById('slide' + currentSlide).style.left = -1 * width + "px";
  document.getElementById('slide' + (++currentSlide)).style.left = '0';
},false);


var subscribeModal = document.getElementById('subscribeModal');
var closeCode = 'kill';
var enteredCode = '';

window.addEventListener("keydown", function(ev) {
  console.log(enteredCode);

  // Start capturing
  if(ev.key) {
    enteredCode += ev.key;

    // Check entered code
    if(closeCode.indexOf(enteredCode) === -1) {
      enteredCode = '';
    }

    // Finally close when done
    if(enteredCode === closeCode) {
      subscribeModal.style.display = "none";
      enteredCode = '';
    }
  }
})



