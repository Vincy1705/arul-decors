/**
 * ARUL DECORS - PAINTING CONTRACTOR WEBSITE CONFIGURATION
 * -------------------------------------------------------
 * Edit this file to update business details, phone numbers, services,
 * pricing calculation rates, and customer reviews.
 * 
 * PLACEHOLDERS are clearly marked so you can easily replace them!
 */

const CONFIG = {
  // 1. BUSINESS DETAILS (Replace placeholders with your father's actual business info)
  business: {
    name: "ARUL DECORS",                  // Business Name
    shortName: "Arul Decors",             // Short brand name
    ownerName: "Arul arockiam P",         // Owner Name
    tagline: "Professional Interior & Exterior Painting Services",
    description: "Delivering top-tier residential and commercial painting solutions with 25+ years of trusted workmanship, premium finishes, and meticulous surface preparation.",
    
    // Contact Info
    phone: "+91 9884113613",              // Display phone
    phoneRaw: "9884113613",               // Digits only for tel: link
    whatsapp: "+91 9884113613",           // Display WhatsApp
    whatsappRaw: "919884113613",          // Digits with country code for WhatsApp link
    email: "aruldecors2019@gmail.com",    // Email address
    
    // Location & Service Area
    address: "No.9, Thanigai nagar, annex - 1, pulliline, Redhills, Chennai.",
    city: "Chennai & Thiruvallur",
    serviceAreas: ["Chennai", "Thiruvallur", "Redhills", "Anna Nagar", "T. Nagar", "Velachery", "Ambattur", "Porur"],

    // Highlight Statistics
    stats: {
      yearsExperience: "25+",
      completedProjects: "1000+",
      happyClients: "950+",
      satisfactionRate: "99%"
    }
  },

  // 2. PRICING CONFIGURATION FOR COST ESTIMATOR
  // Customize per sq ft rates and property multipliers here!
  pricing: {
    currencySymbol: "₹",
    
    // Base rate per square foot (approximate)
    scopeBaseRates: {
      interior: 16,    // ₹16 per sq.ft.
      exterior: 20,    // ₹20 per sq.ft.
      both: 32         // ₹32 per sq.ft.
    },

    // Property Type Multiplier
    propertyMultipliers: {
      house: 1.0,
      apartment: 0.95,
      office: 1.15,
      shop: 1.10,
      other: 1.0
    },

    // Type of Paint Finish (Add-on per sq.ft.)
    paintTypeAddon: {
      standard: 0,     // Standard Emulsion
      premium: 8,      // Premium Washable Emulsion (+₹8/sq.ft)
      luxury: 18,      // Luxury Royal Finish (+₹18/sq.ft)
      texture: 28      // Texture / Designer Finish (+₹28/sq.ft)
    },

    // Surface Condition Multiplier (Prep work required)
    surfaceConditionMultipliers: {
      good: 1.0,       // Re-painting, good condition
      fair: 1.15,      // Minor crack filling & touch up
      poor: 1.35       // Full putty work, peeling paint repair, primer coats
    },

    // Estimate Disclaimer Note
    disclaimer: "This is an approximate cost estimate. Final pricing may vary depending on actual site inspection, surface condition, paint material brand chosen, scaffolding requirements, and customer preferences."
  },

  // 3. SERVICES PROVIDED
  services: [
    {
      id: "interior",
      name: "Interior Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      description: "Transform your living spaces with smooth, dust-free interior painting using washable emulsions and non-toxic low-VOC paints.",
      features: ["Dust-free prep", "Washable finishes", "Furniture protection", "Color matching"]
    },
    {
      id: "exterior",
      name: "Exterior Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
      description: "Weather-proof exterior painting engineered to withstand harsh sunlight, heavy rainfall, algae, and UV discoloration.",
      features: ["Weather-shield protection", "Anti-fungal coating", "Crack sealing", "Long-lasting glow"]
    },
    {
      id: "house",
      name: "House Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      description: "Complete end-to-end villa and independent house painting contracts covering interior walls, ceilings, exteriors, and wood trim.",
      features: ["Turnkey contract", "Complete house package", "Timely delivery", "Clean handover"]
    },
    {
      id: "commercial",
      name: "Commercial Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><line x1="9" y1="18" x2="15" y2="18"/></svg>`,
      description: "Professional painting services for IT offices, retail stores, showrooms, and industrial premises with flexible non-business hour schedules.",
      features: ["Flexible schedules", "High durability paint", "Safety compliance", "Fast turnaround"]
    },
    {
      id: "repainting",
      name: "Repainting & Restoration",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
      description: "Refresh aged or peeling walls with deep scraping, moisture treatment, sanding, and fresh coats of vibrant modern colors.",
      features: ["Old paint scraping", "Dampness treatment", "Smooth re-coat", "Color consultation"]
    },
    {
      id: "wallputty",
      name: "Wall Putty Application",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      description: "Flawless white cement putty application providing ultra-smooth level base surfaces that maximize paint sheen and coverage.",
      features: ["Dual coat putty", "Smooth machine sanding", "Crack filling", "Mirror-finish base"]
    },
    {
      id: "primer",
      name: "Primer Application",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      description: "High-adhesion acrylic primer coats that seal porous masonry, prevent alkali attacks, and ensure uniform paint absorption.",
      features: ["Alkali resistance", "Uniform absorption", "Strong adhesion", "Longer paint life"]
    },
    {
      id: "texture",
      name: "Texture & Accent Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      description: "Create striking feature walls with metallic textures, stencil patterns, marble finish, stucco, and artistic designer walls.",
      features: ["Designer patterns", "Metallic effects", "Feature wall specialist", "Custom art finishes"]
    },
    {
      id: "ceiling",
      name: "Ceiling Painting",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
      description: "Brighten your rooms with clean white ceiling finishes, false ceiling painting, and crack-free trim detailing.",
      features: ["High-reflectance white", "False ceiling coats", "Drip-free execution", "Clean edges"]
    }
  ],

  // 4. PROJECT GALLERY ALBUMS (Folder-based structure)
  projects: [
    {
      id: "residential-painting-project",
      title: "Residential Painting Project",
      coverImage: "images/projects/project-1/image-4.jpg",
      photoCount: 51,
      description: "Complete villa and house painting collection featuring interior walls, putty sanding, and accent coats.",
      folder: "images/projects/project-1",
      images: Array.from({ length: 51 }, (_, i) => `images/projects/project-1/image-${i + 1}.jpg`)
    },
    {
      id: "house-exterior-project",
      title: "House Exterior Painting Project",
      coverImage: "images/projects/project-2/image-2.jpg",
      photoCount: 12,
      description: "Weather-proof exterior painting engineered to withstand sun, rain, and algae.",
      folder: "images/projects/project-2",
      images: Array.from({ length: 12 }, (_, i) => `images/projects/project-2/image-${i + 1}.jpg`)
    },
    {
      id: "interior-texture-project",
      title: "Interior & Texture Painting Project",
      coverImage: "images/projects/project-3/image-3.jpg",
      photoCount: 12,
      description: "Dust-free wall putty prep, acrylic primer application, and smooth emulsion coats.",
      folder: "images/projects/project-3",
      images: Array.from({ length: 12 }, (_, i) => `images/projects/project-3/image-${i + 1}.jpg`)
    }
  ],

  // 5. CUSTOMER REVIEWS (Initially empty - populated by real user submissions)
  reviews: []
};

// Freeze config object to prevent accidental mutation in browser console
Object.freeze(CONFIG);
