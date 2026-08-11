// Firebase Database से booking save करने का function
function handleSubmit(event) {
  event.preventDefault();
  
  // Check if database exists
  if (typeof database === 'undefined') {
    alert('❌ System is initializing. Please try again in a moment.');
    console.error('Firebase database is not defined');
    return;
  }
  
  const form = event.target;
  const button = form.querySelector('.form-submit');
  const originalText = button.textContent;
  
  // Form data collect करो
  const bookingData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    service: document.getElementById('service').value,
    date: document.getElementById('date').value,
    message: document.getElementById('message').value.trim(),
    timestamp: new Date().toLocaleString('en-IN'),
    status: 'pending'
  };
  
  // Validation
  if (!bookingData.name || !bookingData.phone || !bookingData.email) {
    alert('❌ कृपया सभी जरूरी fields भरो!');
    return;
  }
  
  // Loading state
  button.textContent = 'Saving...';
  button.disabled = true;
  
  // Firebase में data save करो
  try {
    const bookingsRef = database.ref('bookings').push();
    
    bookingsRef.set(bookingData)
      .then(() => {
        // Success
        console.log('✅ Booking saved successfully to Firebase');
        button.textContent = '✓ Booking Confirmed!';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
          alert('✓ आपकी booking successfully save हो गई!\n\n📞 हम आपसे जल्दी संपर्क करेंगे।\n\nPhone: +91 98765 43210\nEmail: hello@elegancesalon.com');
          form.reset();
          button.textContent = originalText;
          button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          button.disabled = false;
        }, 2000);
      })
      .catch((error) => {
        console.error('❌ Firebase Error:', error);
        alert('❌ Error: ' + error.message);
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        button.disabled = false;
      });
  } catch (error) {
    console.error('❌ Try-Catch Error:', error);
    alert('❌ Error: ' + error.message);
    button.textContent = originalText;
    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    button.disabled = false;
  }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px
