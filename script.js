document.addEventListener("DOMContentLoaded", () => {
  // ===== Typed.js for Hero Text Animation =====
  const heroEl = document.querySelector(".hero h1 span");
  if (heroEl) {
    new Typed(".hero h1 span", {
      strings: ["Pendalwar Sainath","Pendalwar Sainath","a Web Developer", "a Learner"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });
  }

  const typedTextEl = document.getElementById("typed-text");
  if (typedTextEl) {
    new Typed('#typed-text', {
      strings: ['Software Engineer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });
  }

  // ===== Smooth scroll =====
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      // Close menu after clicking (mobile only)
      const navLinks = document.querySelector(".nav-links");
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
      }
    });
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // ===== Responsive behavior (reset on resize) =====
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active"); // keep inline on desktop
    }
  });

  // ===== Let's Talk Button Redirect =====
const letsTalkBtn = document.querySelector(".cta"); // Select the "Let's Talk" button

if (letsTalkBtn) {
  letsTalkBtn.addEventListener("click", () => {
    window.location.href = "letsTalk/lets_Talk.html"; // Redirects to contact page
  });
}


  // ===== AI Assistant Modal =====
  const openBtn = document.getElementById("ai-assistant-btn");
  const modal = document.getElementById("ai-modal");
  const closeBtn = document.getElementById("close-modal");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // ===== Header scroll effect =====
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(44, 62, 80, 0.9)";
      } else {
        header.style.backgroundColor = "var(--secondary-color)";
      }
    });
  }

  // ===== Skill Bar Animation =====
  const skillBars = document.querySelectorAll(".skill-bar");
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const skillLevel = bar.getAttribute("data-skill");
      bar.style.width = `${skillLevel}%`;
    });
  };

  window.addEventListener("scroll", () => {
    const skillsSection = document.querySelector(".skills");
    if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) {
      animateSkillBars();
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.getAttribute('data-skill');
        entry.target.style.width = `${skillLevel}%`;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));

  // ===== Form Submission Handling =====
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        message: document.querySelector("textarea[name='message']").value,
      };

      try {
        const response = await fetch("http://localhost:5000/contact-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
          alert("✅ Message sent successfully!");
          contactForm.reset();
        } else {
          alert("❌ Failed to send message.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Something went wrong!");
      }
    });
  }

  // ===== Fade-in animations =====
  const animatedElements = document.querySelectorAll('.project-card, .experience-item, .education-item');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => animationObserver.observe(el));
});

// ===== Scroll Active Nav Links =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; 
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
