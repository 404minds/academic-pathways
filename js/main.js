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


var modal = document.getElementById('modal');
var cross = document.getElementById('cross');
cross.addEventListener("click",function() {
	modal.style.display = "none";
})


var form = document.getElementById('registration-form');
 var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/; 
var errorBox = document.getElementById('errorBox');
var text = "";
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if(form.Name.value == "") {
    text = "Enter the first name";
    reset(form.Name, text);
    return false;
  }  
   
  if (form.Email.value == "" ) {
  text = "Enter the email";
  reset(form.Email, text);
  return false;
  }else if(!emailRegex.test(form.Email.value)) {
    text = "Enter the valid email";
    reset(form.Email, text);
    return false;
  }

  if(form.Contact.value == "") {
    text = "Enter the contact number";
    reset(form.Contact, text);
    return false;
  }else if(!(form.Contact.value.length == 10))  {
    text = "Enter the valid contact number";
    reset(form.Contact, text);
    return false;
  }

  if(form.Course.value == "Course Interested") {
    text = "Select the course Interested";
    reset(form.Course, text);
    return false;
  }  

  if(form.Hqual.value == "") {
    text = "Enter Your High qualification";
    reset(form.Hqual, text);
    return false;
  }  
  
  if(form.Location.value == "Location") {
    text = "Select the Location";
    reset(form.Location, text);
    return false;
  }  
  
  if(form.Exper.value == "") {
    text = "Enter the experience";
    reset(form.Exper, text);
    return false;
  }  
  
  
  if(form.Name.value != '' && form.Email.value != '' && form.Contact.value != '' && form.Course.value != "" && form.Hqual.value != '' && form.Course.value != "" && form.Exper.value != '') {
   errorBox.innerHTML = '<i class="fa fa-check"></i>'+"Form submitted successfully";
   
     
}})


function reset(box, text) {
  errorBox.style.display = "block";
  errorBox.innerHTML = text;
  box.style.borderColor = "#a94442";
  box.addEventListener("focus", function() {
    box.style.borderColor = "#000000";
  },false);

}



