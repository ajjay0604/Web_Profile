const body = document.body;
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('#primaryNav a');

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

/* =========================================
   Typewriter Effect
   ========================================= */
const typeText = document.querySelector('.typewriter-text');
const phrases = [
  "a Full-Stack Developer", 
  "a Researcher in AI", 
  "a Community Impact Maker",
  "a Tech Enthusiast",
  "an Automobile Aficionado",
  "a Mathematics Geek"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
  if (!typeText) return;

  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typeText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // Deleting is faster
  } else {
    typeText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100; // Typing speed
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start the animation when DOM loads
document.addEventListener('DOMContentLoaded', typeWriter);

navLinks.forEach((link) =>
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      const headerOffset = 110;
      if (target) {
        const offsetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(offsetPosition, 0),
          behavior: 'smooth',
        });
      }
    }

    if (nav?.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  })
);

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');

function applyProjectFilter(filter) {
  const matchingCards = Array.from(projectCards).filter((card) => {
    const category = card.dataset.category;
    return filter === 'all' || filter === category;
  });
  
  // Hide all cards first
  projectCards.forEach((card) => {
    card.style.display = 'none';
    card.classList.add('project-hidden');
    card.classList.remove('project-visible');
  });
  
  // Show matching cards (first 3 visible, rest hidden)
  matchingCards.forEach((card, index) => {
    if (index < 3) {
      // Show first 3
      card.style.display = 'flex';
      card.classList.remove('project-hidden');
      card.classList.add('project-visible');
    } else {
      // Hide the rest (but keep them in DOM for show more)
      card.style.display = 'none';
      card.classList.add('project-hidden');
      card.classList.remove('project-visible');
    }
  });
  
  // Update toggle button visibility
  const hiddenCount = matchingCards.length - 3;
  const projectsToggleBtn = document.querySelector('.projects-toggle-btn');
  if (projectsToggleBtn) {
    if (hiddenCount > 0) {
      projectsToggleBtn.style.display = 'inline-block';
      projectsToggleBtn.textContent = 'Show More Projects';
    } else {
      projectsToggleBtn.style.display = 'none';
    }
  }
  
  // Reset toggle state
  window.projectsExpanded = false;
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    applyProjectFilter(filter);
  });
});

// Initialize projects - show only first 3 in "All" category
function initializeProjects() {
  if (projectCards.length > 0) {
    applyProjectFilter('all');
  }
}

// Try to initialize immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initializeProjects, 0);
} else {
  window.addEventListener('load', initializeProjects);
  document.addEventListener('DOMContentLoaded', initializeProjects);
}

// Publication read more
document.querySelectorAll('.pub-toggle').forEach((btn) => {
  const card = btn.closest('.publication-card');
  const extra = card?.querySelector('.pub-extra');
  if (!extra) return;

  // ensure collapsed state
  extra.style.maxHeight = '0px';

  btn.addEventListener('click', () => {
    const isOpen = extra.classList.toggle('is-open');
    if (isOpen) {
      extra.style.maxHeight = `${extra.scrollHeight}px`;
      btn.textContent = 'Read Less';
    } else {
      extra.style.maxHeight = '0px';
      btn.textContent = 'Read More';
    }
  });
});

const modal = document.querySelector('.modal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.querySelector('.modal-description');
const modalTags = document.querySelector('.modal-tags');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

function openModal({ title, description, tags }) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalTags.textContent = tags ? `Tags: ${tags}` : '';
  modal?.classList.add('is-open');
  body.style.overflow = 'hidden';
}

function closeModal() {
  modal?.classList.remove('is-open');
  body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);

document.querySelectorAll('.details').forEach((btn) => {
  btn.addEventListener('click', () => {
    openModal({
      title: btn.dataset.title,
      description: btn.dataset.description,
      tags: btn.dataset.tags,
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Curriculum modal
const curriculumModal = document.querySelector('.curriculum-modal');
const curriculumTitle = document.getElementById('curriculumTitle');
const curriculumContent = document.querySelector('.curriculum-content');
const curriculumClose = curriculumModal?.querySelector('.modal-close');
const curriculumBackdrop = curriculumModal?.querySelector('.modal-backdrop');

const curriculumData = {
  btech: {
    title: 'B.Tech Computer Science & Engineering - Curriculum',
    content: `
      <h4>Core Computer Science Fundamentals</h4>
      <ul>
        <li>Data Structures and Algorithms</li>
        <li>Design and Analysis of Algorithms</li>
        <li>Theory of Computation</li>
        <li>Compiler Design</li>
        <li>Computer Architecture and Organization</li>
        <li>Operating Systems</li>
        <li>Computer Networks</li>
      </ul>
      <h4>Programming and Software Development</h4>
      <ul>
        <li>Computer Programming (Python)</li>
        <li>Structured and Object-Oriented Programming (C/C++)</li>
        <li>Computer Programming (Java)</li>
        <li>Web Programming</li>
        <li>Software Engineering</li>
      </ul>
      <h4>Mathematics and Applied Mathematics</h4>
      <ul>
        <li>Calculus</li>
        <li>Differential Equations and Transforms</li>
        <li>Complex Variables and Linear Algebra</li>
        <li>Probability and Statistics</li>
        <li>Discrete Mathematics and Graph Theory</li>
      </ul>
      <h4>Artificial Intelligence and Data Science</h4>
      <ul>
        <li>Artificial Intelligence</li>
        <li>Foundations of Data Science</li>
        <li>Natural Language Processing</li>
        <li>Wearable Computing</li>
      </ul>
      <h4>Systems and Security</h4>
      <ul>
        <li>Embedded Systems</li>
        <li>Cryptography and Network Security</li>
      </ul>
    `
  },
  class12: {
    title: 'Grade 12 - Curriculum',
    content: `
      <h4>Subjects</h4>
      <ul>
        <li>English Core</li>
        <li>Mathematics</li>
        <li>Physics</li>
        <li>Chemistry</li>
        <li>Computer Science (Python & SQL)</li>
        <li>Physical Education</li>
        <li>Work Experience</li>
        <li>Health and Physical Education</li>
        <li>General Studies</li>
      </ul>
    `
  },
  class10: {
    title: 'Grade 10 - Curriculum',
    content: `
      <h4>Subjects</h4>
      <ul>
        <li>English Language and Literature</li>
        <li>Sanskrit (Language)</li>
        <li>Mathematics Standard</li>
        <li>Science (Theory)</li>
        <li>Social Science</li>
        <li>Information Technology</li>
      </ul>
    `
  }
};

function openCurriculumModal(education) {
  const data = curriculumData[education];
  if (!data) return;
  
  curriculumTitle.textContent = data.title;
  curriculumContent.innerHTML = data.content;
  curriculumModal?.classList.add('is-open');
  body.style.overflow = 'hidden';
}

function closeCurriculumModal() {
  curriculumModal?.classList.remove('is-open');
  body.style.overflow = '';
}

document.querySelectorAll('.curriculum-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const education = btn.dataset.education;
    openCurriculumModal(education);
  });
});

curriculumClose?.addEventListener('click', closeCurriculumModal);
curriculumBackdrop?.addEventListener('click', closeCurriculumModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && curriculumModal?.classList.contains('is-open')) {
    closeCurriculumModal();
  }
});

// Experience read more/less
document.querySelectorAll('.experience-toggle').forEach((btn) => {
  const item = btn.closest('.experience-item');
  const extra = item?.querySelector('.experience-extra');
  if (!extra) return;

  extra.style.maxHeight = '0px';

  btn.addEventListener('click', () => {
    const isOpen = extra.classList.toggle('is-open');
    if (isOpen) {
      extra.style.maxHeight = `${extra.scrollHeight}px`;
      btn.textContent = 'Read Less';
    } else {
      extra.style.maxHeight = '0px';
      btn.textContent = 'Read More';
    }
  });
});

// Projects show more/hide
const projectsToggleBtn = document.querySelector('.projects-toggle-btn');
window.projectsExpanded = false;

if (projectsToggleBtn) {
  projectsToggleBtn.addEventListener('click', () => {
    window.projectsExpanded = !window.projectsExpanded;
    
    // Get the active filter
    const activeFilter = document.querySelector('.filter.active');
    const currentFilter = activeFilter ? activeFilter.dataset.filter : 'all';
    
    // Get all matching cards for current filter
    const matchingCards = Array.from(projectCards).filter((card) => {
      const category = card.dataset.category;
      return currentFilter === 'all' || currentFilter === category;
    });
    
    // Show/hide cards beyond the first 3
    matchingCards.forEach((card, index) => {
      if (index < 3) {
        // Always show first 3
        card.style.display = 'flex';
        card.classList.remove('project-hidden');
        card.classList.add('project-visible');
      } else {
        // Toggle visibility for the rest
        if (window.projectsExpanded) {
          card.style.display = 'flex';
          card.classList.remove('project-hidden');
          card.classList.add('project-visible');
        } else {
          card.style.display = 'none';
          card.classList.add('project-hidden');
          card.classList.remove('project-visible');
        }
      }
    });
    
    projectsToggleBtn.textContent = window.projectsExpanded ? 'Hide Projects' : 'Show More Projects';
  });
}

// Community works show more/hide
const communityToggleBtn = document.querySelector('.community-toggle-btn');
const hiddenCommunity = document.querySelectorAll('.community-item.community-hidden');

if (communityToggleBtn && hiddenCommunity.length > 0) {
  let isExpanded = false;
  
  communityToggleBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    hiddenCommunity.forEach((item) => {
      if (isExpanded) {
        item.classList.remove('community-hidden');
        item.classList.add('community-visible');
      } else {
        item.classList.add('community-hidden');
        item.classList.remove('community-visible');
      }
    });
    
    communityToggleBtn.textContent = isExpanded ? 'Show Less Volunteering Works' : 'Show More Voluneering Works';
  });
}


// 1. Initialize EmailJS
// IMPORTANT: Paste your Public Key inside the quotes below
(function() {
    emailjs.init("Isu5yuD0jGkUYfNJU"); 
})();

// 2. Handle Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';

    const serviceID = 'service_phswhql';
    const templateID = 'template_76rniif';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Message Sent!';
           
            
            // Reset button text after 2 seconds
            setTimeout(() => { btn.innerText = originalText; }, 2000);
            
            // Clear the form fields
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.innerText = originalText;
            alert('Failed to send message. Please try again.');
            console.log('FAILED...', err);
        });
});

/* ----------------------------------- */
/* BETTER SCROLLSPY (Intersection Observer) */
/* ----------------------------------- */


// We use unique variable names (spySections, spyLinks) to avoid errors
const spySections = document.querySelectorAll("section");
const spyLinks = document.querySelectorAll(".nav ul li a");

const observerOptions = {
  root: null,
  // This focuses the detection on the middle of the screen
  // The light changes when the section hits the middle 30% zone
  rootMargin: "-30% 0px -30% 0px", 
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Get the ID of the section currently in the middle of the screen
      const currentId = entry.target.getAttribute("id");
      
      // Update the Navbar
      spyLinks.forEach((link) => {
        // 1. Turn off light for everyone
        link.classList.remove("active");
        
        // 2. Turn on light ONLY for the matching section
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

// Start observing all sections
spySections.forEach((section) => {
  observer.observe(section);
});

// CLICK FIX: Force the browser to 'let go' of the link after clicking
// This prevents the "sticky" color issue
spyLinks.forEach((link) => {
  link.addEventListener("click", () => {
    link.blur(); 
  });
});

document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. AWARDS SHOW MORE / LESS LOGIC --- */
  const awardsToggleBtn = document.querySelector('.awards-toggle-btn');
  const hiddenAwards = document.querySelectorAll('.award-card.award-hidden');
  let isAwardsExpanded = false;

  if (awardsToggleBtn && hiddenAwards.length > 0) {
    awardsToggleBtn.addEventListener('click', () => {
      isAwardsExpanded = !isAwardsExpanded;

      hiddenAwards.forEach((card) => {
        if (isAwardsExpanded) {
          card.classList.remove('award-hidden');
          card.classList.add('award-visible');
        } else {
          card.classList.add('award-hidden');
          card.classList.remove('award-visible');
        }
      });

      awardsToggleBtn.textContent = isAwardsExpanded ? 'Show Less Awards' : 'Show More Awards';
    });
  }

  /* --- 2. CERTIFICATE MODAL LOGIC --- */
  const certModal = document.querySelector('.certificate-modal');
  const certFrame = document.getElementById('certFrame');
  const certImage = document.getElementById('certImage');
  const certDownload = document.getElementById('downloadLink');
  const certClose = certModal?.querySelector('.modal-close');
  const certBackdrop = certModal?.querySelector('.modal-backdrop');

  function openCertModal(fileSrc) {
    if (!certModal) {
      console.error("Certificate Modal not found in HTML");
      return;
    }

    const fileExt = fileSrc.split('.').pop().toLowerCase();
    
    // Handle Images vs PDFs
    if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
      if(certImage) {
        certImage.src = fileSrc;
        certImage.style.display = 'block';
      }
      if(certFrame) certFrame.style.display = 'none';
    } else {
      if(certFrame) {
        certFrame.src = fileSrc;
        certFrame.style.display = 'block';
      }
      if(certImage) certImage.style.display = 'none';
    }

    if(certDownload) certDownload.href = fileSrc;
    
    certModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('is-open');
    document.body.style.overflow = '';
    
    // Clear source to stop background loading
    setTimeout(() => {
      if(certFrame) certFrame.src = '';
      if(certImage) certImage.src = '';
    }, 300);
  }

  // Attach Click Event to Buttons
  const viewBtns = document.querySelectorAll('.view-cert-btn');
  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-src');
      if (src) {
        openCertModal(src);
      } else {
        console.error("No data-src found on button");
      }
    });
  });

  // Close Listeners
  certClose?.addEventListener('click', closeCertModal);
  certBackdrop?.addEventListener('click', closeCertModal);
  
  // Close on Escape Key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && certModal?.classList.contains('is-open')) {
      closeCertModal();
    }
  });

});

/* =========================================
   Number Counter Animation
   ========================================= */
function initCounters() {
  const statsSection = document.querySelector('#stats-counter');
  if (!statsSection) return;

  const options = {
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Select all counters inside the section
      const counters = entry.target.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        // Reset to 0 in case of re-animation (optional)
        counter.innerText = '0'; 
        
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          
          // Determine speed: Higher divisor = slower speed
          // We use target / 50 so all numbers finish at roughly the same time
          const increment = target / 50; 

          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 60); // Run every 30ms
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });

      // Stop observing after animation runs once
      observer.unobserve(entry.target);
    });
  }, options);

  observer.observe(statsSection);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCounters);
