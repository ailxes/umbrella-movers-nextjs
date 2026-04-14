export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  text: string;
  url: string;
  context?: string; // Optional context sentence to wrap the link
}

export interface RelatedContent {
  services?: { title: string; slug: string }[];
  locations?: { title: string; slug: string }[];
}

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  content: {
    intro: string;
    introLinks?: InternalLink[]; // Links to embed in intro paragraph
    features: string[];
    process: {
      title: string;
      description: string;
    }[];
    additionalInfo?: string;
    additionalInfoLinks?: InternalLink[]; // Links to embed in additional info
    faqs?: FAQItem[];
  };
  relatedContent?: RelatedContent;
  proofLinks?: InternalLink[]; // E-E-A-T proof links
}

export const servicesData: Record<string, ServiceData> = {
  "residential-moving": {
    slug: "residential-moving",
    title: "Residential Moving",
    shortDescription: "Full-service home moving with professional packing, careful handling, and the same trusted team from start to finish.",
    image: "/images/residential-moving.jpg",
    heroImage: "/images/residential-moving.jpg",
    metaTitle: "Residential Moving Services Las Vegas | Umbrella Movers",
    metaDescription: "Professional residential moving services in Las Vegas. Woman-owned, fully licensed & insured. Same team loads & unloads. Get your free quote today!",
    content: {
      intro: "Moving to a new home should be exciting, not stressful. At Umbrella Movers, our residential moving services are designed to give you peace of mind from the moment we arrive until the last box is placed in your new home. As a WBENC-certified woman-owned business with over 15 years of experience, we treat your belongings like our own.",
      introLinks: [
        { text: "woman-owned credentials", url: "/why-choose-us", context: "Learn more about our" }
      ],
      features: [
        "Professional packing services or self-pack options",
        "Same team loads and unloads – no subcontractors",
        "Fully licensed, insured, and bonded (CPCN 3364)",
        "Transparent pricing with no hidden fees",
        "Careful handling of fragile and valuable items",
        "Furniture disassembly and reassembly included",
        "Floor and doorway protection"
      ],
      process: [
        {
          title: "Free Consultation",
          description: "We start with a detailed assessment of your moving needs, providing an accurate quote with no surprises."
        },
        {
          title: "Packing & Preparation",
          description: "Choose our professional packing service or pack yourself. We provide quality materials and expert guidance."
        },
        {
          title: "Moving Day",
          description: "Our experienced team arrives on time, handles your belongings with care, and communicates throughout the process."
        },
        {
          title: "Delivery & Setup",
          description: "We place furniture and boxes exactly where you want them and can assist with basic setup in your new home."
        }
      ],
      additionalInfo: "Whether you're moving across the street or across town, our residential moving team has the expertise to handle moves of any size. We specialize in single-family homes, apartments, condos, and townhouses throughout the Las Vegas Valley.",
      additionalInfoLinks: [
        { text: "Umbrella Movers in Henderson", url: "/locations/henderson", context: "Explore" },
        { text: "Summerlin moving services", url: "/locations/summerlin", context: "or our" }
      ],
      faqs: [
        {
          question: "How far in advance should I book my residential move?",
          answer: "We recommend booking at least 2-3 weeks in advance, especially during peak moving season (May-September). However, we do offer last-minute moves when availability allows."
        },
        {
          question: "Do you provide packing materials?",
          answer: "Yes! We offer professional-grade boxes, tape, bubble wrap, packing paper, and specialty containers. You can purchase materials separately or opt for our full-service packing where we handle everything."
        },
        {
          question: "Are your movers the same team who load and unload?",
          answer: "Absolutely. Unlike many moving companies, the same trusted team that loads your belongings will also unload them at your new home. We never use subcontractors."
        },
        {
          question: "What happens if something gets damaged during the move?",
          answer: "We're fully licensed and insured (CPCN 3364). In the rare event of damage, we have a straightforward claims process. We also offer additional valuation coverage options for high-value items."
        },
        {
          question: "Can you move items to different locations in one trip?",
          answer: "Yes, we can accommodate split deliveries if you need items delivered to multiple locations, such as a storage unit and your new home. Additional stops may affect pricing."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Local Moving", slug: "local-moving" },
        { title: "White Glove Moving", slug: "white-glove-moving" }
      ],
      locations: [
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" },
        { title: "Anthem", slug: "anthem" }
      ]
    },
    proofLinks: [
      { text: "read customer reviews", url: "/#testimonials", context: "See what homeowners say —" }
    ]
  },
  "commercial-moving": {
    slug: "commercial-moving",
    title: "Commercial Moving",
    shortDescription: "Minimize downtime with our efficient office and business relocation services. We work around your schedule.",
    image: "/images/commercial-moving.jpeg",
    heroImage: "/images/commercial-moving.jpeg",
    metaTitle: "Commercial Moving Services Las Vegas | Office Relocation | Umbrella Movers",
    metaDescription: "Expert commercial moving and office relocation in Las Vegas. Minimize downtime with our efficient business moving services. Woman-owned & fully insured.",
    content: {
      intro: "Business moves require precision, efficiency, and minimal disruption to your operations. Umbrella Movers understands that time is money, which is why our commercial moving services are designed to get you back to business as quickly as possible. We've helped businesses of all sizes relocate throughout Las Vegas.",
      features: [
        "After-hours and weekend moving available",
        "Office furniture and equipment handling",
        "IT equipment and electronics moving",
        "Cubicle disassembly and reassembly",
        "Asset tagging and inventory management",
        "Secure document and file transport",
        "Minimal business disruption guarantee"
      ],
      process: [
        {
          title: "Site Assessment",
          description: "We conduct a thorough walkthrough of both locations to create a detailed moving plan tailored to your business."
        },
        {
          title: "Custom Planning",
          description: "Our team develops a timeline that works with your business schedule, including phased moves if needed."
        },
        {
          title: "Efficient Execution",
          description: "Professional movers execute the plan with precision, ensuring all items are properly labeled and tracked."
        },
        {
          title: "Setup & Verification",
          description: "We set up your new space according to your floor plan and verify all inventory before completion."
        }
      ],
      additionalInfo: "From small offices to large corporate relocations, we have the experience and equipment to handle your commercial move professionally and efficiently."
    }
  },
  "long-distance-moving": {
    slug: "long-distance-moving",
    title: "Long Distance Moving",
    shortDescription: "Save money on interstate moves with our unique model. Your belongings stay in our care the entire journey.",
    image: "/images/long-distance-moving.jpeg",
    heroImage: "/images/long-distance-moving.jpeg",
    metaTitle: "Long Distance Moving Las Vegas | Interstate Movers | Umbrella Movers",
    metaDescription: "Affordable long distance moving from Las Vegas. Your items never leave our care. Scheduled delivery with no time windows. Woman-owned & fully licensed.",
    content: {
      intro: "Moving out of state doesn't have to break the bank or cause sleepless nights. Umbrella Movers offers a unique long-distance moving model that saves you money while ensuring your belongings are always in our care. Unlike other companies, we never hand off your items to third parties.",
      introLinks: [
        { text: "protection-first approach", url: "/why-choose-us", context: "This is part of our" }
      ],
      features: [
        "Economical rates with our direct-service model",
        "Your items never leave our care",
        "Scheduled delivery dates – no time windows",
        "Real-time communication throughout",
        "Full-service packing available",
        "Climate-controlled transport options",
        "Comprehensive insurance coverage"
      ],
      process: [
        {
          title: "Virtual or In-Home Estimate",
          description: "We provide accurate quotes based on detailed inventory assessment, with no hidden fees or surprises."
        },
        {
          title: "Packing & Loading",
          description: "Our team carefully packs and loads your belongings using proven techniques to prevent damage during transit."
        },
        {
          title: "Secure Transport",
          description: "Your items travel directly to your new home with our trusted team – never transferred to unknown carriers."
        },
        {
          title: "Scheduled Delivery",
          description: "We arrive on your scheduled date (not a window) and set up your belongings in your new home."
        }
      ],
      additionalInfo: "We regularly handle moves to California, Arizona, Utah, Colorado, and beyond. Contact us for a custom quote on your long-distance move.",
      faqs: [
        {
          question: "How is long-distance moving priced?",
          answer: "Long-distance moves are typically priced based on the weight of your belongings and the distance traveled, rather than hourly rates. We provide detailed quotes after assessing your inventory."
        },
        {
          question: "How long does a long-distance move take?",
          answer: "Delivery times depend on distance. Moves within neighboring states (California, Arizona, Utah) typically take 2-5 days. Longer distances may take 7-14 days. We provide a specific delivery date, not a window."
        },
        {
          question: "Will my belongings be transferred to another truck?",
          answer: "No. Unlike many long-distance movers, your items stay with our team the entire journey. We never hand off to third-party carriers or consolidate shipments."
        },
        {
          question: "What states do you move to from Las Vegas?",
          answer: "We regularly move clients to California, Arizona, Utah, Colorado, Texas, and beyond. Contact us for moves to any state – we can accommodate most destinations."
        },
        {
          question: "Do you offer storage during a long-distance move?",
          answer: "Yes! If your new home isn't ready, we can store your belongings in our secure, climate-controlled facility until you're ready for delivery at no extra transport cost."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Residential Moving", slug: "residential-moving" },
        { title: "Packing Services", slug: "packing-services" }
      ],
      locations: [
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "packing-services": {
    slug: "packing-services",
    title: "Packing Services",
    shortDescription: "Professional packing by trained experts. We use quality materials and proven techniques to protect your valuables.",
    image: "/images/packing-services.png",
    heroImage: "/images/packing-services.png",
    metaTitle: "Professional Packing Services Las Vegas | Umbrella Movers",
    metaDescription: "Expert packing services in Las Vegas. Quality materials, trained packers, and special handling for fragile items. Woman-owned moving company.",
    content: {
      intro: "Packing is often the most time-consuming and stressful part of any move. Let our professional packers handle it for you. We use high-quality materials and industry-best techniques to ensure your belongings arrive safely at your new home.",
      features: [
        "Full-service or partial packing options",
        "High-quality boxes and packing materials",
        "Special handling for fragile items",
        "Artwork and antique packing expertise",
        "Wardrobe boxes for clothing",
        "Detailed labeling system",
        "Unpacking services available"
      ],
      process: [
        {
          title: "Assessment",
          description: "We evaluate your packing needs and recommend the best service level for your situation."
        },
        {
          title: "Material Selection",
          description: "We bring all necessary supplies – boxes, tape, bubble wrap, packing paper, and specialty containers."
        },
        {
          title: "Professional Packing",
          description: "Our trained packers carefully wrap and box each item, using appropriate techniques for different item types."
        },
        {
          title: "Labeling & Organization",
          description: "Every box is clearly labeled by room and contents for easy unpacking at your destination."
        }
      ],
      additionalInfo: "We offer full-service packing where we handle everything, or partial packing where we focus on fragile items, kitchens, or other areas you specify."
    }
  },
  "storage-solutions": {
    slug: "storage-solutions",
    title: "Storage Solutions",
    shortDescription: "Secure, climate-controlled storage facilities with 24/7 monitoring. Short and long-term options available.",
    image: "/images/storage-solutions.png",
    heroImage: "/images/storage-solutions.png",
    metaTitle: "Storage Solutions Las Vegas | Climate-Controlled Storage | Umbrella Movers",
    metaDescription: "Secure, climate-controlled storage in Las Vegas. Short and long-term options with 24/7 monitoring. Woman-owned moving company with storage solutions.",
    content: {
      intro: "Sometimes your move doesn't happen all at once. Whether you need to store items during a home renovation, between moves, or for the long term, Umbrella Movers offers secure, climate-controlled storage solutions to keep your belongings safe.",
      features: [
        "Climate-controlled facilities",
        "24/7 security camera monitoring",
        "Clean, pest-free environment",
        "Flexible short and long-term options",
        "Easy access when you need it",
        "Inventory management",
        "Pickup and delivery services"
      ],
      process: [
        {
          title: "Space Assessment",
          description: "We help determine the right storage space size based on your inventory and duration needs."
        },
        {
          title: "Pickup & Transport",
          description: "Our team carefully packs and transports your items to our secure storage facility."
        },
        {
          title: "Secure Storage",
          description: "Your belongings are stored in our climate-controlled, monitored facility until you need them."
        },
        {
          title: "Delivery on Demand",
          description: "When you're ready, we deliver your items directly to your new location."
        }
      ],
      additionalInfo: "Our Las Vegas storage facility is perfect for those moving into new construction, downsizing, or needing extra space during life transitions. Call for current pricing."
    }
  },
  "specialty-moving": {
    slug: "specialty-moving",
    title: "Specialty Moving",
    shortDescription: "Expert handling for pianos, antiques, artwork, and other high-value or delicate items requiring special care.",
    image: "/images/specialty-moving.jpg",
    heroImage: "/images/specialty-moving.jpg",
    metaTitle: "Specialty Moving Las Vegas | Piano & Antique Movers | Umbrella Movers",
    metaDescription: "Expert specialty moving for pianos, antiques, artwork & fragile items in Las Vegas. Trained handlers with proper equipment. Woman-owned & insured.",
    content: {
      intro: "Some items require extra care, specialized equipment, and trained expertise. Umbrella Movers' specialty moving services are designed for pianos, antiques, fine art, and other valuable or delicate items that need more than standard moving procedures.",
      features: [
        "Piano moving expertise (uprights and grands)",
        "Antique furniture handling",
        "Fine art and sculpture transport",
        "Gun safe and vault moving",
        "Hot tub and spa relocation",
        "Pool table disassembly and setup",
        "Custom crating available"
      ],
      process: [
        {
          title: "Expert Consultation",
          description: "Our specialty moving coordinator assesses your items and develops a custom handling plan."
        },
        {
          title: "Proper Equipment",
          description: "We use specialized equipment including piano boards, art crates, and custom padding as needed."
        },
        {
          title: "Careful Execution",
          description: "Trained handlers move your specialty items with the utmost care and attention to detail."
        },
        {
          title: "Professional Setup",
          description: "We place and set up items in your new location, including piano positioning and pool table assembly."
        }
      ],
      additionalInfo: "Our team has moved hundreds of pianos, valuable antiques, and irreplaceable family heirlooms throughout Las Vegas. Trust your specialty items to the experts."
    }
  },
  "piano-moving": {
    slug: "piano-moving",
    title: "Piano Moving",
    shortDescription: "Expert piano moving for uprights and grands. Specialized equipment and trained handlers ensure your instrument arrives safely.",
    image: "/images/piano-moving.jpg",
    heroImage: "/images/piano-moving.jpg",
    metaTitle: "Piano Moving Las Vegas | Expert Piano Movers | Umbrella Movers",
    metaDescription: "Professional piano moving services in Las Vegas. Specialized equipment for uprights and grands. Woman-owned, fully insured. Get your free quote!",
    content: {
      intro: "Moving a piano requires specialized knowledge, equipment, and experience. At Umbrella Movers, our piano moving team has safely relocated hundreds of pianos throughout Las Vegas, from antique uprights to concert grands.",
      introLinks: [
        { text: "our white-glove service", url: "/services/white-glove-moving", context: "For the ultimate care, pair piano moving with" }
      ],
      features: [
        "Upright and grand piano expertise",
        "Specialized piano boards and straps",
        "Climate-controlled transport available",
        "Stair and tight space navigation",
        "Professional padding and wrapping",
        "Tuning coordination available",
        "Fully insured for your peace of mind"
      ],
      process: [
        { title: "Assessment", description: "We evaluate your piano type, location, and any obstacles to create a safe moving plan." },
        { title: "Preparation", description: "Our team secures the keyboard lid, wraps the piano in protective blankets, and positions our specialized equipment." },
        { title: "Safe Transport", description: "Using piano boards and proper lifting techniques, we carefully move your instrument to our truck." },
        { title: "Delivery & Setup", description: "We place your piano exactly where you want it and can coordinate with a tuner for post-move service." }
      ],
      additionalInfo: "Whether it's a family heirloom or a professional instrument, trust your piano to the experts at Umbrella Movers."
    },
    relatedContent: {
      services: [
        { title: "White Glove Moving", slug: "white-glove-moving" },
        { title: "Specialty Moving", slug: "specialty-moving" }
      ],
      locations: [
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" },
        { title: "Anthem", slug: "anthem" }
      ]
    },
    proofLinks: [
      { text: "protection-first process", url: "/why-choose-us", context: "Learn about our" },
      { text: "customer testimonials", url: "/#testimonials", context: "Read" }
    ]
  },
  "white-glove-moving": {
    slug: "white-glove-moving",
    title: "White Glove Movers",
    shortDescription: "Premium moving service with extra care and attention. Perfect for high-value items, antiques, and luxury homes.",
    image: "/images/white-glove-moving.png",
    heroImage: "/images/white-glove-moving.png",
    metaTitle: "White Glove Moving Las Vegas | Premium Movers | Umbrella Movers",
    metaDescription: "Premium white glove moving services in Las Vegas. Extra care for luxury homes, antiques, and high-value items. Woman-owned & fully insured.",
    content: {
      intro: "Our white glove moving service provides the highest level of care and attention for your most valuable possessions. From luxury homes to priceless antiques, we treat every item as if it were our own.",
      introLinks: [
        { text: "protection-first standards", url: "/why-choose-us", context: "Learn about our" },
        { text: "high-rise condo moving", url: "/services/high-rise-moving", context: "This service pairs perfectly with our" }
      ],
      features: [
        "Premium packing materials and techniques",
        "Extra care for high-value items",
        "Antique and artwork handling expertise",
        "Full unpacking and setup service",
        "Furniture placement and arrangement",
        "Debris removal and cleanup",
        "Dedicated move coordinator"
      ],
      process: [
        { title: "Consultation", description: "A move coordinator visits your home to understand your specific needs and create a detailed plan." },
        { title: "Premium Packing", description: "Using the highest quality materials, we carefully pack every item with meticulous attention." },
        { title: "Careful Transport", description: "Our experienced team handles your belongings with the utmost care throughout the move." },
        { title: "Full Setup", description: "We unpack, arrange furniture, hang artwork, and ensure everything is perfect before we leave." }
      ],
      additionalInfo: "White glove service is ideal for luxury properties, estate moves, and anyone who wants a completely hands-off moving experience.",
      additionalInfoLinks: [
        { text: "piano moving expertise", url: "/services/piano-moving", context: "Need specialized handling? See our" }
      ]
    },
    relatedContent: {
      services: [
        { title: "Piano Moving", slug: "piano-moving" },
        { title: "High Rise Moving", slug: "high-rise-moving" }
      ],
      locations: [
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
    },
    proofLinks: [
      { text: "300+ verified reviews", url: "/#testimonials", context: "See what our customers say in our" },
      { text: "woman-owned credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "large-item-moving": {
    slug: "large-item-moving",
    title: "Large Item Moving",
    shortDescription: "Specialized moving for oversized furniture, safes, hot tubs, and other heavy items requiring special equipment.",
    image: "/images/large-item-moving.jpg",
    heroImage: "/images/large-item-moving.jpg",
    metaTitle: "Large Item Moving Las Vegas | Heavy Item Movers | Umbrella Movers",
    metaDescription: "Professional large item moving in Las Vegas. Safes, hot tubs, oversized furniture & more. Specialized equipment & trained crew. Free quotes!",
    content: {
      intro: "Some items are too large, heavy, or awkward for standard moving. Umbrella Movers has the specialized equipment and trained personnel to safely move your oversized possessions.",
      features: [
        "Gun safe and vault moving",
        "Hot tub and spa relocation",
        "Oversized furniture handling",
        "Pool table disassembly and setup",
        "Exercise equipment moving",
        "Appliance installation",
        "Crane and rigging services available"
      ],
      process: [
        { title: "Assessment", description: "We evaluate the item dimensions, weight, and access points to plan the safest approach." },
        { title: "Equipment Setup", description: "Our team arrives with appropriate equipment – dollies, straps, lift gates, or specialty tools." },
        { title: "Safe Extraction", description: "Using proper techniques, we carefully navigate your large item out of its current location." },
        { title: "Secure Delivery", description: "We transport and position your item exactly where you need it in your new space." }
      ],
      additionalInfo: "From 1,000-pound safes to awkward-shaped furniture, we have the experience and equipment to handle it safely."
    }
  },
  "apartment-moving": {
    slug: "apartment-moving",
    title: "Apartment Moving",
    shortDescription: "Efficient apartment moves with elevator coordination, tight space navigation, and building rule compliance.",
    image: "/images/apartment-moving.jpeg",
    heroImage: "/images/apartment-moving.jpeg",
    metaTitle: "Apartment Moving Las Vegas | Apartment Movers | Umbrella Movers",
    metaDescription: "Professional apartment moving services in Las Vegas. Elevator coordination, tight spaces, building compliance. Woman-owned & insured.",
    content: {
      intro: "Apartment moves come with unique challenges – elevators, narrow hallways, parking restrictions, and building rules. Umbrella Movers knows how to navigate them all efficiently.",
      features: [
        "Elevator reservation coordination",
        "Tight space and stairwell navigation",
        "Building rule compliance",
        "Parking permit assistance",
        "Floor and wall protection",
        "Quick, efficient service",
        "Flexible scheduling including weekends"
      ],
      process: [
        { title: "Building Coordination", description: "We help you navigate building requirements, reserve elevators, and secure parking permits." },
        { title: "Efficient Packing", description: "Our team works quickly and carefully to minimize time in common areas." },
        { title: "Protected Transport", description: "We use floor runners and corner guards to protect both your items and the building." },
        { title: "Swift Setup", description: "Your new apartment is set up efficiently so you can start enjoying your new home." }
      ],
      additionalInfo: "Whether you're moving from a studio or a penthouse, we make apartment moving easy and stress-free."
    }
  },
  "high-rise-moving": {
    slug: "high-rise-moving",
    title: "High Rise Moving",
    shortDescription: "Specialized high-rise and condo moving with COI handling, freight elevator booking, and luxury building experience.",
    image: "/images/high-rise-moving.jpg",
    heroImage: "/images/high-rise-moving.jpg",
    metaTitle: "High Rise Moving Las Vegas | Condo Movers | Umbrella Movers",
    metaDescription: "Expert high-rise moving in Las Vegas. COI handling, freight elevators, luxury building experience. Woman-owned & fully insured.",
    content: {
      intro: "High-rise moves in Las Vegas require special expertise. From the Strip's luxury condos to downtown towers, Umbrella Movers understands the unique requirements of high-rise living.",
      introLinks: [
        { text: "our white-glove approach", url: "/services/white-glove-moving", context: "Many high-rise residents choose" }
      ],
      features: [
        "Certificate of Insurance (COI) handling",
        "Freight elevator coordination",
        "Loading dock scheduling",
        "HOA and management communication",
        "Luxury finish protection",
        "Experienced high-rise crews",
        "Time-sensitive scheduling"
      ],
      process: [
        { title: "Building Requirements", description: "We handle all paperwork including COIs, elevator reservations, and management coordination." },
        { title: "Strategic Planning", description: "Our team plans the move to maximize efficiency within your building's time restrictions." },
        { title: "Professional Execution", description: "Experienced crews work efficiently to complete your move within the allotted time." }
      ],
      additionalInfo: "We've moved residents in buildings throughout the Las Vegas Valley including Veer Towers, Panorama Towers, One Las Vegas, and many more."
    },
    relatedContent: {
      services: [
        { title: "White Glove Moving", slug: "white-glove-moving" },
        { title: "Apartment Moving", slug: "apartment-moving" }
      ],
      locations: [
        { title: "Summerlin", slug: "summerlin" },
        { title: "Henderson", slug: "henderson" }
      ]
    },
    proofLinks: [
      { text: "protection-first process", url: "/why-choose-us", context: "See our" },
      { text: "verified customer reviews", url: "/#testimonials", context: "Read" }
    ]
  },
  "local-moving": {
    slug: "local-moving",
    title: "Local Moving",
    shortDescription: "Fast, reliable local moves anywhere in the Las Vegas Valley. Same-day availability and transparent hourly rates.",
    image: "/images/local-moving.jpg",
    heroImage: "/images/local-moving.jpg",
    metaTitle: "Local Moving Las Vegas | Same Day Movers | Umbrella Movers",
    metaDescription: "Fast, affordable local moving in Las Vegas. Transparent hourly rates, same-day availability. Woman-owned & fully licensed. Free quotes!",
    content: {
      intro: "Moving across town? Umbrella Movers offers fast, reliable local moving services throughout the Las Vegas Valley. Our transparent pricing and professional service make local moves easy.",
      introLinks: [
        { text: "licensed and insured team", url: "/why-choose-us", context: "Every move is handled by our fully" }
      ],
      features: [
        "Transparent hourly rates",
        "No hidden fees or surprises",
        "Same-day availability",
        "Fully equipped trucks",
        "Professional, uniformed crews",
        "Furniture disassembly included",
        "Floor and door protection"
      ],
      process: [
        { title: "Quick Quote", description: "Tell us about your move and get an accurate estimate based on our transparent hourly rates." },
        { title: "Scheduled Arrival", description: "Our crew arrives on time with all necessary equipment and materials." },
        { title: "Efficient Loading", description: "We load your belongings carefully and efficiently to minimize time and cost." },
        { title: "Same-Day Delivery", description: "Your items are delivered and placed exactly where you want them – often the same day." }
      ],
      additionalInfo: "From Summerlin to Henderson, downtown to North Las Vegas, we know the Valley and can get you moved quickly and affordably.",
      additionalInfoLinks: [
        { text: "moving in Summerlin", url: "/locations/summerlin", context: "See our expertise for" },
        { text: "Henderson moving services", url: "/locations/henderson", context: "or explore our" }
      ]
    },
    relatedContent: {
      services: [
        { title: "Residential Moving", slug: "residential-moving" },
        { title: "Apartment Moving", slug: "apartment-moving" }
      ],
      locations: [
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" },
        { title: "Centennial Hills", slug: "centennial-hills" }
      ]
    },
    proofLinks: [
      { text: "read customer reviews", url: "/#testimonials", context: "Don't just take our word for it —" }
    ]
  },
  "renovation-moving-services": {
    slug: "renovation-moving-services",
    title: "Renovation Moving Services",
    shortDescription: "Professional moving and storage during home renovations. We safely store your belongings while you remodel.",
    image: "/images/storage-solutions.png",
    heroImage: "/images/storage-solutions.png",
    metaTitle: "Renovation Moving Services Las Vegas | Storage During Remodel | Umbrella Movers",
    metaDescription: "Professional moving and storage during home renovations in Las Vegas. Protect your belongings while remodeling. Woman-owned, fully insured. Free quote!",
    content: {
      intro: "Home renovations can be exciting, but protecting your belongings during the process is essential. Umbrella Movers specializes in renovation moving services – we safely move your furniture and valuables out, store them securely, and return everything when your project is complete. Whether you're remodeling a kitchen, bathroom, or doing a whole-home renovation, we've got you covered.",
      features: [
        "Full-service packing and moving",
        "Climate-controlled storage facilities",
        "Flexible short-term and long-term storage options",
        "Room-by-room moving for phased renovations",
        "Furniture protection and wrapping",
        "Quick turnaround for urgent projects",
        "Dust and debris protection services",
        "Scheduled pickup and delivery coordination"
      ],
      process: [
        { title: "Renovation Assessment", description: "We meet with you to understand your renovation timeline and determine which items need to be moved and stored." },
        { title: "Careful Packing & Moving", description: "Our team professionally packs and moves your belongings to our secure, climate-controlled storage facility." },
        { title: "Secure Storage", description: "Your items remain safely stored and monitored 24/7 throughout your renovation project." },
        { title: "Coordinated Return", description: "When your renovation is complete, we deliver and place everything back exactly where you want it." }
      ],
      additionalInfo: "Don't let dust, debris, or contractor traffic damage your valuable furniture and belongings. Trust Umbrella Movers to keep your items safe throughout your entire renovation project.",
      faqs: [
        {
          question: "How long can you store my belongings during renovation?",
          answer: "We offer flexible storage options ranging from a few days to several months. Our storage terms are customizable to match your renovation timeline, and you can extend or shorten as needed."
        },
        {
          question: "Can you move just one room at a time for phased renovations?",
          answer: "Absolutely! We specialize in room-by-room moving for phased renovation projects. We can move items from the room being renovated, store them, and return them before moving on to the next room."
        },
        {
          question: "How do you protect my furniture from dust and damage?",
          answer: "We use professional-grade moving blankets, shrink wrap, and custom crating for delicate items. In our climate-controlled storage facility, items are kept clean, dry, and away from any construction debris."
        },
        {
          question: "What if my renovation timeline changes unexpectedly?",
          answer: "We understand renovations often take longer than planned. Our flexible storage agreements allow you to extend your storage period as needed. Just give us a call and we'll adjust your plan accordingly."
        },
        {
          question: "Do you coordinate with contractors on timing?",
          answer: "Yes! We're happy to coordinate directly with your contractors to ensure seamless timing. We can schedule pickups before work begins and returns after final cleanup is complete."
        }
      ]
    }
  }
};

export const servicesList = Object.values(servicesData);

export const areasServed = [
  { name: "Las Vegas, NV", slug: "las-vegas" },
  { name: "Summerlin, NV", slug: "summerlin" },
  { name: "Henderson, NV", slug: "henderson" },
  { name: "Southern Highlands, NV", slug: "southern-highlands" },
  { name: "Centennial Hills, NV", slug: "centennial-hills" },
  { name: "Mountains Edge, NV", slug: "mountains-edge" },
  { name: "Aliante, NV", slug: "aliante" },
  { name: "Anthem, NV", slug: "anthem" },
  { name: "Sun City Summerlin, NV", slug: "sun-city-summerlin" },
  { name: "Green Valley Ranch, NV", slug: "green-valley-ranch" },
  { name: "McDonald's Highlands, NV", slug: "mcdonalds-highlands" },
  { name: "The Ridges, NV", slug: "the-ridges" }
];
