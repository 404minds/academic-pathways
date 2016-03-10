$('a').click(function() {
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
    return false;
});


var left = document.getElementById('left');
var right = document.getElementById('right');