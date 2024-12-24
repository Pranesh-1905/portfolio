document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "pranesh190504@gmail.com",
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    })
    .then(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        document.getElementById('contactForm').reset();
        setTimeout(() => btn.innerHTML = originalText, 3000);
    }, function(error) {
        btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
        console.error('Failed to send message:', error);
        setTimeout(() => btn.innerHTML = originalText, 3000);
    });
});