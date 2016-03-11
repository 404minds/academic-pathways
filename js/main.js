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

for(var i = 1, l = wrapper.length; i < l; i++) {
  wrapper[i].style.left = width * i + "px";
  wrapper[i].style.opacity = 1;
}

left.addEventListener("click",function() {
	if(currentSlide == 1)
		return;
	document.getElementById('slide' + currentSlide).style.left = width + "px";
  document.getElementById('slide' + (--currentSlide)).style.left = '0';
},false);

right.addEventListener("click",function() {
	if(currentSlide == 3)
		return;
	document.getElementById('slide' + currentSlide).style.left = -1 * width + "px";
  document.getElementById('slide' + (++currentSlide)).style.left = '0';
},false);




