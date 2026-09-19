/* ==========================================================================
   TANVI GLASS & ALUMINIUM - INTERACTIVE LOGIC & ESTIMATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServiceFilters();
  initPortfolioFilters();
  initLightbox();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky header with blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. SERVICE FILTERS
   -------------------------------------------------------------------------- */
function initServiceFilters() {
  const serviceFilterContainer = document.getElementById('serviceFilters');
  if (!serviceFilterContainer) return;

  const filterBtns = serviceFilterContainer.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. PORTFOLIO FILTERS (REAL WORK GALLERY)
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const portfolioFilterContainer = document.getElementById('portfolioFilters');
  if (!portfolioFilterContainer) return;

  const filterBtns = portfolioFilterContainer.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('#portfolioGrid .portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX MODAL FOR REAL PROJECT PHOTOS
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const modalClose = document.getElementById('lightboxClose');
  const modalInquire = document.getElementById('lightboxInquire');
  const portfolioItems = document.querySelectorAll('#portfolioGrid .portfolio-item');

  if (!modal || !modalImg) return;

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const title = item.getAttribute('data-title') || 'Tanvi Aluminium Project';
      const desc = item.getAttribute('data-desc') || 'Precision Architectural Fabrication';

      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      if (modalInquire) {
        modalInquire.href = `https://wa.me/917869336945?text=${encodeURIComponent('Hi Tanvi Aluminium, I would like to inquire about the project: ' + title)}`;
        modalInquire.target = '_blank';
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM TO WHATSAPP SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const service = document.getElementById('custService').value;
    const area = document.getElementById('custArea').value.trim() || 'Not specified';
    const location = document.getElementById('custLocation').value.trim() || 'Not specified';
    const message = document.getElementById('custMessage').value.trim() || 'None';

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const leadMsg = `*New Site Consultation Request - Tanvi Aluminium*\n` +
                    `━━━━━━━━━━━━━━━━━━━\n` +
                    `*Client Name:* ${name}\n` +
                    `*Phone Number:* ${phone}\n` +
                    `*Service Required:* ${service}\n` +
                    `*Approx Area:* ${area}\n` +
                    `*Project Location:* ${location}\n` +
                    `*Notes:* ${message}\n` +
                    `━━━━━━━━━━━━━━━━━━━\n` +
                    `Please call back to confirm site visit timing.`;

    const encoded = encodeURIComponent(leadMsg);
    window.open(`https://wa.me/917869336945?text=${encoded}`, '_blank');

    alert('Thank you, ' + name + '! Your inquiry is being sent directly to Tanvi Glass & Aluminium on WhatsApp.');
    form.reset();
  });
}
