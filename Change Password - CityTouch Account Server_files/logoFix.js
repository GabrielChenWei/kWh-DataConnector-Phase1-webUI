if (document.URL.indexOf('/About') === document.URL.length - 6 && window.outerHeight < 950) {    
    var logo = document.getElementById('philips-logo');
    if (logo) {
        logo.style.display = 'none';
    }
}