/**
 * ARUL DECORS - PAINTING CONTRACTOR WEBSITE APPLICATION SCRIPT
 * -----------------------------------------------------------
 * Controls interactivity: Mobile drawer, Project Album Lightbox (51 Photos Viewer),
 * Painting Cost Estimator calculation, Form validation, and direct WhatsApp URL generator.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined') {
    console.error('Configuration file (config.js) not loaded!');
    return;
  }

  // Initialize UI components
  initBusinessDetails();
  initMobileMenu();
  initServicesRender();
  initProjectsRender();
  initCostEstimator();
  initQuoteForm();
  initReviewsRender();
});

/* 1. POPULATE BUSINESS PLACEHOLDERS ACROSS DOM */
function initBusinessDetails() {
  const b = CONFIG.business;

  // Text Elements with [data-config]
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (b[key]) {
      el.textContent = b[key];
    }
  });

  // Phone links
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:${b.phoneRaw}`;
  });

  // WhatsApp links
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    const defaultMsg = encodeURIComponent(`Hi ${b.name}, I would like to get a quote for painting services.`);
    link.href = `https://wa.me/${b.whatsappRaw}?text=${defaultMsg}`;
    link.target = "_blank";
  });
}

/* 2. MOBILE MENU HAMBURGER NAVIGATION */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    hamburger.innerHTML = isExpanded 
      ? `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
      : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });
  });
}

/* 3. DYNAMIC SERVICES RENDER */
function initServicesRender() {
  const container = document.getElementById('services-grid');
  if (!container || !CONFIG.services) return;

  container.innerHTML = CONFIG.services.map(s => `
    <div class="service-card" id="service-${s.id}">
      <div class="service-icon-wrapper">
        ${s.icon}
      </div>
      <h3 class="service-title">${s.name}</h3>
      <p class="service-desc">${s.description}</p>
      <div class="service-features-list">
        ${s.features.map(f => `<span class="service-feature-pill">✓ ${f}</span>`).join('')}
      </div>
      <a href="#quote-section" onclick="selectQuoteService('${s.name}')" class="btn btn-outline btn-sm btn-block">Request Quote</a>
    </div>
  `).join('');
}

// Global helper to select service when clicking service card button
window.selectQuoteService = function(serviceName) {
  const serviceSelect = document.getElementById('quote-service');
  if (serviceSelect) {
    for (let option of serviceSelect.options) {
      if (option.text.toLowerCase().includes(serviceName.toLowerCase()) || option.value.toLowerCase().includes(serviceName.toLowerCase())) {
        option.selected = true;
        break;
      }
    }
  }
};

/* 4. PROJECT GALLERY ALBUM & LIGHTBOX SYSTEM */
function initProjectsRender() {
  const projectsGrid = document.getElementById('projects-grid');
  const albumModal = document.getElementById('album-modal');
  const albumModalTitle = document.getElementById('album-modal-title');
  const albumPhotosGrid = document.getElementById('album-photos-grid');
  const albumCloseBtn = document.getElementById('album-close-btn');
  const albumBackBtn = document.getElementById('album-back-btn');

  // Fullscreen Viewer elements
  const viewerModal = document.getElementById('photo-viewer-modal');
  const viewerImg = document.getElementById('viewer-img');
  const viewerCaption = document.getElementById('viewer-caption');
  const viewerCloseBtn = document.getElementById('viewer-close-btn');
  const viewerPrevBtn = document.getElementById('viewer-prev-btn');
  const viewerNextBtn = document.getElementById('viewer-next-btn');

  if (!projectsGrid || !CONFIG.projects) return;

  let currentAlbumImages = [];
  let currentImageIndex = 0;

// Render Project Cover Cards
projectsGrid.innerHTML = CONFIG.projects.map((proj, index) => `
  <div class="project-card" data-project-id="${proj.id}">
    <div class="project-img-wrap">
      <img src="${proj.coverImage}" alt="Design ${index + 1}" loading="lazy">
      <span class="project-photo-count">📸 ${proj.photoCount} Photos</span>
    </div>

    <div class="project-card-body">
      <h3 class="project-card-title">Design ${index + 1}</h3>

      <button class="btn btn-primary btn-block btn-sm" onclick="openProjectAlbum('${proj.id}')">
        Open Album (${proj.photoCount} Photos) →
      </button>
    </div>
  </div>
`).join('');

  // Function to Open Project Album Modal
  window.openProjectAlbum = function(projectId) {
    const project = CONFIG.projects.find(p => p.id === projectId);
    if (!project) return;

    currentAlbumImages = project.images;
    albumModalTitle.textContent = `${project.title} (${project.photoCount} Photos)`;

    albumPhotosGrid.innerHTML = project.images.map((imgUrl, index) => `
      <div class="album-photo-card" onclick="openPhotoViewer(${index})">
        <img src="${imgUrl}" alt="Photo ${index + 1} of ${project.title}" loading="lazy">
        <span class="album-photo-number">#${index + 1}</span>
      </div>
    `).join('');

    albumModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close Album Modal
  const closeAlbumModal = () => {
    albumModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (albumCloseBtn) albumCloseBtn.addEventListener('click', closeAlbumModal);
  if (albumBackBtn) albumBackBtn.addEventListener('click', closeAlbumModal);

  // Function to Open Fullscreen Photo Viewer
  window.openPhotoViewer = function(index) {
    currentImageIndex = index;
    updateViewerImage();
    viewerModal.classList.add('active');
  };

  const updateViewerImage = () => {
    if (currentAlbumImages.length === 0) return;
    const url = currentAlbumImages[currentImageIndex];
    viewerImg.src = url;
    viewerCaption.textContent = `Photo ${currentImageIndex + 1} of ${currentAlbumImages.length}`;
  };

  const closeViewerModal = () => {
    viewerModal.classList.remove('active');
  };

  if (viewerCloseBtn) viewerCloseBtn.addEventListener('click', closeViewerModal);

  if (viewerPrevBtn) {
    viewerPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
      updateViewerImage();
    });
  }

  if (viewerNextBtn) {
    viewerNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
      updateViewerImage();
    });
  }

  // Keyboard navigation for Fullscreen Viewer
  document.addEventListener('keydown', (e) => {
    if (!viewerModal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
      updateViewerImage();
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
      updateViewerImage();
    } else if (e.key === 'Escape') {
      closeViewerModal();
    }
  });
}

/* 5. PAINTING COST ESTIMATOR */
function initCostEstimator() {
  const propertySelect = document.getElementById('est-property');
  const scopeSelect = document.getElementById('est-scope');
  const sqftSlider = document.getElementById('est-sqft');
  const sqftDisplay = document.getElementById('est-sqft-val');
  const roomsInput = document.getElementById('est-rooms');
  const paintRadios = document.querySelectorAll('input[name="est-paint-type"]');
  const surfaceRadios = document.querySelectorAll('input[name="est-surface"]');
  const resultDisplay = document.getElementById('est-result-price');

  if (!sqftSlider || !resultDisplay) return;

  const calculateEstimate = () => {
    const pConfig = CONFIG.pricing;

    const propertyType = propertySelect ? propertySelect.value : 'house';
    const scope = scopeSelect ? scopeSelect.value : 'interior';
    const sqft = parseInt(sqftSlider.value, 10) || 1000;
    
    let paintType = 'standard';
    paintRadios.forEach(r => { if (r.checked) paintType = r.value; });

    let surface = 'fair';
    surfaceRadios.forEach(r => { if (r.checked) surface = r.value; });

    const baseRate = pConfig.scopeBaseRates[scope] || 16;
    const paintAddon = pConfig.paintTypeAddon[paintType] || 0;
    const propMult = pConfig.propertyMultipliers[propertyType] || 1.0;
    const surfaceMult = pConfig.surfaceConditionMultipliers[surface] || 1.0;

    const baseTotal = (baseRate + paintAddon) * sqft;
    const finalEstimate = baseTotal * propMult * surfaceMult;

    const minEst = Math.round((finalEstimate * 0.95) / 100) * 100;
    const maxEst = Math.round((finalEstimate * 1.10) / 100) * 100;

    const symbol = pConfig.currencySymbol || '₹';
    resultDisplay.innerHTML = `${symbol}${minEst.toLocaleString('en-IN')} - ${symbol}${maxEst.toLocaleString('en-IN')}`;

    if (sqftDisplay) {
      sqftDisplay.textContent = `${sqft.toLocaleString()} Sq. Ft.`;
    }
  };

  [propertySelect, scopeSelect, sqftSlider, roomsInput].forEach(elem => {
    if (elem) elem.addEventListener('input', calculateEstimate);
  });
  paintRadios.forEach(r => r.addEventListener('change', calculateEstimate));
  surfaceRadios.forEach(r => r.addEventListener('change', calculateEstimate));

  calculateEstimate();

  const useEstBtn = document.getElementById('use-estimate-btn');
  if (useEstBtn) {
    useEstBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const sqft = sqftSlider.value;
      const scope = scopeSelect ? scopeSelect.options[scopeSelect.selectedIndex].text : '';
      const estimateVal = resultDisplay.textContent;

      const messageBox = document.getElementById('quote-message');
      const areaInput = document.getElementById('quote-area');
      
      if (areaInput) areaInput.value = sqft;
      if (messageBox) {
        messageBox.value = `Hi, I estimated a budget of approx ${estimateVal} for ${sqft} sq.ft (${scope}) on your website cost estimator. Please contact me to schedule a site inspection!`;
      }

      document.getElementById('quote-section').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* 6. QUOTE FORM VALIDATION & WHATSAPP GENERATION */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const confirmBox = document.getElementById('confirmation-box');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('quote-name').value.trim();
    const phone = document.getElementById('quote-phone').value.trim();
    const location = document.getElementById('quote-location').value.trim();
    const propertyType = document.getElementById('quote-property').value;
    const service = document.getElementById('quote-service').value;
    const area = document.getElementById('quote-area').value.trim();
    const preferredDate = document.getElementById('quote-date').value;
    const message = document.getElementById('quote-message').value.trim();

    if (!name || !phone) {
      alert('Please enter your Name and Phone Number.');
      return;
    }

    const b = CONFIG.business;
    let text = `*NEW PAINTING QUOTE INQUIRY*\n\n`;
text += `-----------------------------------\n`;
text += `Customer Name : ${name}\n`;
text += `Phone Number  : ${phone}\n`;

if (location) text += `Location      : ${location}\n`;
if (propertyType) text += `Property Type : ${propertyType}\n`;
if (service) text += `Service       : ${service}\n`;
if (area) text += `Approx. Area  : ${area} sq.ft.\n`;

if (preferredDate) {
  const formattedDate = new Date(preferredDate).toLocaleDateString("en-GB");
  text += `Preferred Date: ${formattedDate}\n`;
}

if (message) {
  text += `Message       : ${message}\n`;
}

text += `-----------------------------------\n`;
text += `Sent from Arul Decors Website`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${b.whatsappRaw}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    if (confirmBox) {
      confirmBox.innerHTML = `
        <h4>✅ Thank You, ${name}!</h4>
        <p>Your quotation request has been formatted and opened in WhatsApp. If WhatsApp did not open automatically, please click below:</p>
        <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 10rem;">Send via WhatsApp Now</a>
      `;
      confirmBox.classList.add('active');
    }

    form.reset();
  });
}

/* 7. REAL CLIENT FEEDBACK FORM & STORAGE HANDLER */
function initReviewsRender() {
  const form = document.getElementById('feedback-form');
  const starsContainer = document.getElementById('star-rating-select');
  const confirmBox = document.getElementById('feedback-confirm-box');
  const reviewsContainer = document.getElementById('submitted-reviews-list');
  let selectedRating = 5;

  // Star Rating Interactive Selection
  if (starsContainer) {
    const stars = starsContainer.querySelectorAll('.star-btn');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value'), 10);
        stars.forEach(s => {
          const val = parseInt(s.getAttribute('data-value'), 10);
          s.classList.toggle('active', val <= selectedRating);
        });
      });
    });
  }

  // Load reviews from localStorage
  const loadStoredReviews = () => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem('arul_decors_submitted_reviews') || '[]');
    } catch (e) {
      stored = [];
    }

    if (reviewsContainer) {
      if (stored.length === 0) {
        reviewsContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
            📌 No customer feedback submitted yet. Be the first to share your experience using the form above!
          </div>
        `;
      } else {
        reviewsContainer.innerHTML = stored.map(r => `
          <div class="review-card">
            <div class="review-stars">
              ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
            </div>
            <p class="review-comment">"${r.comment}"</p>
            <div class="review-author">
              <div class="author-avatar">${r.name.charAt(0).toUpperCase()}</div>
              <div>
                <h5 class="author-name">${r.name}</h5>
                <p class="author-meta">Verified Customer Submission</p>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  };

  loadStoredReviews();

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('feedback-name').value.trim();
      const comment = document.getElementById('feedback-text').value.trim();

      if (!name || !comment) {
        alert('Please fill out your Name and Feedback text.');
        return;
      }

      const newReview = {
        name: name,
        rating: selectedRating,
        comment: comment,
        date: new Date().toLocaleDateString()
      };

      // Store in localStorage
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem('arul_decors_submitted_reviews') || '[]');
      } catch (e) {
        stored = [];
      }
      stored.unshift(newReview);
      localStorage.setItem('arul_decors_submitted_reviews', JSON.stringify(stored));

      // Show confirmation message
      if (confirmBox) {
        confirmBox.innerHTML = `
          <div style="background: #dcfce7; border: 1px solid #86efac; color: #166534; padding: 1rem; border-radius: var(--radius-md); text-align: center; margin-top: 1rem;">
            ✅ Thank you, <strong>${name}</strong>! Your review has been submitted successfully.
          </div>
        `;
        confirmBox.style.display = 'block';
      }

      form.reset();
      // Reset stars to 5
      if (starsContainer) {
        starsContainer.querySelectorAll('.star-btn').forEach(s => s.classList.add('active'));
      }
      selectedRating = 5;

      // Reload list
      loadStoredReviews();
    });
  }
}
