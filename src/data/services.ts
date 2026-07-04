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
    contentSections?: { heading: string; body: string[] }[]; // Optional keyword-rich H2 sections (subtopics)
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
    metaTitle: "Residential Moving Services Las Vegas",
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
    metaTitle: "Commercial Moving Services Las Vegas | Office Relocation",
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
  "medical-equipment-movers-las-vegas": {
    slug: "medical-equipment-movers-las-vegas",
    title: "Medical Equipment & Hospital Bed Moving",
    shortDescription: "Delivery, setup, and relocation of hospital beds and durable medical equipment for suppliers, hospices, home health agencies, and families across Las Vegas.",
    image: "/images/move3-summit-truck.jpeg",
    heroImage: "/images/move3-summit-truck.jpeg",
    metaTitle: "Medical Equipment Movers Las Vegas",
    metaDescription: "Medical equipment movers in Las Vegas. Hospital bed delivery, setup & relocation of DME for suppliers, hospices & families. Insured, two-man crews. Call today!",
    content: {
      intro: "Umbrella Movers provides medical equipment moving and hospital bed delivery, setup, and relocation throughout Las Vegas, Henderson, and North Las Vegas. Our insured two-man crews use liftgate trucks to deliver, install, and pick up hospital beds, exam tables, mobility equipment, and other durable medical equipment (DME) for suppliers, hospices, home health agencies, mobile medical providers, and families, often with same-week availability.",
      contentSections: [
        {
          heading: "Hospital Bed Delivery and Setup in Las Vegas",
          body: [
            "A hospital bed is heavy, awkward, and easy to damage when it is not handled correctly. Our crews deliver semi-electric and full-electric hospital beds, carry them into the room where they are needed, assemble the frame, attach the rails and motor, and position the bed so a patient or caregiver can use it right away. We remove all packaging and haul it away so nothing is left behind.",
            "For families caring for a loved one at home, we can also relocate an existing hospital bed between residences or facilities, and pick up and remove a bed that is no longer needed. Every delivery is handled by two trained movers so beds and heavy equipment are never dragged, dropped, or forced through a doorway."
          ]
        },
        {
          heading: "DME Delivery and Setup for Suppliers and Home Health Agencies",
          body: [
            "We act as an overflow and on-call delivery crew for durable medical equipment (DME) suppliers, hospices, home health agencies, and mobile medical providers who need reliable setup on short notice. When your own drivers are booked or a delivery falls outside your normal coverage, our team can handle the last-mile delivery, in-home setup, and pickup on your behalf.",
            "Recently we completed a hospital bed delivery and setup for Kelly Mobile Services, a Las Vegas mobile medical provider, via a referral from Level Fifteen Movers. If your organization needs dependable overflow capacity for DME delivery and setup around the valley, we can help."
          ]
        },
        {
          heading: "Medical Equipment We Move and Deliver",
          body: [
            "Beyond hospital beds, our crews regularly handle exam tables, treatment and procedure chairs, patient lifts and transfer equipment, wheelchairs, scooters, walkers, and other mobility aids, as well as bariatric equipment and large DME that requires a liftgate truck. If you are not sure whether we can move a specific piece of equipment, contact us with the details and we will let you know."
          ]
        }
      ],
      features: [
        "Delivery, setup, and pickup of semi-electric and full-electric hospital beds",
        "Two-man crews trained to handle and position medical equipment",
        "Liftgate trucks for safe loading of heavy DME",
        "Exam tables, treatment chairs, and patient lifts",
        "Wheelchairs, scooters, walkers, and mobility equipment",
        "Fully licensed (CPCN 3364) and insured",
        "Same-week availability and on-call overflow capacity for DME suppliers"
      ],
      process: [
        {
          title: "Schedule Your Delivery",
          description: "Tell us the equipment, the pickup point, and the destination. We confirm a delivery window that fits your timeline, including same-week and short-notice requests."
        },
        {
          title: "Pickup or Warehouse Load",
          description: "We collect the equipment from your supplier, warehouse, or facility and load it safely using liftgate trucks and proper equipment."
        },
        {
          title: "Delivery and Professional Setup",
          description: "Our two-man crew delivers the equipment, assembles and installs it in the room where it will be used, and removes all packaging."
        },
        {
          title: "Placement and Walkthrough",
          description: "We position the bed or equipment, confirm it operates correctly, and answer any questions before we leave the site."
        }
      ],
      additionalInfo: "We serve DME suppliers, medical offices, hospices, and families across Las Vegas, Henderson, North Las Vegas, Summerlin, Paradise, Spring Valley, and Boulder City, including providers and warehouses along the I-15 corridor. As a licensed (CPCN 3364) and insured moving company, we bring the same care to medical equipment that we bring to every move.",
      faqs: [
        {
          question: "How much does it cost to move a hospital bed in Las Vegas?",
          answer: "Hospital bed delivery and setup is priced by the job based on the equipment, the distance, the number of stairs or access challenges, and whether setup and removal are required. Contact us with the details for a free, no-obligation quote."
        },
        {
          question: "Do you deliver and set up hospital beds for home use?",
          answer: "Yes. We deliver hospital beds to private homes, carry them to the room where they are needed, fully assemble and position the bed, remove all packaging, and confirm it operates correctly before we leave."
        },
        {
          question: "Can you provide overflow delivery capacity for DME suppliers?",
          answer: "Yes. We regularly act as an on-call and overflow crew for durable medical equipment suppliers, handling last-mile delivery, in-home setup, and pickup when your own drivers are booked or a delivery falls outside your normal coverage."
        },
        {
          question: "Do you move medical equipment for hospices and home health agencies?",
          answer: "We do. We work with hospices, home health agencies, and mobile medical providers to deliver, set up, relocate, and pick up hospital beds and other DME on their behalf throughout the Las Vegas valley."
        },
        {
          question: "What types of medical equipment do you move?",
          answer: "We move hospital beds, exam tables, treatment and procedure chairs, patient lifts, wheelchairs, scooters, walkers, bariatric equipment, and other durable medical equipment. If you have a specific item, contact us and we will confirm we can handle it."
        },
        {
          question: "How quickly can you deliver medical equipment in Las Vegas?",
          answer: "We often have same-week availability and can accommodate short-notice and on-call requests. Reach out with your timeline and we will do our best to fit you in."
        },
        {
          question: "Do you remove or haul away old medical equipment?",
          answer: "Yes. We can pick up and remove hospital beds and equipment that are no longer needed at the same time we deliver a replacement, or as a standalone pickup."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Specialty Moving", slug: "specialty-moving" },
        { title: "Large Item Moving", slug: "large-item-moving" },
        { title: "Loading & Unloading Labor", slug: "loading-unloading-labor-las-vegas" }
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
  "office-movers-las-vegas": {
    slug: "office-movers-las-vegas",
    title: "Office Moving & FF&E Installation",
    shortDescription: "Full office relocations, cubicle teardown and reinstall, FF&E installation, and after-hours moves that keep your business running with minimal downtime.",
    image: "/images/move2-truck-storefront.jpg",
    heroImage: "/images/move2-truck-storefront.jpg",
    metaTitle: "Office & Commercial Movers Las Vegas",
    metaDescription: "Office movers in Las Vegas for full relocations, cubicle teardown & reinstall, FF&E installation & after-hours moves that minimize downtime. Free quote today!",
    content: {
      intro: "Umbrella Movers handles office moving and commercial relocations throughout Las Vegas, Henderson, North Las Vegas, and Summerlin. We manage full office moves, cubicle and systems-furniture teardown and reinstallation, FF&E (furniture, fixtures, and equipment) delivery and installation, and office decommissioning, scheduling after-hours and weekend work so your business keeps running with minimal downtime. We coordinate directly with office managers, facility managers, property managers, and furniture dealers.",
      contentSections: [
        {
          heading: "Office Relocation with Minimal Downtime",
          body: [
            "Every hour your office is closed costs money, so we plan commercial moves around your schedule instead of ours. After a walkthrough of both locations, we build a move plan and timeline, label and inventory workstations, and can phase the move over evenings or a weekend so your team walks into a working office on the next business day.",
            "Our crews handle desks, filing systems, conference furniture, IT and server equipment, and secure documents, protecting floors, elevators, and doorways at both ends so your old and new spaces stay in good condition."
          ]
        },
        {
          heading: "FF&E Delivery and Installation",
          body: [
            "We deliver and install furniture, fixtures, and equipment for offices, suites, and tenant improvements. That includes receiving FF&E from dealers and warehouses, transporting it to your site, and assembling and placing it according to your floor plan, whether it is a handful of new workstations or an entire floor of systems furniture.",
            "Furniture dealers and general contractors use our crews as installation labor on build-outs and tenant improvements, so new furniture arrives, gets assembled, and is set in place on schedule. We can stage deliveries to match your construction timeline and handle the debris and packaging cleanup when the install is complete."
          ]
        },
        {
          heading: "Office Decommissioning and Furniture Teardown",
          body: [
            "When you are exiting a lease, we handle office decommissioning: disassembling cubicles and systems furniture, removing furniture and equipment, and clearing the space so you can return it to the property manager. We can coordinate with facility managers and building staff on access, freight elevators, and after-hours timing."
          ]
        },
        {
          heading: "Medical and Dental Office Moves",
          body: [
            "We also relocate medical and dental offices, handling exam and treatment room furniture with care and coordinating around patient schedules. For clinics with hospital beds or durable medical equipment, our medical equipment movers can deliver, set up, and relocate that equipment as part of the same project."
          ]
        }
      ],
      features: [
        "Full office and workplace relocations",
        "Cubicle and systems-furniture teardown and reinstallation",
        "FF&E delivery and installation",
        "After-hours and weekend moves to minimize downtime",
        "IT, server, and electronics handling",
        "Office decommissioning and furniture removal",
        "Coordination with property managers, facility managers, and furniture dealers"
      ],
      process: [
        {
          title: "Site Survey and Floor Plan",
          description: "We walk both locations, review your floor plan, and identify access points, elevators, and any building rules that affect timing."
        },
        {
          title: "Move Planning and Scheduling",
          description: "We build a labeled inventory and a timeline, scheduling after-hours or weekend work and phasing the move if needed to protect your operations."
        },
        {
          title: "After-Hours Execution",
          description: "Our crew tears down furniture, moves everything to the new space, and works outside business hours whenever possible to minimize downtime."
        },
        {
          title: "Reinstall and Setup",
          description: "We reassemble cubicles and furniture, install FF&E per your plan, and verify everything is in place before your team returns."
        }
      ],
      additionalInfo: "We work with businesses across Las Vegas, Henderson, North Las Vegas, Summerlin, Paradise, and Spring Valley, from single suites to full-floor relocations, including convention-adjacent offices and companies near the I-15 corridor. Licensed (CPCN 3364) and insured.",
      faqs: [
        {
          question: "Can you move our office over a weekend?",
          answer: "Yes. We schedule after-hours and weekend moves specifically so your business avoids downtime. We build the timeline around your operating hours and can phase the move if needed."
        },
        {
          question: "Do you install office furniture and cubicles (FF&E)?",
          answer: "We do. We disassemble and reassemble cubicles and systems furniture, and we receive, deliver, and install FF&E from dealers and warehouses according to your floor plan."
        },
        {
          question: "How do you minimize downtime during an office move?",
          answer: "We plan the move around your schedule, work evenings and weekends, label and inventory everything in advance, and can move your office in phases so your team returns to a fully set-up workspace."
        },
        {
          question: "Do you handle office decommissioning?",
          answer: "Yes. When you exit a lease we disassemble furniture, remove equipment, and clear the space so it can be returned to the property manager, coordinating with building staff on access and timing."
        },
        {
          question: "Do you move medical and dental offices?",
          answer: "Yes. We relocate medical and dental practices, handle exam and treatment room furniture, and can deliver and set up hospital beds and durable medical equipment through our medical equipment moving service."
        },
        {
          question: "How is office moving priced in Las Vegas?",
          answer: "Commercial moves are quoted based on the size of the office, the amount of furniture and equipment, access at both sites, and whether after-hours work and FF&E installation are involved. Contact us for a free quote."
        },
        {
          question: "Do you work with property managers and furniture dealers?",
          answer: "Regularly. We coordinate with property managers, facility managers, and furniture dealers on scheduling, building access, deliveries, and installation so projects run smoothly."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Commercial Moving", slug: "commercial-moving" },
        { title: "Loading & Unloading Labor", slug: "loading-unloading-labor-las-vegas" },
        { title: "Medical Equipment & Hospital Bed Moving", slug: "medical-equipment-movers-las-vegas" }
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
  "loading-unloading-labor-las-vegas": {
    slug: "loading-unloading-labor-las-vegas",
    title: "Loading & Unloading Labor",
    shortDescription: "Labor-only crews to unload semi trailers, containers, PODs, and rental trucks for businesses, warehouses, 3PLs, and homeowners across Las Vegas.",
    image: "/images/move1-stairmaster-loading.jpeg",
    heroImage: "/images/move1-stairmaster-loading.jpeg",
    metaTitle: "Loading & Unloading Help Las Vegas",
    metaDescription: "Loading and unloading help in Las Vegas. Labor-only crews unload semi trailers, containers, PODs & rental trucks. Hourly or per-trailer rates. Call today!",
    content: {
      intro: "Umbrella Movers provides labor-only loading and unloading help throughout Las Vegas, Henderson, and North Las Vegas. Our crews unload semi trailers, shipping containers, PODs, and rental trucks for businesses, warehouses, 3PLs, and homeowners. Book by the hour or per trailer, with on-call availability for freight that arrives on short notice.",
      contentSections: [
        {
          heading: "Semi Trailer and Freight Unloading (Lumper Service)",
          body: [
            "When a semi trailer shows up at your dock or job site, you need hands ready to unload it fast. Our crews provide lumper service for businesses and warehouses across the valley, hand-unloading floor-loaded freight, breaking down and re-stacking pallets, and staging product where you need it. We can be on call for scheduled deliveries or short-notice arrivals.",
            "You provide the trailer and the destination; we provide the labor, so you are not paying for a truck you do not need."
          ]
        },
        {
          heading: "Container, POD, and Rental Truck Loading Help",
          body: [
            "We load and unload shipping containers, moving containers and PODs, and rental trucks such as U-Haul, Penske, and Budget. Whether you are loading a container for a long-distance move, unloading one that just arrived, or need help packing a rental truck tightly so nothing shifts in transit, our crews handle the heavy lifting and load items securely."
          ]
        },
        {
          heading: "Warehouse and Business Unloading Labor",
          body: [
            "Businesses, 3PLs, and warehouses use our crews as flexible, on-call unloading labor for busy periods, overflow, and one-off shipments. We can help unload inbound freight, move product within a facility, and stage inventory, all without the overhead of adding permanent staff.",
            "Because we bill by the hour or per trailer, you only pay for the labor you actually use. That makes us a practical option for seasonal surges, a heavy delivery week, or a single large shipment that your regular team cannot absorb, and we can be on site on short notice when freight arrives ahead of schedule."
          ]
        },
        {
          heading: "Moving-Day and POD Labor for Homeowners",
          body: [
            "Homeowners handling their own move often just need an extra set of experienced hands. If you have rented a truck or a POD and want it loaded quickly and packed tightly so nothing shifts, or you have a container arriving that needs to be unloaded and carried inside, our crews provide the heavy lifting by the hour. You handle the driving and the truck; we handle the loading, unloading, and careful placement of your belongings."
          ]
        }
      ],
      features: [
        "Labor-only crews: you provide the truck or trailer, we provide the muscle",
        "Semi trailer and freight unloading (lumper service)",
        "Shipping container loading and unloading",
        "POD and moving-container loading help",
        "Rental truck loading and unloading (U-Haul, Penske, Budget)",
        "Warehouse and 3PL unloading support",
        "Hourly or per-trailer rates with on-call availability"
      ],
      process: [
        {
          title: "Tell Us the Job",
          description: "Let us know what needs loading or unloading, where, and when. We confirm crew size and whether hourly or per-trailer pricing fits best."
        },
        {
          title: "Schedule Your Crew",
          description: "We book a crew for your window, including short-notice and on-call requests for freight that arrives unexpectedly."
        },
        {
          title: "Load or Unload",
          description: "Our movers hand-unload trailers and containers or load your truck or POD tightly and safely, protecting your product and the equipment."
        },
        {
          title: "Placed Where You Need It",
          description: "We stage freight, stack pallets, or place items in the room or spot you specify, then confirm the job is done to your satisfaction."
        }
      ],
      additionalInfo: "We provide loading and unloading labor across Las Vegas, Henderson, North Las Vegas, Summerlin, Paradise, and Spring Valley, including warehouses and businesses along the I-15 corridor. Licensed (CPCN 3364) and insured.",
      faqs: [
        {
          question: "Do you unload semi trailers for businesses?",
          answer: "Yes. Our crews provide lumper service, hand-unloading floor-loaded and palletized freight from semi trailers for warehouses, 3PLs, and businesses, on a scheduled or on-call basis."
        },
        {
          question: "How much does loading and unloading help cost in Las Vegas?",
          answer: "Labor-only work is quoted by the hour or per trailer, depending on the size of the crew, the amount of freight, and access at the site. Contact us with the details for a free quote."
        },
        {
          question: "Can you load or unload a moving container or POD?",
          answer: "Yes. We load and unload PODs and other moving containers, packing them tightly so items are secure in transit, and unloading and placing your belongings when a container arrives."
        },
        {
          question: "Do you provide lumper service for freight?",
          answer: "We do. We offer lumper service for businesses and warehouses, unloading trailers, breaking down or re-stacking pallets, and staging product where you need it."
        },
        {
          question: "Do I need to provide the truck?",
          answer: "For labor-only jobs, yes: you provide the truck, trailer, container, or POD, and we provide the crew and the muscle. If you also need transport, ask us about our full moving services."
        },
        {
          question: "How quickly can you send a crew?",
          answer: "We keep on-call availability for short-notice loading and unloading, so we can often accommodate same-week and urgent requests. Reach out with your timeline."
        },
        {
          question: "Do you unload rental trucks like U-Haul or Penske?",
          answer: "Yes. We regularly load and unload rental trucks including U-Haul, Penske, and Budget for homeowners and businesses handling their own transport."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Office Moving & FF&E Installation", slug: "office-movers-las-vegas" },
        { title: "Commercial Moving", slug: "commercial-moving" },
        { title: "Storage Solutions", slug: "storage-solutions" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Henderson", slug: "henderson" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "long-distance-moving": {
    slug: "long-distance-moving",
    title: "Long Distance Moving",
    shortDescription: "Save money on interstate moves with our unique model. Your belongings stay in our care the entire journey.",
    image: "/images/long-distance-moving.jpeg",
    heroImage: "/images/long-distance-moving.jpeg",
    metaTitle: "Long Distance Moving Las Vegas | Interstate Movers",
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
    metaTitle: "Professional Packing Services Las Vegas",
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
    metaTitle: "Storage Solutions Las Vegas | Climate-Controlled Storage",
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
    metaTitle: "Specialty Moving Las Vegas | Piano & Antique Movers",
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
    metaTitle: "Piano Moving Las Vegas | Expert Piano Movers",
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
    metaTitle: "White Glove Moving Las Vegas | Premium Movers",
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
    metaTitle: "Large Item Moving Las Vegas | Heavy Item Movers",
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
    metaTitle: "Apartment Moving Las Vegas | Apartment Movers",
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
    metaTitle: "High Rise Moving Las Vegas | Condo Movers",
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
    metaTitle: "Local Moving Las Vegas | Same Day Movers",
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
    metaTitle: "Renovation Moving Services Las Vegas | Storage During Remodel",
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
