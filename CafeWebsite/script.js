// to scroll through the nav bars
var navLinks = document.querySelectorAll('.nav-links a');

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function (event) {
        event.preventDefault();

        var sectionName = this.innerText.toLowerCase();
        var targetSection = document.querySelector('.' + sectionName + '-section');

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


// to pop up the alert after message has been submitted and store it in the local storage
var contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

      
        var name = contactForm.querySelector('input[type="text"]').value;
        var email = contactForm.querySelector('input[type="email"]').value;
        var message = contactForm.querySelector('textarea').value;

     
        var submissions = JSON.parse(localStorage.getItem('submissions')) || [];

      
        submissions.push({ name: name, email: email, message: message });

     
        localStorage.setItem('submissions', JSON.stringify(submissions));

        alert("Thank you! Your message has been saved. ☕");

        
        contactForm.reset();
    });
}
