// OptiGROW Global Configuration
// Update phone numbers and URLs here

const OPTIGROW_CONFIG = {
  // Contact Information
  phone: {
    display: "+91 80972 93555",
    href: "tel:+918097293555"
  },
  
  whatsapp: {
    number: "918097293555",
    url: "https://wa.me/918097293555",
    message: "Hello OptiGROW! I would like to know more about your payroll outsourcing services."
  },
  
  // Company Information
  company: {
    name: "OptiGROW Outsoutsourcing Private Limited",
    shortName: "OptiGROW",
    email: "info@optigrow.co.in",
    domain: "www.optigrow.co.in",
    address: {
      line1: "703, Oriana Business Park",
      line2: "Road No. 22, Wagle Industrial Estate",
      city: "Thane",
      pincode: "400 604",
      state: "Maharashtra",
      country: "India"
    }
  },
  
  // Google Maps
  map: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d72.9!3d19.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x43094bfff60fb557!2sGrowthNEXT%20Consultants!5e0!3m2!1sen!2sin!4v1234567890"
  },
  
  // Social Media (Currently not used as per requirements)
  social: {
    linkedin: "",
    twitter: "",
    facebook: ""
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OPTIGROW_CONFIG;
}
