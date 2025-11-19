const body = document.body;
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('#primaryNav a');

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

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
