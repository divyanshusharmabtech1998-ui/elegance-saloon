// Google Apps Script URL
var scriptURL = https://script.google.com/macros/s/AKfycbwjJ0wuyAxZx5kbJSxBCLTBghQjiTzCc3gAa_-SH1jNBLNF4zSB2-p_hypgQ8YhiBhf/exec;

// Form submission handler
function handleSubmit(event) {
  event.preventDefault();
  
  var form = event.target;
  var button = form.querySelector('.form-submit');
  
  var name = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var email = document.getElementById('email').value.trim();
  var service = document.getElementById('service').value;
  var date = document.getElementById('date').value;
  var message = document.getElementById('message').value.trim();
  
  if (!name || !phone || !email) {
    alert('Please fill all required fields!');
    return;
  }
  
  button.textContent = 'Saving...';
  button.disabled = true;
  
  // Create FormData object
  var formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('service', service);
  formData.append('date', date);
  formData.append('message', message);
  
  // Send data to Google Sheet
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log('✅ Booking saved to Google Sheets');
    button.textContent = '✓ Booking Confirmed!';
    button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(function() {
      alert('Your booking has been saved!\n\nWe will contact you soon.\n\n📞 +91 98765 43210\n📧 hello@elegancesalon.com');
      form.reset();
      button.textContent = 'Confirm Booking';
      button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      button.disabled = false;
    }, 1500);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    alert('Error: ' + error.message);
    button.textContent = 'Confirm Booking';
    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    button.disabled = false;
  });
}

// Smooth scrolling for navigation links
var links = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
}

// Animations on page load
window.addEventListener('load', function() {
  var sections = document.querySelectorAll('.section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.opacity = '0';
    sections[i].style.transform = 'translateY(30px)';
    sections[i].style.animation = 'fadeInUp 0.8s ease-out ' + (0.2 + i * 0.1) + 's forwards';
  }
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
  var hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = '0% ' + (window.scrollY * 0.5) + 'px';
  }
});

console.log('✅ Script loaded - Google Sheets integration ready');
