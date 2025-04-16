document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = "translateY(50px)";
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    sectionObserver.observe(section);
});

const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });

certCards.forEach(card => {
    certObserver.observe(card);
});

const contactForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: contactForm.elements['name'].value,
        email: contactForm.elements['_replyto'].value,
        message: contactForm.elements['message'].value
    };

    fetch(contactForm.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            successModal.classList.add('show');
            contactForm.reset();
        } else {
            alert('Oops! There was a problem submitting your form.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Oops! There was a problem submitting your form.');
    });
});

closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const taglines = [
        "Turning Ideas into Code ✨",
        "Cybersecurity & Crypto Enthusiast 🔐",
        "Building the Web, One Line at a Time 💻",
        "Trader by Day, Coder by Night 📈👨‍💻"
      ];
      
      let currentIndex = 0;
      const taglineEl = document.getElementById("tagline");
      
      function updateTagline() {
        taglineEl.classList.remove("visible");
      
        setTimeout(() => {
          taglineEl.textContent = taglines[currentIndex];
          taglineEl.classList.add("visible");
          currentIndex = (currentIndex + 1) % taglines.length;
        }, 1000); 
      }

      taglineEl.textContent = taglines[currentIndex];
      taglineEl.classList.add("visible");
      currentIndex++;
      
      setInterval(updateTagline, 3000);
      
});
