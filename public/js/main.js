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


var form = document.getElementById('registration-form');
var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/; 

var text = "";
form.addEventListener("submit", function(event) {
  event.preventDefault();

  var errorBox = document.getElementById('errorBox1');

  if(form.name.value == "") {
    text = "Enter the name";
    reset(form.name, text ,errorBox);
    return false;
  }  
   
  if (form.email.value == "" ) {
  text = "Enter the email";
  reset(form.email, text ,errorBox);
  return false;
  }else if(!emailRegex.test(form.email.value)) {
    text = "Enter the valid email";
    reset(form.email, text ,errorBox);
    return false;
  }

  if(form.contact.value == "") {
    text = "Enter the contact number";
    reset(form.contact, text ,errorBox);
    return false;
  }else if(!(form.contact.value.length == 10))  {
    text = "Enter the valid contact number";
    reset(form.contact, text ,errorBox);
    return false;
  }

  if(form.course.value == "") {
    text = "Select the course Interested";
    reset(form.course, text ,errorBox);
    return false;
  }  

  if(form.hqual.value == "") {
    text = "Enter Your High qualification";
    reset(form.hqual, text ,errorBox);
    return false;
  }  
  
  if(form.location.value == "") {
    text = "Select the Location";
    reset(form.location, text ,errorBox);
    return false;
  }  
  
  if(form.exper.value == "") {
    text = "Enter the experience";
    reset(form.exper, text ,errorBox);
    return false;
  }  
  
  
  if(form.name.value != '' && form.email.value != '' && form.contact.value != '' && form.course.value != "" && form.hqual.value != '' && form.course.value != "" && form.exper.value != '') {
   // Send data to API
   doSend();
   errorBox.innerHTML = '<i class="fa fa-check"></i>'+"Form submitted successfully";
  }

});



var sform = document.getElementById('subscribe-form');
var text = "";
sform.addEventListener("submit", function(event) {
  event.preventDefault();

  var errorBox = document.getElementById('errorBox2');

  if(sform.name.value == "") {
    text = "Enter the name";
    reset(sform.name, text ,errorBox);
    return false;
  }  
   
  if (sform.email.value == "" ) {
  text = "Enter the email";
  reset(sform.email, text ,errorBox);
  return false;
  }else if(!emailRegex.test(sform.email.value)) {
    text = "Enter the valid email";
    reset(sform.email, text ,errorBox);
    return false;
  }

  if(sform.contact.value == "") {
    text = "Enter the contact number";
    reset(sform.contact, text ,errorBox);
    return false;
  }else if(!(sform.contact.value.length == 10))  {
    text = "Enter the valid contact number";
    reset(sform.contact, text ,errorBox);
    return false;
  }
  
  
  if(sform.name.value != '' && sform.email.value != '' && sform.contact.value != '') {
    // Send data to API
    $.ajax({
      url: 'http://127.0.0.1:5000/subscribe',
      type: 'post',
      dataType: 'json',
      data: $(sform).serialize(),
      complete: function(jqXHR, textStatus) {
        subscribeModal.style.display = "none";
      }
    });
  }

});

function reset(box, text ,errorBox) {
  errorBox.style.display = "block";
  errorBox.innerHTML = text;
  box.style.borderColor = "#a94442";
  box.addEventListener("focus", function() {
    box.style.borderColor = "#000000";
    errorBox.style.display = "none";
  },false);

}

function doSend() {
  $.ajax({
    url: 'http://127.0.0.1:5000/register',
    type: 'post',
    dataType: 'json',
    data: $(form).serialize(),
    complete: function(jqXHR, textStatus) {
        alert("Success");
        console.log(jqXHR);
    }
  });
}