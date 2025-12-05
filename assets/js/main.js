// OptiGROW Main JavaScript
// Handles navigation, animations, scroll effects, and interactive elements

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll to section
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========================================
// NAVIGATION - ENHANCED MOBILE SUPPORT
// ========================================

class Navigation {
  constructor() {
    this.nav = document.querySelector('.main-nav');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.dropdown = document.querySelector('.dropdown');
    this.dropdownToggle = document.querySelector('.dropdown-toggle');
    this.isScrolled = false;
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });
    }
    
    // Mobile dropdown toggle
    if (this.dropdownToggle) {
      this.dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleDropdown();
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.navMenu && this.navMenu.classList.contains('active')) {
        if (!e.target.closest('.main-nav')) {
          this.closeMenu();
        }
      }
    });
    
    // Close menu on link click (mobile) - except dropdown toggle
    this.navLinks.forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.closeMenu();
          }
        });
      }
    });
    
    // Close menu on dropdown item click (mobile)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeMenu();
        }
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768) {
        this.closeMenu();
        if (this.dropdown) {
          this.dropdown.classList.remove('active');
        }
      }
    }, 250));
    
    // Scroll effect
    window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
    this.handleScroll(); // Initial check
    
    // Highlight active page
    this.highlightActivePage();
  }
  
  toggleMenu() {
    if (!this.hamburger || !this.navMenu) return;
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Close dropdown when closing menu
    if (!this.navMenu.classList.contains('active') && this.dropdown) {
      this.dropdown.classList.remove('active');
    }
  }
  
  closeMenu() {
    if (this.hamburger) {
      this.hamburger.classList.remove('active');
    }
    if (this.navMenu) {
      this.navMenu.classList.remove('active');
    }
    document.body.classList.remove('menu-open');
    
    // Also close dropdown
    if (this.dropdown) {
      this.dropdown.classList.remove('active');
    }
  }
  
  toggleDropdown() {
    if (this.dropdown) {
      this.dropdown.classList.toggle('active');
    }
  }
  
  handleScroll() {
    if (!this.nav) return;
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      
      if (scrolled) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    }
  }
  
  highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }
  
  init() {
    // Initial check for elements already in view
    this.checkElements();
    
    // Check on scroll
    window.addEventListener('scroll', debounce(() => this.checkElements(), 50));
  }
  
  checkElements() {
    this.animatedElements.forEach(element => {
      if (this.isInViewport(element)) {
        element.classList.add('animated');
      }
    });
  }
  
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
      rect.top <= windowHeight * 1 &&
      rect.bottom >= 0
    );
  }
}

// ========================================
// FLOATING CTA BUTTONS
// ========================================

class FloatingCTA {
  constructor() {
    this.createButtons();
  }
  
  createButtons() {
    // Check if buttons already exist
    if (document.querySelector('.floating-cta')) return;
    
    const container = document.createElement('div');
    container.className = 'floating-cta';
    container.innerHTML = `
      <a href="${OPTIGROW_CONFIG.whatsapp.url}?text=${encodeURIComponent(OPTIGROW_CONFIG.whatsapp.message)}" 
         class="cta-button whatsapp-btn" 
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="Contact us on WhatsApp"
         title="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
        </svg>
      </a>
      
      <a href="${OPTIGROW_CONFIG.phone.href}" 
         class="cta-button call-btn" 
         aria-label="Call us"
         title="Call: ${OPTIGROW_CONFIG.phone.display}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="currentColor"/>
        </svg>
      </a>
    `;
    
    document.body.appendChild(container);
    
    // Add animation on scroll
    window.addEventListener('scroll', debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        container.classList.add('visible');
      } else {
        container.classList.remove('visible');
      }
    }, 100));
  }
}

// ========================================
// SERVICES PAGE - JAVASCRIPT TRANSITIONS (FIXED + HASH SUPPORT)
// ========================================

class ServicesManager {
  constructor() {
    this.container = document.querySelector('.services-content-container');
    if (!this.container) return;
    
    this.buttons = document.querySelectorAll('.service-nav-btn');
    this.contents = document.querySelectorAll('.service-content');
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    if (this.contents.length === 0 || this.buttons.length === 0) return;
    
    // Determine initial tab based on URL hash (if any)
    const initialIndex = this.getIndexFromHash() ?? 0;
    this.showService(initialIndex);
    
    // Button click handlers
    this.buttons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button behavior
        this.showService(index);
        
        // Scroll to top of content on mobile
        if (window.innerWidth <= 768) {
          this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    
    // React when hash changes (e.g., clicking services.html#compliance-management)
    window.addEventListener('hashchange', () => {
      const indexFromHash = this.getIndexFromHash();
      if (indexFromHash !== null) {
        this.showService(indexFromHash);
        this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.showPrevious();
      } else if (e.key === 'ArrowRight') {
        this.showNext();
      }
    });
  }
  
  getIndexFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return null;
    
    const contentsArray = Array.from(this.contents);
    const index = contentsArray.findIndex(section => section.id === hash);
    return index !== -1 ? index : null;
  }
  
  showService(index) {
    if (index < 0 || index >= this.contents.length) return;
    
    // Update buttons
    this.buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    
    // Update content
    this.contents.forEach((content, i) => {
      content.classList.toggle('active', i === index);
    });
    
    this.currentIndex = index;
  }
  
  showNext() {
    const nextIndex = (this.currentIndex + 1) % this.contents.length;
    this.showService(nextIndex);
  }
  
  showPrevious() {
    const prevIndex = (this.currentIndex - 1 + this.contents.length) % this.contents.length;
    this.showService(prevIndex);
  }
}

// ========================================
// ACCORDION (for How It Works page)
// ========================================

class Accordion {
  constructor() {
    this.accordionHeaders = document.querySelectorAll('.accordion-header');
    this.init();
  }
  
  init() {
    this.accordionHeaders.forEach(header => {
      header.addEventListener('click', () => this.toggle(header));
    });
    
    // Open first item by default
    if (this.accordionHeaders.length > 0) {
      this.accordionHeaders[0].parentElement.classList.add('active');
    }
  }
  
  toggle(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all items
    this.accordionHeaders.forEach(h => {
      h.parentElement.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  }
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new ScrollAnimations();
  new FloatingCTA();
  new ServicesManager();
  new Accordion();
  
  // Add fade-in effect to page
  document.body.classList.add('page-loaded');
  
  console.log('✨ OptiGROW website loaded successfully');
});

// ========================================
// PAGE TRANSITION EFFECT
// ========================================

window.addEventListener('beforeunload', () => {
  document.body.classList.add('page-transitioning');
});
