// Premium White-Glove Location Page Data
// Each location uses this data structure to populate the LocationPageTemplate

export interface NeighborhoodBehavior {
  name: string;
  behaviors: string[];
}

export interface MoveHighlight {
  neighborhood: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PhotoGalleryItem {
  caption: string;
  image?: string; // Optional - gallery hidden if < 3 images have actual image URLs
  // Admin note: Upload photos via CMS to replace placeholders
}

export interface UniqueLocalFrictionSection {
  title: string;
  bullets: [string, string, string]; // Exactly 3 bullets required
}

export interface ReviewSnippet {
  text: string;
  author: string;
  date?: string;
}

export interface InternalLink {
  text: string;
  url: string;
  context?: string;
}

export interface RelatedContent {
  services?: { title: string; slug: string }[];
  locations?: { title: string; slug: string }[];
}

export interface LocationPageData {
  // Basic info
  locationName: string;
  state: string;
  slug: string;
  
  // Proof points
  proofMovesCount: number;
  proofYears: number;
  
  // SEO (title tag + meta description; kept separate from the on-page H1)
  metaTitle: string;
  metaDescription: string;

  // Hero content
  heroTitle: string;
  heroSubhead: string;
  introParagraph: string;
  heroImage: string;
  
  // Neighborhoods
  primaryNeighborhoods: string[];
  neighborhoodsWithBehaviors: NeighborhoodBehavior[]; // At least 3 neighborhoods, each with 3 behaviors (unique per page)
  
  // Content sections
  umbrellaStandard: {
    title: string;
    description: string;
  }[];
  
  moveHighlights: MoveHighlight[]; // 3-6 items with constraint detail (avoid generic repeats)
  
  whiteGloveIncludes: string[];
  
  faqItems: FAQItem[];
  
  // Uniqueness guardrail - required for all location pages
  uniqueLocalFrictionSection?: UniqueLocalFrictionSection; // TODO: Required - add unique local friction content
  
  // Optional content
  zipCodesServed?: string[];
  photoGallery?: PhotoGalleryItem[]; // Gallery only shown if >= 3 items have real image URLs
  reviewSnippets?: ReviewSnippet[];
  
  // Specialty neighborhoods for cross-linking (e.g., Henderson links to Anthem)
  specialtyNeighborhoods?: {
    slug: string;
    name: string;
    teaser: string;
  }[];
  
  // Parent location for sub-areas (e.g., Anthem is part of Henderson)
  parentLocation?: {
    slug: string;
    name: string;
    description: string;
  };
  
  // Coordinates for map
  coordinates: { lat: number; lng: number };
  
  // Internal linking for SEO
  introLinks?: InternalLink[];
  relatedContent?: RelatedContent;
  proofLinks?: InternalLink[];
}

// Default Umbrella Standard (can be overridden per location)
const defaultUmbrellaStandard = [
  {
    title: "Hospitality-Grade Protection",
    description: "We start with a protection plan—wrapping, surface protection, and a staged load so your home stays clean and your items stay secure."
  },
  {
    title: "Managed Timing",
    description: "We confirm access requirements ahead of time (gates/HOAs/building rules) and schedule the day to reduce delays and surprises."
  },
  {
    title: "Room-by-Room Placement + Walkthrough",
    description: "We place items where you want them and finish with a walkthrough so nothing gets missed."
  }
];

// Default White-Glove Includes
const defaultWhiteGloveIncludes = [
  "Protection-first wrapping",
  "Surface protection plan",
  "Staged loading (essentials-first available)",
  "Room-by-room placement",
  "Final walkthrough"
];

// Default FAQ items for locations without custom FAQs
const defaultFAQItems: FAQItem[] = [
  {
    question: "Do you handle HOA and gated-community access?",
    answer: "Yes — we plan access requirements ahead of time so move day runs smoothly."
  },
  {
    question: "What makes your move \"white-glove\"?",
    answer: "Protection-first handling, staged loading, careful placement, and a clean, managed process from start to finish."
  },
  {
    question: "Can you help with packing?",
    answer: "If you want full-service, we can pack and label by room, then stage the load for efficient unloading and setup."
  },
  {
    question: "How do you reduce the risk of damage?",
    answer: "We focus on prep: wrapping, surface protection, and tight-space planning before the heavy lifting starts."
  },
  {
    question: "Can you accommodate tight timelines?",
    answer: "Often, yes. Tell us your constraints (closing time, HOA window, elevator reservation) and we'll confirm the best plan."
  },
  {
    question: "Do you move fragile, high-value items?",
    answer: "Yes — we offer protection-first handling and can discuss the best approach for delicate items during your quote."
  },
  {
    question: "Do you provide documentation if a building/HOA requires it?",
    answer: "If required, ask during booking and we'll confirm what your community needs and what we can provide."
  }
];

// Default photo gallery placeholders
const defaultPhotoGallery: PhotoGalleryItem[] = [
  { caption: "Full furniture wrap before loading" },
  { caption: "Floor protection and careful staging" },
  { caption: "Staged loading for efficient delivery" },
  { caption: "Protecting door frames during tight turns" },
  { caption: "Careful placement, room by room" },
  { caption: "Final walkthrough and placement check" }
];

// ============================================================================
// HENDERSON - FULLY POPULATED WITH PREMIUM CONTENT
// ============================================================================
const hendersonData: LocationPageData = {
  locationName: "Henderson",
  state: "NV",
  slug: "henderson",
  
  proofMovesCount: 700,
  proofYears: 15,
  
  metaTitle: "Henderson Movers | White-Glove Moving Company",
  metaDescription: "Licensed Henderson movers for Anthem, Green Valley and Seven Hills. Woman-owned, insured, 700+ Henderson moves with protection-first handling. Get a free quote.",
  heroTitle: "Henderson Movers",
  heroSubhead: "700+ Henderson moves over the last 15 years — a hospitality-grade, protection-first experience for Anthem, Green Valley, and Seven Hills.",
  introParagraph: "Henderson is Nevada's second-largest city, and a move here usually means one of a few things: a guard-gated community with its own move rules, a new build in Inspirada or Cadence that just closed, a Lake Las Vegas condo with a reserved elevator, or a downsize into Sun City Anthem. Each one runs differently. We confirm gate access, HOA hours and truck limits before move day, protect new floors and fresh paint, and keep the same crew from the first box to the final walkthrough.",

  heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
  
  primaryNeighborhoods: [
    "Anthem",
    "Seven Hills",
    "Green Valley",
    "Inspirada",
    "Cadence",
    "Lake Las Vegas"
  ],

  neighborhoodsWithBehaviors: [
    {
      "name": "Anthem, Seven Hills & MacDonald Highlands",
      "behaviors": [
        "Guard gates usually need your name list and move date ahead of time, so we send it early",
        "Hillside lots and long driveways get a shuttle plan if the full truck can't reach the door",
        "Sun City Anthem downsizes are paced around what's staying, what's going to storage and what family is taking"
      ]
    },
    {
      "name": "Green Valley & Green Valley Ranch",
      "behaviors": [
        "Older Green Valley homes can have tighter halls and narrow side yards, so big pieces get measured before they move",
        "Townhome and condo communities often limit move hours, which we confirm with the HOA",
        "Shared walkways and stairs are padded before the first piece goes out"
      ]
    },
    {
      "name": "Inspirada & Cadence",
      "behaviors": [
        "New-construction closings rarely hit an exact hour, so we schedule around the key handoff",
        "Brand-new flooring, baseboards and paint get full surface protection",
        "Garage and closet items go in last so the main rooms are usable the first night"
      ]
    },
    {
      "name": "Lake Las Vegas",
      "behaviors": [
        "Condo buildings often require a reserved elevator and loading area",
        "We ask about certificate of insurance requirements when you book",
        "Waterfront and resort homes get the same protection-first wrap as our white-glove moves"
      ]
    }
  ],

  umbrellaStandard: [
    {
      title: "Hospitality-Grade Protection",
      description: "We start with a protection plan—wrapping, surface protection, and a staged load so your home stays clean and your items stay secure."
    },
    {
      title: "Managed Timing",
      description: "We confirm access requirements ahead of time (gates/HOAs/building rules) and schedule the day to reduce delays and surprises."
    },
    {
      title: "Room-by-Room Placement + Walkthrough",
      description: "We place items where you want them and finish with a walkthrough so nothing gets missed."
    }
  ],
  
  moveHighlights: [
    {
      "neighborhood": "Gated communities (Anthem, Seven Hills, MacDonald Highlands)",
      "description": "Gate list and HOA hours confirmed the week before, a shuttle truck planned if the street or driveway limits truck size, and essentials loaded last so they come off first."
    },
    {
      "neighborhood": "New construction (Inspirada, Cadence)",
      "description": "Crew scheduled around the actual key handoff, new floors and paint protected before anything comes inside, garage and closet items placed last."
    },
    {
      "neighborhood": "Lake Las Vegas condos",
      "description": "Elevator and loading area reserved through the building, insurance paperwork handled at booking if the building asks for it, hallways and elevator walls padded."
    },
    {
      "neighborhood": "Sun City Anthem downsizes",
      "description": "A plan for what fits the new floor plan, extra pieces moved to storage or set aside for family, and the new home set up so it's livable that night."
    }
  ],

  whiteGloveIncludes: [
    "Protection-first wrapping",
    "Surface protection plan",
    "Staged loading (essentials-first available)",
    "Room-by-room placement",
    "Final walkthrough"
  ],
  
  faqItems: [
    {
      "question": "Do you handle guard-gated communities like Anthem, Seven Hills and MacDonald Highlands?",
      "answer": "Yes. Send us the gate or HOA contact when you book and we'll get on the access list and confirm any truck size or move-hour limits ahead of time."
    },
    {
      "question": "Can you move us into a new build in Inspirada or Cadence on closing day?",
      "answer": "Yes. Tell us the expected closing time and we'll plan the crew around when you actually have keys. If closing slips, we'll work with you on the new time."
    },
    {
      "question": "Do you help with Sun City Anthem downsizing?",
      "answer": "Yes. We can pack, move what fits the new home, and put the rest into storage until you decide what to keep."
    },
    {
      "question": "Do you move Lake Las Vegas condos?",
      "answer": "Yes. Many buildings require a reserved elevator and proof of insurance. Ask your building what it needs and tell us when you book, and we'll confirm what we can provide."
    },
    {
      "question": "Can you help with packing?",
      "answer": "Yes. We can pack and label by room, then stage the load so unloading and setup go quickly."
    },
    {
      "question": "Do you move pianos and other heavy pieces?",
      "answer": "Yes. We move pianos and oversized furniture with the right equipment and protection for stairs, hillside driveways and tight turns."
    },
    {
      "question": "How far ahead should I book a Henderson move?",
      "answer": "Two to four weeks is a safe window. Month-end dates and weekends fill first, so book earlier if your date is fixed."
    },
    {
      "question": "What areas of Henderson do you serve?",
      "answer": "All of Henderson, including Anthem, Sun City Anthem, Seven Hills, MacDonald Highlands, Green Valley, Green Valley Ranch, Inspirada, Cadence, Lake Las Vegas and the Water Street District."
    }
  ],

  zipCodesServed: [
    "89002",
    "89011",
    "89012",
    "89014",
    "89015",
    "89044",
    "89052",
    "89074"
  ],

  photoGallery: [
    { caption: "Anthem move — full furniture wrap before loading" },
    { caption: "Seven Hills — floor protection and careful staging" },
    { caption: "Green Valley Ranch — staged loading for a condo move" },
    { caption: "Anthem — protecting door frames during tight turns" },
    { caption: "Seven Hills — careful placement, room by room" },
    { caption: "Green Valley — final walkthrough and placement check" }
  ],
  
  reviewSnippets: [
    {
      text: "Moving from MacDonald Highlands was stress-free thanks to Umbrella Movers. They handled our hillside driveway like pros!",
      author: "Patricia S.",
      date: "November 2024"
    },
    {
      text: "We've used them twice for Henderson moves. Always on time, always careful with our belongings. True professionals.",
      author: "Michael & Karen H.",
      date: "October 2024"
    },
    {
      text: "The attention to detail was amazing. They even reassembled all our furniture perfectly in our new Anthem home.",
      author: "Susan L.",
      date: "September 2024"
    }
  ],
  
  // Unique local friction section for Henderson
  uniqueLocalFrictionSection: {
    "title": "Henderson Move Logistics We Handle",
    "bullets": [
      "Guard-gate access lists and HOA move hours confirmed before move day",
      "Shuttle plans for hillside lots and long driveways the full truck can't reach",
      "Closing-day timing for new construction in Inspirada and Cadence"
    ]
  },

  // Specialty neighborhoods that have their own pages
  specialtyNeighborhoods: [
    {
      slug: "anthem",
      name: "Anthem",
      teaser: "Our gated entry and HOA timing specialists for Anthem Country Club and Sun City Anthem."
    },
    {
      slug: "macdonald-highlands",
      name: "MacDonald Highlands",
      teaser: "Hillside estate specialists for DragonRidge Country Club and luxury custom homes."
    },
    {
      slug: "green-valley-ranch",
      name: "Green Valley Ranch",
      teaser: "Family-focused moves for Henderson's established community near top-rated schools."
    }
  ],
  
  // Internal linking for SEO
  introLinks: [
    { text: "our white-glove moving approach", url: "/services/white-glove-moving", context: "Henderson residents trust" },
    { text: "protection-first process", url: "/why-choose-us", context: "Learn about our" }
  ],
  relatedContent: {
    services: [
      { title: "Residential Moving", slug: "residential-moving" },
      { title: "White Glove Moving", slug: "white-glove-moving" }
    ],
    locations: [
      { title: "Summerlin", slug: "summerlin" },
      { title: "Anthem", slug: "anthem" }
    ]
  },
  proofLinks: [
    { text: "verified customer reviews", url: "/#testimonials", context: "Read" },
    { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
  ],
  
  coordinates: { lat: 36.0395, lng: -114.9817 }
};

// ============================================================================
// SUMMERLIN
// ============================================================================
const summerlinData: LocationPageData = {
  locationName: "Summerlin",
  state: "NV",
  slug: "summerlin",
  
  proofMovesCount: 750,
  proofYears: 15,
  
  metaTitle: "Summerlin Movers | White-Glove Moving Company",
  metaDescription: "Licensed Summerlin movers for The Ridges, Tournament Hills and Summerlin South. Woman-owned, insured, 750+ Summerlin moves with protection-first handling.",
  heroTitle: "Summerlin Movers",
  heroSubhead: "750+ Summerlin moves over the last 15 years — a hospitality-grade, protection-first experience for The Ridges, Tournament Hills, and Summerlin South.",
  introParagraph: "Summerlin is a master-planned community on the valley's west edge, right up against Red Rock Canyon, and it moves differently than central Las Vegas. Many villages sit behind guard gates, the newer villages to the west keep closing new construction, and Sun City Summerlin brings a steady run of 55+ downsizes. We confirm gate access and HOA rules before move day, protect every surface, and keep the same crew from the first box to the final walkthrough.",

  heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  
  primaryNeighborhoods: [
    "The Ridges",
    "Red Rock Country Club",
    "Tournament Hills",
    "Sun City Summerlin",
    "Stonebridge",
    "Summerlin South"
  ],

  neighborhoodsWithBehaviors: [
    {
      "name": "The Ridges, Red Rock Country Club & Tournament Hills",
      "behaviors": [
        "Guard-gated entry handled ahead of time with your gate list and move date",
        "Large custom homes get a room-by-room plan so the truck unloads in placement order",
        "Art, stone tables and oversized pieces are wrapped individually"
      ]
    },
    {
      "name": "Sun City Summerlin",
      "behaviors": [
        "Downsizing paced around what's staying, what's going to storage and what family is taking",
        "Furniture often goes into smaller rooms, so we measure before move day",
        "An unhurried crew and clear updates for family helping from out of town"
      ]
    },
    {
      "name": "Stonebridge, Redpoint & Kestrel",
      "behaviors": [
        "New-construction closings scheduled around when you actually get keys",
        "New flooring, paint and stairs protected from the first trip",
        "Truck parking planned around construction traffic on builder streets"
      ]
    },
    {
      "name": "The Trails, The Vistas & The Paseos",
      "behaviors": [
        "Many villages have sub-HOA rules on top of the master association, so we check both",
        "Two-story family homes staged so bedrooms and the kitchen are ready the first night",
        "Casitas and lofts planned as their own rooms on the load list"
      ]
    }
  ],

  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      "neighborhood": "Guard-gated estates (The Ridges, Red Rock Country Club)",
      "description": "Gate access arranged ahead, a room-by-room load plan for large custom homes, and art and oversized furniture wrapped piece by piece."
    },
    {
      "neighborhood": "Sun City Summerlin",
      "description": "Downsize planned around the new floor plan, storage for what doesn't fit, and a steady pace with plenty of check-ins."
    },
    {
      "neighborhood": "New builds in Stonebridge, Redpoint and Kestrel",
      "description": "Scheduled around closing, truck parking planned around construction traffic, and new surfaces protected from the first trip."
    },
    {
      "neighborhood": "Two-story family homes",
      "description": "Beds, kids' rooms and the kitchen staged first so the house works on night one."
    }
  ],

  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    {
      "question": "Do you handle guard-gated Summerlin communities like The Ridges and Red Rock Country Club?",
      "answer": "Yes. Send us the gate contact when you book and we'll get on the access list and confirm any truck or move-hour limits ahead of time."
    },
    {
      "question": "My village HOA and the Summerlin master association both have rules. Which do you follow?",
      "answer": "Both. Many villages have their own association with separate move hours or truck limits, so we check yours when you book."
    },
    {
      "question": "Can you move us into new construction in Stonebridge, Redpoint or Kestrel?",
      "answer": "Yes. Tell us your expected closing time and we'll plan the crew around the key handoff, then protect the new floors and paint before anything comes inside."
    },
    {
      "question": "Do you help Sun City Summerlin residents downsize?",
      "answer": "Yes. We can pack, move what fits the new home, and put the rest into storage until you decide what to keep."
    },
    {
      "question": "Do you move pianos?",
      "answer": "Yes. We move upright and grand pianos with the equipment and protection they need, including in multi-story custom homes."
    },
    {
      "question": "Can you help with packing?",
      "answer": "Yes. We can pack and label by room, then stage the load so unloading and setup go quickly."
    },
    {
      "question": "How far ahead should I book a Summerlin move?",
      "answer": "Two to four weeks is a safe window. Month-end dates and weekends fill first, so book earlier if your date is fixed."
    },
    {
      "question": "What areas of Summerlin do you serve?",
      "answer": "All of Summerlin, including The Ridges, Red Rock Country Club, Tournament Hills, The Mesa, Sun City Summerlin, Stonebridge, Redpoint, Kestrel, The Trails, The Vistas, The Paseos, Summerlin South and nearby Queensridge."
    }
  ],

  zipCodesServed: ["89128", "89134", "89135", "89138", "89144", "89145"],
  
  photoGallery: defaultPhotoGallery.map((item, index) => ({
    ...item,
    caption: `Summerlin move — ${item.caption.toLowerCase()}`
  })),
  
  reviewSnippets: [
    {
      text: "Umbrella Movers handled our Summerlin move with incredible care. They knew exactly how to navigate our gated community and even wrapped our grand piano perfectly!",
      author: "Jennifer M.",
      date: "October 2024"
    },
    {
      text: "After 15 years in The Ridges, we downsized to a smaller Summerlin home. The team was professional, punctual, and treated our antiques like their own.",
      author: "Robert & Lisa T.",
      date: "September 2024"
    },
    {
      text: "Best movers in Summerlin, hands down. They completed our 4-bedroom move in just 6 hours. Highly recommend this woman-owned business!",
      author: "David K.",
      date: "August 2024"
    }
  ],
  
  
  // Specialty neighborhoods that have their own pages
  specialtyNeighborhoods: [
    {
      slug: "sun-city-summerlin",
      name: "Sun City Summerlin",
      teaser: "55+ community specialists with downsizing expertise and patient, senior-focused service."
    },
    {
      slug: "the-ridges",
      name: "The Ridges",
      teaser: "Ultra-luxury estate specialists for Summerlin's most exclusive guard-gated community."
    }
  ],
  
  // Internal linking for SEO
  introLinks: [
    { text: "white-glove service for luxury homes", url: "/services/white-glove-moving", context: "Experience our" },
    { text: "high-rise condo moving", url: "/services/high-rise-moving", context: "We also specialize in" }
  ],
  relatedContent: {
    services: [
      { title: "White Glove Moving", slug: "white-glove-moving" },
      { title: "Local Moving", slug: "local-moving" }
    ],
    locations: [
      { title: "Henderson", slug: "henderson" },
      { title: "Centennial Hills", slug: "centennial-hills" }
    ]
  },
  proofLinks: [
    { text: "customer testimonials", url: "/#testimonials", context: "See our" },
    { text: "woman-owned credentials", url: "/why-choose-us", context: "Verify our" }
  ],
  
  uniqueLocalFrictionSection: {
    "title": "Summerlin Move Logistics We Handle",
    "bullets": [
      "Guard-gate lists plus master and village HOA move rules confirmed ahead of time",
      "Closing-day timing for new construction in Summerlin's western villages",
      "Sun City Summerlin downsizes paced around storage and family pickups"
    ]
  },

  coordinates: { lat: 36.1870, lng: -115.3360 }
};

// ============================================================================
// ANTHEM - WITH PLACEHOLDER CONTENT (TODO: Fill in specifics)
// ============================================================================
const anthemData: LocationPageData = {
  locationName: "Anthem",
  state: "NV",
  slug: "anthem",
  
  proofMovesCount: 400,
  proofYears: 15,
  
  metaTitle: "Anthem Movers | White-Glove Moving Services",
  metaDescription: "Licensed Anthem movers for Anthem Country Club, Sun City Anthem and Madeira Canyon. Guard-gate and HOA coordination handled. Woman-owned and insured.",
  heroTitle: "Anthem Movers",
  heroSubhead: "400+ Anthem moves over the last 15 years — a hospitality-grade, protection-first experience for Anthem Country Club, Sun City Anthem, and Madeira Canyon.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  
  primaryNeighborhoods: ["Anthem Country Club", "Sun City Anthem", "Madeira Canyon", "Solera at Anthem"],
  
  // TODO: Fill in specific neighborhood behaviors for Anthem
  neighborhoodsWithBehaviors: [
    {
      name: "Anthem Country Club",
      behaviors: [
        "Plan around gated entry and club community timing rules",
        "Navigate steep driveways and winding roads with care",
        "Clean, quiet execution with surfaces protected throughout"
      ]
    },
    {
      name: "Sun City Anthem",
      behaviors: [
        "Understand 55+ community requirements and pacing",
        "Patient, respectful handling for senior relocations",
        "Staged loading for efficient, calm unloading"
      ]
    },
    {
      name: "Madeira Canyon & Solera",
      behaviors: [
        "Many communities have HOA timing windows — ask us and we'll confirm requirements",
        "Careful placement with clear communication",
        "Finish with room-by-room placement and walkthrough"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  // TODO: Fill in specific move highlights for Anthem
  moveHighlights: [
    {
      neighborhood: "Anthem Country Club",
      description: "Coordinated gated entry timing and navigated steep driveway with protection-first approach."
    },
    {
      neighborhood: "Sun City Anthem",
      description: "Managed a downsizing move with patient, respectful handling and careful placement."
    },
    {
      neighborhood: "Madeira Canyon",
      description: "Protection-first handling with room-by-room placement and a final walkthrough."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Anthem do you serve?",
      answer: "We serve all of Anthem, with frequent moves in Anthem Country Club, Sun City Anthem, Madeira Canyon, and Solera at Anthem."
    }
  ],
  
  zipCodesServed: ["89052", "89044"],
  
  photoGallery: defaultPhotoGallery.map((item, index) => ({
    ...item,
    caption: `Anthem move — ${item.caption.toLowerCase()}`
  })),
  
  reviewSnippets: [
    {
      text: "Retired to Sun City Anthem and Umbrella Movers made our transition seamless. They understood the 55+ community requirements perfectly.",
      author: "Frank & Diane R.",
      date: "October 2024"
    },
    {
      text: "Best moving experience ever! They navigated Anthem's winding roads and handled our gate access without any issues.",
      author: "Amanda B.",
      date: "September 2024"
    },
    {
      text: "Professional, efficient, and genuinely caring. Our Anthem Country Club neighbors now use them exclusively!",
      author: "Thomas W.",
      date: "August 2024"
    }
  ],
  
  // Unique local friction section for Anthem
  uniqueLocalFrictionSection: {
    title: "Anthem Move Logistics We Handle",
    bullets: [
      "Gated entry coordination with Anthem Country Club and Sun City security",
      "Steep driveway and winding road navigation with protection-first approach",
      "55+ community pacing and senior-focused care for Sun City Anthem moves"
    ]
  },
  
  // Parent location linking back to Henderson
  parentLocation: {
    slug: "henderson",
    name: "Henderson",
    description: "Anthem is one of our Henderson specialty areas — built for gated entry and HOA timing windows."
  },
  
  // Internal linking for SEO
  introLinks: [
    { text: "residential moving services", url: "/services/residential-moving", context: "Anthem families choose our" },
    { text: "piano moving team", url: "/services/piano-moving", context: "Many Anthem homes trust our" }
  ],
  relatedContent: {
    services: [
      { title: "Residential Moving", slug: "residential-moving" },
      { title: "White Glove Moving", slug: "white-glove-moving" }
    ],
    locations: [
      { title: "Henderson", slug: "henderson" },
      { title: "Summerlin", slug: "summerlin" }
    ]
  },
  proofLinks: [
    { text: "protection-first standards", url: "/why-choose-us", context: "Learn about our" },
    { text: "read customer reviews", url: "/#testimonials", context: "See what homeowners say —" }
  ],
  
  coordinates: { lat: 35.9797, lng: -115.0893 }
};

// ============================================================================
// LAS VEGAS - Central Las Vegas
// ============================================================================
const lasVegasData: LocationPageData = {
  locationName: "Las Vegas",
  state: "NV",
  slug: "las-vegas",
  
  proofMovesCount: 1500,
  proofYears: 15,
  
  metaTitle: "Las Vegas Moving Services | Local & White-Glove Movers",
  metaDescription: "Local Las Vegas moving services from a licensed, woman-owned company. 1,500+ valley moves, high-rise and HOA coordination, protection-first crews. Free quotes.",
  heroTitle: "Las Vegas Moving Services",
  heroSubhead: "1,500+ Las Vegas moves over the last 15 years — a hospitality-grade, protection-first experience across the valley.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=1920&q=80",
  
  primaryNeighborhoods: ["Downtown", "The Strip Corridor", "Spring Valley", "Paradise"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Downtown & Arts District",
      behaviors: [
        "Navigate older buildings with narrow hallways and limited elevator access",
        "Coordinate street parking and loading zone permits when needed",
        "Protect original hardwood floors and historic architectural details"
      ]
    },
    {
      name: "Spring Valley & Paradise",
      behaviors: [
        "Handle high-rise condo moves with elevator reservations and timing",
        "Manage gated community access and HOA coordination",
        "Staged loading for efficient multi-story home moves"
      ]
    },
    {
      name: "The Lakes & Desert Shores",
      behaviors: [
        "Plan around waterfront property access and landscaping protection",
        "Navigate community gate timing and security requirements",
        "Protection-first approach for luxury furnishings"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Downtown",
      description: "Coordinated building access and elevator timing for a high-rise loft move with vintage furniture."
    },
    {
      neighborhood: "Spring Valley",
      description: "Managed a large family home with surface protection throughout and staged essentials-first delivery."
    },
    {
      neighborhood: "The Lakes",
      description: "Protection-first handling for waterfront property with careful landscaping navigation."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Las Vegas do you serve?",
      answer: "We serve all of Las Vegas, including Downtown, Spring Valley, Paradise, The Lakes, and the greater metro area."
    }
  ],
  
  zipCodesServed: ["89101", "89102", "89103", "89104", "89106", "89107", "89108", "89109", "89117", "89118", "89119", "89121", "89146", "89147"],
  
  // TODO: Add uniqueLocalFrictionSection for Las Vegas
  // uniqueLocalFrictionSection: {
  //   title: "Las Vegas Move Logistics We Handle",
  //   bullets: [
  //     "Specific Las Vegas friction point 1",
  //     "Specific Las Vegas friction point 2",
  //     "Specific Las Vegas friction point 3"
  //   ]
  // },
  
  reviewSnippets: [
    {
      text: "Moving in Las Vegas during summer heat? Umbrella Movers made it stress-free. They were fast, careful, and kept everything protected.",
      author: "Mark T.",
      date: "October 2024"
    },
    {
      text: "Professional from start to finish. They handled our downtown condo move with care and precision.",
      author: "Rachel & Steve M.",
      date: "September 2024"
    },
    {
      text: "Best movers in Vegas! They knew exactly how to navigate our building's strict move-in requirements.",
      author: "Carlos D.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.1699, lng: -115.1398 }
};

// ============================================================================
// SOUTHERN HIGHLANDS
// ============================================================================
const southernHighlandsData: LocationPageData = {
  locationName: "Southern Highlands",
  state: "NV",
  slug: "southern-highlands",
  
  proofMovesCount: 350,
  proofYears: 15,
  
  metaTitle: "Southern Highlands Movers | Luxury Home Moving",
  metaDescription: "Licensed Southern Highlands movers for the golf club, Olympia Ridge and Roma Hills. Woman-owned, insured, 350+ community moves with protection-first handling.",
  heroTitle: "Southern Highlands Movers",
  heroSubhead: "350+ Southern Highlands moves over the last 15 years — a hospitality-grade, protection-first experience for this premier master-planned community.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  
  primaryNeighborhoods: ["Southern Highlands Golf Club", "Olympia Ridge", "Roma Hills", "Inspirada"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Southern Highlands Golf Club",
      behaviors: [
        "Plan around gated entry and golf course community timing rules",
        "Navigate large custom home layouts with protection-first handling",
        "Coordinate with HOA for move-in documentation requirements"
      ]
    },
    {
      name: "Olympia Ridge & Roma Hills",
      behaviors: [
        "Handle multi-story luxury homes with careful stairway navigation",
        "Protect designer flooring and high-end finishes throughout",
        "Staged loading for efficient, organized unloading"
      ]
    },
    {
      name: "Inspirada & Mountains Edge Adjacent",
      behaviors: [
        "Many communities have specific HOA timing windows — we confirm requirements ahead",
        "Careful placement with clear communication throughout the move",
        "Finish with room-by-room placement and walkthrough"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Southern Highlands Golf Club",
      description: "Coordinated gated entry and staged the load for a custom home overlooking the golf course."
    },
    {
      neighborhood: "Olympia Ridge",
      description: "Managed a three-story home with careful stairway protection and room-by-room placement."
    },
    {
      neighborhood: "Roma Hills",
      description: "Protection-first handling for high-end furnishings with final walkthrough."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Southern Highlands do you serve?",
      answer: "We serve all of Southern Highlands, including the Golf Club community, Olympia Ridge, Roma Hills, and nearby Inspirada."
    }
  ],
  
  zipCodesServed: ["89141", "89178", "89179"],
  
  // TODO: Add uniqueLocalFrictionSection for Southern Highlands
  
  reviewSnippets: [
    {
      text: "Moving into Southern Highlands Golf Club was seamless. They handled the gate access and HOA requirements perfectly.",
      author: "Linda P.",
      date: "October 2024"
    },
    {
      text: "Our three-story home in Olympia Ridge was a challenge, but Umbrella Movers made it look easy. Highly professional!",
      author: "James & Michelle K.",
      date: "September 2024"
    },
    {
      text: "White-glove service that lives up to its name. They protected every surface and placed everything exactly where we wanted.",
      author: "Sandra W.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.0108, lng: -115.2831 }
};

// ============================================================================
// ALIANTE
// ============================================================================
const alianteData: LocationPageData = {
  locationName: "Aliante",
  state: "NV",
  slug: "aliante",
  
  proofMovesCount: 300,
  proofYears: 15,
  
  metaTitle: "Aliante Movers | North Las Vegas Moving Company",
  metaDescription: "Licensed Aliante movers serving North Las Vegas. Woman-owned, insured, 300+ Aliante moves with protection-first handling and clear scheduling. Free quotes.",
  heroTitle: "Aliante Movers",
  heroSubhead: "300+ Aliante moves over the last 15 years — a hospitality-grade, protection-first experience for North Las Vegas's premier community.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  
  primaryNeighborhoods: ["Aliante Golf Club", "Aliante Nature Discovery Park Area", "El Dorado"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Aliante Golf Club & Casino Area",
      behaviors: [
        "Navigate master-planned community streets and cul-de-sacs",
        "Handle single and two-story family homes with care",
        "Protect flooring and common areas throughout the move"
      ]
    },
    {
      name: "Nature Discovery Park Area",
      behaviors: [
        "Manage moves near park areas with parking coordination",
        "Staged loading for family-sized homes",
        "Clear communication and room-by-room placement"
      ]
    },
    {
      name: "El Dorado & North Las Vegas Adjacent",
      behaviors: [
        "Coordinate access for newer construction communities",
        "Careful placement with detailed labeling",
        "Final walkthrough to confirm complete satisfaction"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Aliante Golf Club",
      description: "Efficiently handled a family move with multi-room staging and protection throughout."
    },
    {
      neighborhood: "Nature Discovery Park Area",
      description: "Managed tight street parking and coordinated a two-story home move with care."
    },
    {
      neighborhood: "El Dorado",
      description: "Protection-first handling with essentials-first delivery for a same-day setup."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Aliante do you serve?",
      answer: "We serve all of Aliante and the surrounding North Las Vegas communities, including near the Golf Club and Nature Discovery Park."
    }
  ],
  
  zipCodesServed: ["89084", "89085", "89086"],
  
  // TODO: Add uniqueLocalFrictionSection for Aliante
  
  reviewSnippets: [
    {
      text: "Moving to Aliante was a breeze with Umbrella Movers. They were on time, efficient, and so careful with our furniture.",
      author: "Tony & Maria G.",
      date: "October 2024"
    },
    {
      text: "Great experience! The team knew the Aliante area well and handled our two-story home move perfectly.",
      author: "Derek S.",
      date: "September 2024"
    },
    {
      text: "Professional and friendly. They made our move into this beautiful community stress-free.",
      author: "Nancy L.",
      date: "August 2024"
    }
  ],
  
  parentLocation: {
    "slug": "north-las-vegas",
    "name": "North Las Vegas",
    "description": "Aliante is one of North Las Vegas's master-planned communities."
  },

  coordinates: { lat: 36.2819, lng: -115.1256 }
};

// ============================================================================
// CENTENNIAL HILLS
// ============================================================================
const centennialHillsData: LocationPageData = {
  locationName: "Centennial Hills",
  state: "NV",
  slug: "centennial-hills",
  
  proofMovesCount: 400,
  proofYears: 15,
  
  metaTitle: "Centennial Hills Movers | Northwest Las Vegas",
  metaDescription: "Licensed Centennial Hills movers for Providence, Skye Canyon and Lone Mountain. Woman-owned, insured, 400+ northwest Las Vegas moves. Get a free quote.",
  heroTitle: "Centennial Hills Movers",
  heroSubhead: "400+ Centennial Hills moves over the last 15 years — a hospitality-grade, protection-first experience for Northwest Las Vegas.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
  
  primaryNeighborhoods: ["Providence", "Skye Canyon", "Tule Springs"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Providence & Skye Canyon",
      behaviors: [
        "Navigate newer master-planned communities with HOA coordination",
        "Handle multi-story homes with careful stairway protection",
        "Protect premium flooring and finishes in newer construction"
      ]
    },
    {
      name: "Tule Springs & Surrounding Areas",
      behaviors: [
        "Manage moves in family-oriented neighborhoods",
        "Staged loading for efficient delivery and setup",
        "Room-by-room placement with detailed communication"
      ]
    },
    {
      name: "Lone Mountain & North Ranch",
      behaviors: [
        "Handle larger lot properties with longer carries",
        "Protect landscaping and driveways during the move",
        "Final walkthrough to ensure complete satisfaction"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Skye Canyon",
      description: "Coordinated HOA timing and managed a new construction move with protection throughout."
    },
    {
      neighborhood: "Providence",
      description: "Handled a large family home with staged loading and essentials-first delivery."
    },
    {
      neighborhood: "Tule Springs",
      description: "Protection-first handling for a multi-story home with careful stairway navigation."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Centennial Hills do you serve?",
      answer: "We serve all of Centennial Hills, including Providence, Skye Canyon, Tule Springs, and the greater Northwest Las Vegas area."
    }
  ],
  
  zipCodesServed: ["89130", "89131", "89143", "89149", "89166"],
  
  // TODO: Add uniqueLocalFrictionSection for Centennial Hills
  
  reviewSnippets: [
    {
      text: "Just moved to Skye Canyon and Umbrella Movers exceeded expectations. They handled our brand new home with care!",
      author: "Ashley & Ryan B.",
      date: "October 2024"
    },
    {
      text: "Professional team that knew exactly how to navigate our Providence community. Highly recommend!",
      author: "Greg M.",
      date: "September 2024"
    },
    {
      text: "Moving with kids is stressful, but they made it so easy. Everything placed exactly where we wanted.",
      author: "Stephanie K.",
      date: "August 2024"
    }
  ],
  
  // Internal linking for SEO
  introLinks: [
    { text: "local moving experts", url: "/services/local-moving", context: "Centennial Hills families rely on our" },
    { text: "residential moving services", url: "/services/residential-moving", context: "Learn more about our" }
  ],
  relatedContent: {
    services: [
      { title: "Local Moving", slug: "local-moving" },
      { title: "Residential Moving", slug: "residential-moving" }
    ],
    locations: [
      { title: "Summerlin", slug: "summerlin" },
      { title: "Henderson", slug: "henderson" }
    ]
  },
  proofLinks: [
    { text: "customer testimonials", url: "/#testimonials", context: "Read" },
    { text: "our protection-first process", url: "/why-choose-us", context: "See" }
  ],
  
  coordinates: { lat: 36.2706, lng: -115.2491 }
};

// ============================================================================
// MACDONALD HIGHLANDS
// ============================================================================
const macdonaldHighlandsData: LocationPageData = {
  locationName: "MacDonald Highlands",
  state: "NV",
  slug: "macdonald-highlands",
  
  proofMovesCount: 150,
  proofYears: 15,
  
  metaTitle: "MacDonald Highlands Movers | Luxury Moving",
  metaDescription: "Licensed MacDonald Highlands movers for DragonRidge and hillside estates. Guard-gate coordination, floor and wall protection, same crew start to finish.",
  heroTitle: "MacDonald Highlands Movers",
  heroSubhead: "150+ MacDonald Highlands moves over the last 15 years — a hospitality-grade, protection-first experience for Henderson's most exclusive community.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  
  primaryNeighborhoods: ["DragonRidge Country Club", "MacDonald Highlands Estates", "The Summit"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "DragonRidge Country Club",
      behaviors: [
        "Navigate steep hillside driveways with specialized equipment when needed",
        "Coordinate with country club security for gate access and timing",
        "Protection-first handling for luxury custom home furnishings"
      ]
    },
    {
      name: "MacDonald Highlands Estates",
      behaviors: [
        "Handle panoramic view homes with floor-to-ceiling window protection",
        "Manage large-scale moves with multiple trucks when required",
        "Careful placement of high-value art and collectibles"
      ]
    },
    {
      name: "The Summit & Ridgeline",
      behaviors: [
        "Navigate winding mountain roads with care",
        "Protect premium finishes and custom architectural details",
        "Final walkthrough with detailed placement confirmation"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "DragonRidge",
      description: "Managed a hillside estate move with specialized protection for a wine collection and fine art."
    },
    {
      neighborhood: "MacDonald Highlands Estates",
      description: "Coordinated a two-truck move for a 10,000 sq ft custom home with meticulous care."
    },
    {
      neighborhood: "The Summit",
      description: "Protection-first handling for designer furniture with panoramic view home placement."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of MacDonald Highlands do you serve?",
      answer: "We serve all of MacDonald Highlands, including DragonRidge Country Club, the Estates, The Summit, and surrounding luxury communities."
    }
  ],
  
  zipCodesServed: ["89012"],
  
  uniqueLocalFrictionSection: {
    title: "MacDonald Highlands Move Logistics We Handle",
    bullets: [
      "Steep hillside driveways and winding mountain road navigation",
      "DragonRidge Country Club security coordination and access timing",
      "High-value art, wine collection, and luxury furnishing protection"
    ]
  },
  
  parentLocation: {
    slug: "henderson",
    name: "Henderson",
    description: "MacDonald Highlands is one of Henderson's most exclusive communities — built for luxury hillside living."
  },
  
  reviewSnippets: [
    {
      text: "Moving to MacDonald Highlands requires expertise, and Umbrella Movers delivered. They handled our hillside driveway like pros!",
      author: "Patricia S.",
      date: "November 2024"
    },
    {
      text: "Our DragonRidge home move was flawless. They coordinated with security, protected everything, and finished on time.",
      author: "Richard & Ellen M.",
      date: "October 2024"
    },
    {
      text: "True white-glove service. They treated our custom furniture and art collection with exceptional care.",
      author: "Jonathan H.",
      date: "September 2024"
    }
  ],
  
  coordinates: { lat: 36.0089, lng: -114.9683 }
};

// ============================================================================
// GREEN VALLEY RANCH
// ============================================================================
const greenValleyRanchData: LocationPageData = {
  locationName: "Green Valley Ranch",
  state: "NV",
  slug: "green-valley-ranch",
  
  proofMovesCount: 450,
  proofYears: 15,
  
  metaTitle: "Green Valley Ranch Movers | Henderson Moving",
  metaDescription: "Licensed Green Valley Ranch movers serving Henderson families. Woman-owned, insured, 450+ GVR moves with protection-first handling. Get a free quote.",
  heroTitle: "Green Valley Ranch Movers",
  heroSubhead: "450+ Green Valley Ranch moves over the last 15 years — a hospitality-grade, protection-first experience for Henderson's family-friendly community.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
  
  primaryNeighborhoods: ["Green Valley Ranch Resort Area", "The Paseos", "Tuscany"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Green Valley Ranch Resort Area",
      behaviors: [
        "Navigate established neighborhood streets with care",
        "Handle single and two-story family homes efficiently",
        "Protect mature landscaping and driveways"
      ]
    },
    {
      name: "The Paseos & Whitney Ranch",
      behaviors: [
        "Coordinate HOA timing for community common areas",
        "Staged loading for multi-story homes",
        "Room-by-room placement with family-focused care"
      ]
    },
    {
      name: "Tuscany & Silver Springs",
      behaviors: [
        "Manage tighter residential corners and cul-de-sacs",
        "Protect high-traffic flooring throughout the move",
        "Final walkthrough with detailed confirmation"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Green Valley Ranch",
      description: "Managed a large family home move with children's furniture prioritized for same-day setup."
    },
    {
      neighborhood: "The Paseos",
      description: "Coordinated HOA timing and handled a two-story move with complete surface protection."
    },
    {
      neighborhood: "Tuscany",
      description: "Protection-first handling through narrow streets with careful placement throughout."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Green Valley Ranch do you serve?",
      answer: "We serve all of Green Valley Ranch, including areas near the Resort, The Paseos, Whitney Ranch, Tuscany, and Silver Springs."
    }
  ],
  
  zipCodesServed: ["89012", "89014", "89052"],
  
  parentLocation: {
    slug: "henderson",
    name: "Henderson",
    description: "Green Valley Ranch is one of Henderson's established family communities — known for excellent schools and amenities."
  },
  
  // TODO: Add uniqueLocalFrictionSection for Green Valley Ranch
  
  reviewSnippets: [
    {
      text: "Moving with three kids is chaos, but Umbrella Movers made it organized. Kids' rooms were set up first!",
      author: "Jennifer & Matt P.",
      date: "October 2024"
    },
    {
      text: "They knew Green Valley Ranch perfectly. Quick, efficient, and so careful with our belongings.",
      author: "Lisa R.",
      date: "September 2024"
    },
    {
      text: "Professional from quote to final walkthrough. This is how moving should be done.",
      author: "Brian D.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.0353, lng: -115.0628 }
};

// ============================================================================
// SUNRISE MANOR
// ============================================================================
const sunriseManorData: LocationPageData = {
  locationName: "Sunrise Manor",
  state: "NV",
  slug: "sunrise-manor",
  
  proofMovesCount: 350,
  proofYears: 15,
  
  metaTitle: "Sunrise Manor Movers | East Las Vegas Moving",
  metaDescription: "Licensed Sunrise Manor movers serving East Las Vegas. Woman-owned, insured, 350+ local moves with protection-first handling and clear scheduling.",
  heroTitle: "Sunrise Manor Movers",
  heroSubhead: "350+ Sunrise Manor moves over the last 15 years — a hospitality-grade, protection-first experience for East Las Vegas.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80",
  
  primaryNeighborhoods: ["Nellis AFB Area", "Sunrise Mountain", "Frenchman Mountain Area"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Nellis AFB Area",
      behaviors: [
        "Experience with military PCS moves and timing requirements",
        "Handle base housing transitions with efficiency",
        "Coordinate with military schedules and documentation needs"
      ]
    },
    {
      name: "Sunrise Mountain & East Side",
      behaviors: [
        "Navigate established neighborhoods with care",
        "Handle single-story and ranch-style homes",
        "Protect flooring and doorways throughout"
      ]
    },
    {
      name: "Frenchman Mountain Area",
      behaviors: [
        "Manage moves with mountain view properties",
        "Staged loading for efficient unloading",
        "Room-by-room placement with clear communication"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Nellis AFB Area",
      description: "Handled a military PCS move with tight timing and complete documentation coordination."
    },
    {
      neighborhood: "Sunrise Mountain",
      description: "Managed an established home move with vintage furniture protection."
    },
    {
      neighborhood: "East Las Vegas",
      description: "Protection-first handling for a family relocation with same-day essentials setup."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "Do you handle military PCS moves?",
      answer: "Yes — we have experience with Nellis AFB moves and understand military timing and documentation requirements."
    },
    {
      question: "What areas of Sunrise Manor do you serve?",
      answer: "We serve all of Sunrise Manor and East Las Vegas, including areas near Nellis AFB and Sunrise Mountain."
    }
  ],
  
  zipCodesServed: ["89110", "89115", "89121", "89122", "89142", "89156"],
  
  // TODO: Add uniqueLocalFrictionSection for Sunrise Manor
  
  reviewSnippets: [
    {
      text: "PCS moves are stressful, but Umbrella Movers made our Nellis transition smooth. They understood our timeline perfectly.",
      author: "Capt. Marcus & Sarah J.",
      date: "October 2024"
    },
    {
      text: "Great local movers who know the East Las Vegas area. Fast, careful, and affordable.",
      author: "Robert C.",
      date: "September 2024"
    },
    {
      text: "Moved my elderly mother with care and patience. They treated her belongings like treasures.",
      author: "Diana M.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.1761, lng: -115.0305 }
};

// ============================================================================
// MOUNTAINS EDGE
// ============================================================================
const mountainsEdgeData: LocationPageData = {
  locationName: "Mountains Edge",
  state: "NV",
  slug: "mountains-edge",
  
  proofMovesCount: 400,
  proofYears: 12,
  
  metaTitle: "Mountains Edge Movers | Southwest Las Vegas",
  metaDescription: "Licensed Mountains Edge movers serving Southwest Las Vegas. Woman-owned, insured, 400+ local moves with protection-first handling. Get a free quote.",
  heroTitle: "Mountains Edge Movers",
  heroSubhead: "400+ Mountains Edge moves over the last 12 years — a hospitality-grade, protection-first experience for Southwest Las Vegas.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80",
  
  primaryNeighborhoods: ["Mountains Edge Master Planned", "Vistas at Mountains Edge", "Reverence"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Mountains Edge Master Planned Community",
      behaviors: [
        "Navigate the expansive master-planned community layout",
        "Coordinate with HOA for move timing and requirements",
        "Handle modern two-story homes with newer construction care"
      ]
    },
    {
      name: "Vistas at Mountains Edge",
      behaviors: [
        "Manage moves with mountain and city views",
        "Protect upgraded finishes common in newer construction",
        "Staged loading for large family homes"
      ]
    },
    {
      name: "Reverence & Enterprise Area",
      behaviors: [
        "Handle luxury community moves with HOA coordination",
        "Careful protection for high-end furnishings",
        "Final walkthrough with detailed placement"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Mountains Edge",
      description: "Managed a new construction move with builder walkthrough coordination and protection throughout."
    },
    {
      neighborhood: "Vistas",
      description: "Handled a mountain view home with careful window and flooring protection."
    },
    {
      neighborhood: "Reverence",
      description: "Protection-first handling for luxury community move with HOA timing coordination."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "What areas of Mountains Edge do you serve?",
      answer: "We serve all of Mountains Edge, including the master-planned community, Vistas, and nearby Reverence and Enterprise areas."
    }
  ],
  
  zipCodesServed: ["89141", "89178", "89179", "89148"],
  
  // TODO: Add uniqueLocalFrictionSection for Mountains Edge
  
  reviewSnippets: [
    {
      text: "Brand new home in Mountains Edge and they treated it with such care. No scuffs, no scratches. Perfect!",
      author: "Amanda & Chris L.",
      date: "October 2024"
    },
    {
      text: "Great experience moving to the Vistas. They navigated our neighborhood perfectly and finished ahead of schedule.",
      author: "Kevin T.",
      date: "September 2024"
    },
    {
      text: "Woman-owned business that delivers! Our Mountains Edge move was smooth from start to finish.",
      author: "Laura S.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.0030, lng: -115.2450 }
};

// ============================================================================
// SUN CITY SUMMERLIN
// ============================================================================
const sunCitySummerlinData: LocationPageData = {
  locationName: "Sun City Summerlin",
  state: "NV",
  slug: "sun-city-summerlin",
  
  proofMovesCount: 500,
  proofYears: 15,
  
  metaTitle: "Sun City Summerlin Movers | Senior Moving Specialists",
  metaDescription: "Licensed Sun City Summerlin movers experienced with active-adult community moves and downsizing. Woman-owned, insured, 500+ Sun City moves.",
  heroTitle: "Sun City Summerlin Movers",
  heroSubhead: "500+ Sun City Summerlin moves over the last 15 years — a hospitality-grade, protection-first experience for active adult living.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for 55+ communities, downsizing needs, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and patient execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80",
  
  primaryNeighborhoods: ["Sun City Golf Courses", "Highland Falls", "Palm Valley"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Sun City Summerlin Community",
      behaviors: [
        "Understand 55+ community requirements and gate access procedures",
        "Patient, respectful handling with senior-focused pacing",
        "Experience with downsizing moves and storage coordination"
      ]
    },
    {
      name: "Highland Falls & Palm Valley",
      behaviors: [
        "Navigate golf course community layouts",
        "Handle single-story homes with accessibility considerations",
        "Careful protection for antiques and heirlooms"
      ]
    },
    {
      name: "Eagle Crest & Desert Vista",
      behaviors: [
        "Coordinate with community security for move timing",
        "Staged loading for efficient, calm delivery",
        "Room-by-room placement with detailed walkthrough"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Sun City Summerlin",
      description: "Managed a downsizing move with storage coordination and patient pacing."
    },
    {
      neighborhood: "Highland Falls",
      description: "Handled antique furniture with specialized protection and careful placement."
    },
    {
      neighborhood: "Palm Valley",
      description: "Protection-first handling for a 55+ transition with accessibility considerations."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "Do you specialize in senior and 55+ moves?",
      answer: "Yes — we have extensive experience with Sun City Summerlin and understand the unique needs of active adult communities, including downsizing and patient pacing."
    },
    {
      question: "What areas of Sun City Summerlin do you serve?",
      answer: "We serve all of Sun City Summerlin, including Highland Falls, Palm Valley, Eagle Crest, and Desert Vista."
    }
  ],
  
  zipCodesServed: ["89134", "89144"],
  
  uniqueLocalFrictionSection: {
    title: "Sun City Summerlin Move Logistics We Handle",
    bullets: [
      "55+ community gate access and timing coordination",
      "Downsizing moves with storage coordination",
      "Antique and heirloom handling with specialized protection"
    ]
  },
  
  parentLocation: {
    slug: "summerlin",
    name: "Summerlin",
    description: "Sun City Summerlin is one of Summerlin's premier 55+ active adult communities."
  },
  
  reviewSnippets: [
    {
      text: "Downsizing after 30 years was emotional, but Umbrella Movers made it so much easier. Patient, kind, and professional.",
      author: "George & Mary W.",
      date: "October 2024"
    },
    {
      text: "They understand senior moves. No rushing, careful handling, and they placed everything exactly where I wanted.",
      author: "Barbara H.",
      date: "September 2024"
    },
    {
      text: "My mother's antiques were treated like museum pieces. Exceptional care and attention to detail.",
      author: "Tom L.",
      date: "August 2024"
    }
  ],
  
  coordinates: { lat: 36.2054, lng: -115.2954 }
};

// ============================================================================
// THE RIDGES
// ============================================================================
const theRidgesData: LocationPageData = {
  locationName: "The Ridges",
  state: "NV",
  slug: "the-ridges",
  
  proofMovesCount: 120,
  proofYears: 15,
  
  metaTitle: "The Ridges Movers | Luxury Moving in Summerlin",
  metaDescription: "Licensed movers for The Ridges in Summerlin. Guard-gate coordination, floor and wall protection, art and specialty handling, same crew start to finish.",
  heroTitle: "The Ridges Movers",
  heroSubhead: "120+ Ridges moves over the last 15 years — a hospitality-grade, protection-first experience for Summerlin's most exclusive guard-gated community.",
  introParagraph: "At Umbrella Movers, we don't \"just move boxes.\" We manage your transition with a calm, professional process built for high-standard homes, tight schedules, and detail-oriented clients. Our white-glove approach focuses on protection, planning, and clean execution — so move day feels controlled from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  
  primaryNeighborhoods: ["Bear's Best", "The Promontory", "Silver Ridge", "Azure"],
  
  neighborhoodsWithBehaviors: [
    {
      name: "Bear's Best & The Promontory",
      behaviors: [
        "Coordinate with 24-hour guard gate security for access and timing",
        "Handle ultra-luxury custom homes with museum-quality care",
        "Protect designer finishes, custom millwork, and rare materials"
      ]
    },
    {
      name: "Silver Ridge & Cloud Chaser",
      behaviors: [
        "Navigate celebrity-caliber privacy requirements",
        "Multi-truck coordination for large estate moves",
        "Careful handling of high-value art and collections"
      ]
    },
    {
      name: "Azure & The Pointe",
      behaviors: [
        "Handle modern architectural homes with glass and steel protection",
        "Coordinate with interior designers for precise placement",
        "Final walkthrough with detailed documentation"
      ]
    }
  ],
  
  umbrellaStandard: defaultUmbrellaStandard,
  
  moveHighlights: [
    {
      neighborhood: "Bear's Best",
      description: "Managed a multi-million dollar estate move with art handlers and climate-controlled transport coordination."
    },
    {
      neighborhood: "The Promontory",
      description: "Coordinated a three-truck move for a custom home with designer placement throughout."
    },
    {
      neighborhood: "Azure",
      description: "Protection-first handling for contemporary architecture with floor-to-ceiling glass protection."
    }
  ],
  
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  
  faqItems: [
    ...defaultFAQItems,
    {
      question: "Do you handle luxury estate moves?",
      answer: "Yes — The Ridges is our specialty. We coordinate with security, manage multi-truck moves, and provide museum-quality handling for high-value items."
    },
    {
      question: "What areas of The Ridges do you serve?",
      answer: "We serve all neighborhoods within The Ridges, including Bear's Best, The Promontory, Silver Ridge, Azure, Cloud Chaser, and The Pointe."
    }
  ],
  
  zipCodesServed: ["89135"],
  
  uniqueLocalFrictionSection: {
    title: "The Ridges Move Logistics We Handle",
    bullets: [
      "24-hour guard gate security coordination and multi-day access planning",
      "Multi-truck coordination for 10,000+ sq ft custom estate moves",
      "Art collection and high-value item handling with insurance coordination"
    ]
  },
  
  parentLocation: {
    slug: "summerlin",
    name: "Summerlin",
    description: "The Ridges is Summerlin's most exclusive guard-gated community — home to custom estates and celebrity residences."
  },
  
  reviewSnippets: [
    {
      text: "Moving in The Ridges requires a special level of service, and Umbrella Movers delivered beyond expectations.",
      author: "Anonymous Resident",
      date: "November 2024"
    },
    {
      text: "They coordinated with our interior designer, handled our art collection with care, and finished exactly on schedule.",
      author: "Victoria & Charles P.",
      date: "October 2024"
    },
    {
      text: "True white-glove service. Our estate move was flawless from security coordination to final placement.",
      author: "William R.",
      date: "September 2024"
    }
  ],
  
  coordinates: { lat: 36.1596, lng: -115.3272 }
};

// ============================================================================
// EXPORT ALL LOCATION DATA
// ============================================================================
// ============================================================================
// NORTH LAS VEGAS
// ============================================================================
const northLasVegasData: LocationPageData = {
  locationName: "North Las Vegas",
  state: "NV",
  slug: "north-las-vegas",

  // 300 matches the existing Aliante claim (Aliante is part of North Las Vegas)
  proofMovesCount: 300,
  proofYears: 15,

  metaTitle: "North Las Vegas Movers | Local & Commercial Moving",
  metaDescription: "Licensed North Las Vegas movers for Aliante, Eldorado, Tule Springs and Craig Ranch. Woman-owned, WBENC certified, insured. Homes, apartments and warehouses.",
  heroTitle: "North Las Vegas Movers",
  heroSubhead: "Home, apartment and commercial moves across North Las Vegas, from Aliante and Eldorado to the warehouses along I-15.",
  introParagraph: "North Las Vegas is its own city, and it keeps growing: new subdivisions keep opening on the north side, established neighborhoods sit around Craig Ranch Regional Park, and the industrial areas along I-15 keep adding warehouse space. So our crews here do a bit of everything, from first homes and apartment moves to office and warehouse relocations. We confirm HOA rules, parking and dock access before move day, and the same crew stays with your move from start to finish.",
  heroImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80",
  primaryNeighborhoods: [
    "Aliante",
    "Eldorado",
    "Tule Springs",
    "Craig Ranch",
    "Nellis area"
  ],
  neighborhoodsWithBehaviors: [
    {
      "name": "Aliante & Eldorado",
      "behaviors": [
        "HOA rules on truck parking and move hours confirmed ahead of time",
        "Single and two-story family homes staged so beds and the kitchen come off first",
        "Garages, side yards and patio furniture planned into the load list"
      ]
    },
    {
      "name": "Tule Springs & new north-side subdivisions",
      "behaviors": [
        "Closing-day moves scheduled around when you actually get keys",
        "New flooring and fresh paint protected before anything comes inside",
        "Truck parking planned around construction traffic and unfinished streets"
      ]
    },
    {
      "name": "Craig Ranch & central North Las Vegas",
      "behaviors": [
        "Established neighborhoods and apartment communities where parking is tighter",
        "Apartment moves planned around stairs, elevators and leasing-office rules",
        "Short moves across town or into Las Vegas handled in a single day when the size allows"
      ]
    },
    {
      "name": "Near Nellis Air Force Base",
      "behaviors": [
        "Moves scheduled around report dates and housing timelines",
        "Storage when the dates between homes don't line up",
        "Boxes labeled by room so unpacking starts right away"
      ]
    },
    {
      "name": "I-15 and Speedway industrial areas",
      "behaviors": [
        "Warehouse and office moves scheduled around shifts and dock times",
        "Racking, inventory and office furniture moved and set up",
        "Loading and unloading labor for freight and containers"
      ]
    }
  ],
  umbrellaStandard: defaultUmbrellaStandard,
  moveHighlights: [
    {
      "neighborhood": "Aliante family homes",
      "description": "HOA parking rules confirmed ahead, beds and kitchen boxes unloaded first, and a final walkthrough of every room."
    },
    {
      "neighborhood": "New construction on the north side",
      "description": "Crew scheduled around the key handoff, new floors protected, and garage items placed last."
    },
    {
      "neighborhood": "Military families near Nellis",
      "description": "Move timed around the report date, with storage in between if the new home isn't ready yet."
    },
    {
      "neighborhood": "Warehouse and office moves along I-15",
      "description": "Dock times and shift changes planned in advance, with racking and office furniture set up at the new space."
    }
  ],
  whiteGloveIncludes: defaultWhiteGloveIncludes,
  faqItems: [
    {
      "question": "Is North Las Vegas a different city from Las Vegas?",
      "answer": "Yes. North Las Vegas is its own city with its own neighborhoods and HOAs. We move people within North Las Vegas, into and out of it, and anywhere else in the valley."
    },
    {
      "question": "Do you move to and from Aliante, Eldorado and Tule Springs?",
      "answer": "Yes. Tell us your HOA when you book and we'll confirm any truck parking or move-hour rules ahead of time."
    },
    {
      "question": "Can you move us into a new build on closing day?",
      "answer": "Yes. Tell us the expected closing time and we'll plan the crew around when you actually have keys. If closing slips, we'll work with you on the new time."
    },
    {
      "question": "Do you work with military families at Nellis?",
      "answer": "Yes. If you're arranging your own move, we can schedule around your report date and store your things if the timing between homes doesn't line up."
    },
    {
      "question": "Do you do commercial and warehouse moves in North Las Vegas?",
      "answer": "Yes. We move offices, warehouses and retail spaces, and we provide loading and unloading labor for freight and containers."
    },
    {
      "question": "Do you offer storage?",
      "answer": "Yes. If your move-out and move-in dates don't line up, we can store your belongings until the new place is ready."
    },
    {
      "question": "How far ahead should I book a North Las Vegas move?",
      "answer": "Two to four weeks is a safe window. Month-end dates and weekends fill first, so book earlier if your date is fixed."
    },
    {
      "question": "What areas of North Las Vegas do you serve?",
      "answer": "All of North Las Vegas, including Aliante, Eldorado, Tule Springs, Craig Ranch, the neighborhoods near Nellis, and the industrial areas along I-15."
    }
  ],
  zipCodesServed: [
    "89030",
    "89031",
    "89032",
    "89081",
    "89084",
    "89085",
    "89086"
  ],
  uniqueLocalFrictionSection: {
    "title": "North Las Vegas Move Logistics We Handle",
    "bullets": [
      "HOA parking and move-hour rules in Aliante, Eldorado and the newer north-side communities",
      "Closing-day timing for new construction across the north side",
      "Dock times and shift schedules for warehouse moves along I-15"
    ]
  },
  specialtyNeighborhoods: [
    {
      "slug": "aliante",
      "name": "Aliante",
      "teaser": "Master-planned community moves with HOA parking and timing handled ahead of time."
    }
  ],
  introLinks: [
    {
      "text": "commercial moving",
      "url": "/services/commercial-moving",
      "context": "Moving a business? See our"
    },
    {
      "text": "storage",
      "url": "/services/storage-solutions",
      "context": "Need time between homes? Ask about"
    }
  ],
  relatedContent: {
    "services": [
      {
        "title": "Commercial Moving",
        "slug": "commercial-moving"
      },
      {
        "title": "Local Moving",
        "slug": "local-moving"
      }
    ],
    "locations": [
      {
        "title": "Aliante",
        "slug": "aliante"
      },
      {
        "title": "Centennial Hills",
        "slug": "centennial-hills"
      }
    ]
  },
  proofLinks: [
    {
      "text": "verified customer reviews",
      "url": "/#testimonials",
      "context": "Read"
    },
    {
      "text": "licensed credentials",
      "url": "/why-choose-us",
      "context": "Verify our"
    }
  ],
  coordinates: { lat: 36.1989, lng: -115.1175 }
};

export const locationPagesData: Record<string, LocationPageData> = {
  henderson: hendersonData,
  summerlin: summerlinData,
  anthem: anthemData,
  "las-vegas": lasVegasData,
  "southern-highlands": southernHighlandsData,
  aliante: alianteData,
  "centennial-hills": centennialHillsData,
  "macdonald-highlands": macdonaldHighlandsData,
  "green-valley-ranch": greenValleyRanchData,
  "sunrise-manor": sunriseManorData,
  "mountains-edge": mountainsEdgeData,
  "sun-city-summerlin": sunCitySummerlinData,
  "the-ridges": theRidgesData,
  "north-las-vegas": northLasVegasData,
};

// Helper to get location data with fallback
export function getLocationPageData(slug: string): LocationPageData | null {
  return locationPagesData[slug] || null;
}

// Export defaults for use in other locations
export { defaultUmbrellaStandard, defaultWhiteGloveIncludes, defaultFAQItems, defaultPhotoGallery };
