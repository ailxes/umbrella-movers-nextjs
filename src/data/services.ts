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

export interface AreaServedItem {
  type: "State" | "City" | "Place";
  name: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  schemaAreaServed?: AreaServedItem[]; // Overrides the default Las Vegas-area list in the Service JSON-LD
  ctaHeading?: string; // Overrides the default "Get Your Free {title} Quote" bottom CTA heading
  ctaLabel?: string; // Overrides the default "Get Free Quote" button text on hero, form, and bottom CTA
  ctaSupport?: string; // Supporting line under the CTA explaining what the visitor actually receives
  ctaSecondary?: string; // Optional second CTA button alongside the primary one
  h1?: string; // Overrides the on-page H1 when it should be more geo-specific than the nav title
  quoteFormMode?: "standard" | "piano"; // Swaps the sidebar form for a service-specific field set
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
  featuredMoves?: string[]; // Slugs from recentMoves.ts rendered as case-study cards on the page
  reviews?: { text: string; author: string; location?: string }[]; // Real customer quotes shown on the page
}

export const servicesData: Record<string, ServiceData> = {
  "residential-moving": {
    slug: "residential-moving",
    title: "Residential Moving",
    shortDescription: "Full-service home moving with professional packing, careful handling, and the same trusted team from start to finish.",
    image: "/images/residential-moving.jpg",
    heroImage: "/images/residential-moving.jpg",
    metaTitle: "Residential Moving Services Las Vegas",
    metaDescription: "Professional residential moving in Las Vegas. Woman-owned, fully licensed & insured. Same team loads & unloads. Get your home moving estimate.",
    h1: "Residential Movers in Las Vegas",
    ctaLabel: "Get My Home Moving Estimate",
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
    title: "Commercial Moving & Equipment Logistics",
    shortDescription: "From retail stores and restaurants to hotels, offices, warehouses, and storage facilities, Umbrella Movers handles business relocations, equipment transfers, furniture moves, delivery, and assembly, with after-hours scheduling available to minimize downtime.",
    image: "/images/commercial-moving.jpeg",
    heroImage: "/images/commercial-moving.jpeg",
    metaTitle: "Commercial Moving, FF&E & Equipment Logistics Las Vegas",
    metaDescription: "Commercial moving, FF&E and equipment logistics in Las Vegas. Retail, restaurant, hotel, office and warehouse projects. Request a commercial project estimate.",
    h1: "Commercial Moving, FF&E & Equipment Logistics in Las Vegas",
    ctaSupport: "Receive a move plan, crew recommendation and timeline built around your operating hours.",
    ctaLabel: "Request a Commercial Project Estimate",
    ctaSecondary: "Schedule a Site Walkthrough",
    content: {
      intro: "Business moves require precision, efficiency, and minimal disruption to your operations. Umbrella Movers understands that time is money, which is why our commercial moving services are designed to get you back to business as quickly as possible. We've helped businesses of all sizes relocate throughout Las Vegas.",
      features: [
        "Retail store-to-store and store-to-storage relocations",
        "Warehouse-to-retail delivery to the sales floor or stockroom",
        "Displays, shelving, fixtures, and inventory",
        "Restaurant tables, booths, and kitchen equipment",
        "Espresso machines, claw machines, and other bulky equipment padded and transported",
        "Hotel and restaurant buyout moves",
        "FF&E delivery, assembly, and placement",
        "Furniture moved out to your new space or to storage",
        "Office furniture, IT equipment, and cubicle disassembly and reassembly",
        "Freight and semi-trailer unloading",
        "Storage-unit loading and delivery",
        "After-hours, overnight, and phased projects",
        "Coordination with property managers and loading docks",
        "Floor, elevator, and doorway protection",
        "Multi-truck and multi-crew projects"
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
      contentSections: [
        {
          heading: "Retail, restaurant, and hospitality projects",
          body: [
            "A large share of our commercial work is not office relocation. It is retail fixture and inventory moves, restaurant kitchens and dining rooms, hotel FF&E deliveries, and buyout moves, usually run overnight or in phases so the business keeps trading.",
            "Each of those has its own page with the scope, the scheduling, and the limits spelled out: retail store moving and fixture relocation, restaurant equipment and furniture moving, hotel and hospitality FF&E, and office moving and FF&E setup."
          ]
        },
        {
          heading: "Equipment logistics beyond a single relocation",
          body: [
            "We also run standalone equipment logistics: warehouse-to-retail delivery, freight and semi-trailer unloading at your dock, storage-unit loading and delivery, and transfers between locations that are not tied to a full move.",
            "These can be booked as one-off projects or on a recurring basis, sized by crew and truck count rather than by home size."
          ]
        },
        {
          heading: "Specialty and commercial equipment",
          body: [
            "We move, place, level, and assemble equipment and furniture.",
            "We can pad and transport bulky items like espresso machines, claw machines, ranges, reach-ins, and other retail and restaurant equipment."
          ]
        }
      ],
      additionalInfo: "Commercial projects are quoted on scope, access at both locations, and the hours crews can work, not on residential move size. A walkthrough is the fastest way to get an accurate number."
    },
    relatedContent: {
      services: [
        { title: "Retail Store Moving & Fixture Relocation", slug: "retail-store-movers-las-vegas" },
        { title: "Restaurant Equipment & Furniture Moving", slug: "restaurant-equipment-movers-las-vegas" },
        { title: "Hotel & Hospitality FF&E Services", slug: "hotel-ffe-movers-las-vegas" },
        { title: "Office Moving & FF&E Setup", slug: "office-movers-las-vegas" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
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
    h1: "Medical Equipment Movers in Las Vegas",
    content: {
      intro: "Umbrella Movers provides medical equipment moving and hospital bed delivery, setup, and relocation throughout Las Vegas, Henderson, and North Las Vegas. Our insured two-man crews use liftgate trucks to deliver, set up, and pick up hospital beds, exam tables, mobility equipment, and other durable medical equipment (DME) for suppliers, hospices, home health agencies, mobile medical providers, and families, often with same-week availability.",
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
          description: "Our two-man crew delivers the equipment, assembles and positions it in the room where it will be used, and removes all packaging."
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
          answer: "Hospital bed delivery and setup is priced by the job based on the equipment, the distance, the number of stairs or access challenges, and whether setup and transport of an existing bed are required. Contact us with the details for a free, no-obligation quote."
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
    title: "Office Moving & FF&E Setup",
    shortDescription: "Full office relocations, cubicle teardown and reassembly, FF&E delivery and setup, and after-hours moves that keep your business running with minimal downtime.",
    image: "/images/move2-truck-storefront.jpg",
    heroImage: "/images/move2-truck-storefront.jpg",
    metaTitle: "Office & Commercial Movers Las Vegas",
    metaDescription: "Office movers in Las Vegas for full relocations, cubicle teardown & reassembly, FF&E setup, and after-hours moves. Schedule a free commercial walkthrough.",
    h1: "Office Movers in Las Vegas",
    ctaSupport: "Receive a move plan, crew recommendation and timeline built around your operating hours.",
    ctaLabel: "Schedule a Free Commercial Walkthrough",
    content: {
      intro: "Umbrella Movers handles office moving and commercial relocations throughout Las Vegas, Henderson, North Las Vegas, and Summerlin. We manage full office moves, cubicle and systems-furniture teardown and reassembly, FF&E (furniture, fixtures, and equipment) delivery and setup, and full office move-outs at lease end, scheduling after-hours and weekend work so your business keeps running with minimal downtime. We coordinate directly with office managers, facility managers, property managers, and furniture dealers.",
      contentSections: [
        {
          heading: "Office Relocation with Minimal Downtime",
          body: [
            "Every hour your office is closed costs money, so we plan commercial moves around your schedule instead of ours. After a walkthrough of both locations, we build a move plan and timeline, label and inventory workstations, and can phase the move over evenings or a weekend so your team walks into a working office on the next business day.",
            "Our crews handle desks, filing systems, conference furniture, IT and server equipment, and secure documents, protecting floors, elevators, and doorways at both ends so your old and new spaces stay in good condition."
          ]
        },
        {
          heading: "FF&E Delivery and Setup",
          body: [
            "We deliver, assemble, and place furniture, fixtures, and equipment for offices, suites, and tenant improvements. That includes receiving FF&E from dealers and warehouses, transporting it to your site, and assembling and placing it according to your floor plan, whether it is a handful of new workstations or an entire floor of systems furniture.",
            "Furniture dealers and general contractors use our crews as assembly and placement labor on build-outs and tenant improvements, so new furniture arrives, gets assembled, and is set in place on schedule. We can stage deliveries to match your construction timeline and clear the packaging to the area you designate when the work is complete."
          ]
        },
        {
          heading: "Lease-End Move-Outs and Furniture Teardown",
          body: [
            "When you are exiting a lease, we handle the move-out: disassembling cubicles and systems furniture and moving it out to your new space or into storage. We can coordinate with facility managers and building staff on access, freight elevators, and after-hours timing so the space is clear by your handover date."
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
        "Cubicle and systems-furniture teardown and reassembly",
        "FF&E delivery, assembly, and placement",
        "After-hours and weekend moves to minimize downtime",
        "IT, server, and electronics handling",
        "Lease-end move-outs and furniture teardown",
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
          title: "Reassembly and Setup",
          description: "We reassemble cubicles and furniture, place FF&E per your plan, and verify everything is in place before your team returns."
        }
      ],
      additionalInfo: "We work with businesses across Las Vegas, Henderson, North Las Vegas, Summerlin, Paradise, and Spring Valley, from single suites to full-floor relocations, including convention-adjacent offices and companies near the I-15 corridor. Licensed (CPCN 3364) and insured.",
      faqs: [
        {
          question: "Can you move our office over a weekend?",
          answer: "Yes. We schedule after-hours and weekend moves specifically so your business avoids downtime. We build the timeline around your operating hours and can phase the move if needed."
        },
        {
          question: "Do you assemble office furniture and cubicles (FF&E)?",
          answer: "We do. We disassemble and reassemble cubicles and systems furniture, and we receive, deliver, assemble, and place FF&E from dealers and warehouses according to your floor plan."
        },
        {
          question: "How do you minimize downtime during an office move?",
          answer: "We plan the move around your schedule, work evenings and weekends, label and inventory everything in advance, and can move your office in phases so your team returns to a fully set-up workspace."
        },
        {
          question: "Do you handle lease-end office move-outs?",
          answer: "Yes. We disassemble cubicles and systems furniture and move it out to your new space or into storage, coordinating with building staff on access, freight elevators, and after-hours timing so the space is clear by your handover date."
        },
        {
          question: "Do you move medical and dental offices?",
          answer: "Yes. We relocate medical and dental practices, handle exam and treatment room furniture, and can deliver and set up hospital beds and durable medical equipment through our medical equipment moving service."
        },
        {
          question: "How is office moving priced in Las Vegas?",
          answer: "Commercial moves are quoted based on the size of the office, the amount of furniture and equipment, access at both sites, and whether after-hours work and FF&E setup are involved. Contact us for a free quote."
        },
        {
          question: "Do you work with property managers and furniture dealers?",
          answer: "Regularly. We coordinate with property managers, facility managers, and furniture dealers on scheduling, building access, deliveries, and furniture setup so projects run smoothly."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Commercial Moving & Equipment Logistics", slug: "commercial-moving" },
        { title: "Hotel & Hospitality FF&E Services", slug: "hotel-ffe-movers-las-vegas" },
        { title: "Retail Store Moving & Fixture Relocation", slug: "retail-store-movers-las-vegas" },
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
  "retail-store-movers-las-vegas": {
    slug: "retail-store-movers-las-vegas",
    title: "Retail Store Moving & Fixture Relocation",
    shortDescription: "Store-to-store and store-to-storage relocations, warehouse-to-retail delivery, and careful handling of displays, shelving, fixtures, and inventory.",
    image: "/images/move2-loading-shelves.jpg",
    heroImage: "/images/move2-loading-shelves.jpg",
    metaTitle: "Retail Store Movers Las Vegas | Fixture Relocation",
    metaDescription: "Retail store movers in Las Vegas. Store-to-store moves, warehouse-to-retail delivery, displays, shelving and inventory. Request a commercial project estimate.",
    h1: "Retail Store Movers in Las Vegas",
    ctaLabel: "Request a Commercial Project Estimate",
    ctaSecondary: "Schedule a Site Walkthrough",
    ctaSupport: "Receive a move plan, crew recommendation and timeline built around your store hours.",
    content: {
      intro: "A retail move is measured in hours the doors stay closed. Umbrella Movers relocates stores across the Las Vegas valley, moving displays, gondola shelving, racking, casework, and inventory between locations, out to storage, or from the warehouse to the sales floor. We are a WBENC-certified woman-owned company, licensed under CPCN 3364 and fully insured, and we schedule around your trading hours so the floor is ready when you unlock.",
      introLinks: [
        { text: "commercial moving services", url: "/services/commercial-moving", context: "Part of our broader" }
      ],
      features: [
        "Store-to-store and store-to-storage relocations",
        "Warehouse-to-retail delivery to the sales floor or stockroom",
        "Display cases, gondola shelving, and racking padded and transported",
        "Inventory boxed, labeled, and kept together by section",
        "Freight and semi-trailer unloading at the dock",
        "After-hours and overnight scheduling so you open on time",
        "Coordination with property managers, docks, and mall access rules",
        "Floor, elevator, and doorway protection at both ends"
      ],
      process: [
        {
          title: "Site Walkthrough",
          description: "We walk both locations, measure the fixtures and the access, and confirm dock hours, elevator reservations, and any center or landlord requirements."
        },
        {
          title: "Move Plan and Sequence",
          description: "You get a written plan covering crew size, truck count, and the order fixtures and inventory move in, built around when your store can be closed."
        },
        {
          title: "Protected Execution",
          description: "Floors, doorways, and elevators are protected before anything moves. Fixtures are padded and shrink-wrapped, and inventory stays grouped by section so it can be merchandised quickly."
        },
        {
          title: "Unload and Walkthrough",
          description: "Fixtures and inventory are unloaded and carried to the sales floor or stockroom, packaging is cleared, and we walk the space with you before the crew releases."
        }
      ],
      contentSections: [
        {
          heading: "What we move for retailers",
          body: [
            "Gondola shelving, wall standards once detached, display cases, slatwall panels, garment racks, cash wraps, mannequins, mirrors, signage, and back-of-house racking. Inventory moves in labeled cartons kept together by department so the reset is not a scavenger hunt.",
            "We also run warehouse-to-retail delivery on an ongoing basis: fixtures and stock arrive at the dock, we unload the trailer, and carry it to the floor or stockroom rather than leaving it on the receiving pad."
          ]
        },
        {
          heading: "Fixture handling",
          body: [
            "We pad and transport freestanding fixtures, and we disassemble and reassemble modular shelving and racking so it travels safely.",
            "Wall-mounted fixtures are detached so they travel safely."
          ]
        },
        {
          heading: "Working around your trading hours",
          body: [
            "Most of the retail work we do happens overnight or on a closed day. We can also phase a move across several nights so a store keeps trading through the transition, with the sales floor reset before each open.",
            "Multi-truck and multi-crew projects are routine for us, which is what makes a single-night turnaround realistic on larger footprints."
          ]
        }
      ],
      faqs: [
        {
          question: "Can you move our store overnight so we don't lose a trading day?",
          answer: "Yes. Overnight and closed-day scheduling is the norm for retail work. We size the crew and truck count to the window you give us, and we confirm dock and elevator access with the property manager before the night of the move."
        },
        {
          question: "Do you handle inventory as well as fixtures?",
          answer: "Yes. Inventory is boxed, labeled, and kept together by department or section so your team can merchandise quickly instead of sorting cartons. For larger resets we can stage inventory in the stockroom in the order you plan to put it out."
        },
        {
          question: "Can you unload a freight trailer at our dock?",
          answer: "Yes. We unload semi trailers, containers, and box trucks, and carry freight to the sales floor or stockroom rather than leaving it on the dock. That work can be booked on its own or as part of a larger relocation."
        },
        {
          question: "Can you hold our fixtures between locations?",
          answer: "Yes. Store-to-storage and storage-to-store moves are common when a lease ends before the new space is ready. We can move fixtures and stock into storage and bring them back out when your build-out finishes."
        }
      ],
      additionalInfo: "Retail work is quoted on the size of the store, the fixture count, dock and elevator access at both ends, and the hours the crew can work. A walkthrough is the fastest way to get an accurate number."
    },
    relatedContent: {
      services: [
        { title: "Commercial Moving & Equipment Logistics", slug: "commercial-moving" },
        { title: "Restaurant Equipment & Furniture Moving", slug: "restaurant-equipment-movers-las-vegas" },
        { title: "Loading & Unloading Labor", slug: "loading-unloading-labor-las-vegas" },
        { title: "Storage Solutions", slug: "storage-solutions" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
    },
    proofLinks: [
      { text: "recent commercial moves", url: "/recent-moves", context: "See photos from our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "restaurant-equipment-movers-las-vegas": {
    slug: "restaurant-equipment-movers-las-vegas",
    title: "Restaurant Equipment & Furniture Moving",
    shortDescription: "Dining furniture, booth seating, stainless prep tables, shelving, and industrial kitchen equipment padded, loaded, and transported, scheduled around service.",
    image: "/images/move2-kitchen-equipment.jpg",
    heroImage: "/images/move2-kitchen-equipment.jpg",
    metaTitle: "Restaurant Equipment Movers Las Vegas | Kitchen & Furniture",
    metaDescription: "Restaurant equipment movers in Las Vegas. Kitchen equipment, prep tables, booths, tables and shelving moved and placed. Request a commercial project estimate.",
    h1: "Restaurant Equipment Movers in Las Vegas",
    ctaLabel: "Request a Commercial Project Estimate",
    ctaSecondary: "Schedule a Site Walkthrough",
    ctaSupport: "Receive a move plan, crew recommendation and timeline built around your service hours.",
    content: {
      intro: "Restaurant moves are heavy, awkward, and time-boxed. We have done them: a 4,000 square foot Chinatown restaurant relocated with four movers and two trucks, including the dining room, metal shelving, and the full industrial kitchen. Umbrella Movers moves front-of-house furniture and back-of-house equipment across the Las Vegas valley, licensed under CPCN 3364 and fully insured, on a schedule built around your service hours.",
      introLinks: [
        { text: "photos from that restaurant move", url: "/recent-moves", context: "See" }
      ],
      features: [
        "Dining tables, chairs, and booth seating",
        "Stainless prep tables, work counters, and speed racks",
        "Wire and metal shelving disassembled and reassembled",
        "Industrial kitchen equipment padded and transported",
        "Espresso machines, claw machines, and other bulky equipment padded and transported",
        "Heavy appliances moved on proper equipment and stair gear",
        "Closing-night, overnight, and phased scheduling",
        "Floor, doorway, and corner protection at both locations"
      ],
      process: [
        {
          title: "Site Walkthrough",
          description: "We walk the kitchen and dining room, measure the equipment against the doorways and the path out, and flag anything that has to be broken down or taken through a different opening."
        },
        {
          title: "Timing Confirmed",
          description: "We confirm your move window against everything else happening that day, so the crew arrives when the equipment is ready to come out and nobody is waiting around."
        },
        {
          title: "Protected Move",
          description: "Floors, doorways, and corners are protected first. Equipment is padded, wrapped, and secured, and dining furniture is grouped so the room can be reset quickly."
        },
        {
          title: "Unloaded at the New Space",
          description: "Equipment and dining furniture are unloaded and carried inside, so your team can set the line and the room the way you want it."
        }
      ],
      contentSections: [
        {
          heading: "Front of house and back of house",
          body: [
            "Front of house covers dining tables, chairs, bar stools, booth seating, host stands, servers, and bar back shelving. Booths are the piece most often underestimated, and they usually need to come apart to clear a doorway.",
            "Back of house covers stainless prep tables, work counters, speed racks, wire shelving, mixers, slicers, reach-ins, and freestanding cooking equipment. Wire and metal shelving comes apart and goes back together, which is faster and safer than trying to walk assembled units through a service corridor."
          ]
        },
        {
          heading: "Scheduling around service",
          body: [
            "Most restaurant work happens after close or on a dark day. We can also phase a move so one location keeps serving while the other is built out.",
            "Multi-truck and multi-crew projects are routine, which is what makes a single overnight turnaround realistic on a full kitchen and dining room."
          ]
        }
      ],
      faqs: [
        {
          question: "Can you move an espresso machine?",
          answer: "Yes. We can pad and transport bulky items like espresso machines, claw machines, and other retail and restaurant equipment, and carry them into the new space."
        },
        {
          question: "Can you move our restaurant overnight?",
          answer: "Yes. Closing-night and overnight moves are how most restaurant work gets done. We size the crew and truck count to the window you give us so the room is ready before your next service."
        },
        {
          question: "Do booths and banquettes have to be taken apart?",
          answer: "Usually yes. Booth seating is often wider than the doorway it has to clear, so we break it down, move it in sections, and reassemble it in the new dining room. We check this during the walkthrough so there are no surprises on the night."
        },
        {
          question: "Have you actually moved a full restaurant before?",
          answer: "Yes. One recent example is a 4,000 square foot restaurant in Chinatown moved with four movers and two trucks, covering the dining room tables and chairs, metal shelving, and the full industrial kitchen. Photos from that job are on our recent moves page."
        }
      ],
      additionalInfo: "Restaurant projects are quoted on the equipment list, the access at both locations, and the hours the crew can work. A walkthrough is the fastest way to get an accurate number."
    },
    relatedContent: {
      services: [
        { title: "Commercial Moving & Equipment Logistics", slug: "commercial-moving" },
        { title: "Retail Store Moving & Fixture Relocation", slug: "retail-store-movers-las-vegas" },
        { title: "Hotel & Hospitality FF&E Services", slug: "hotel-ffe-movers-las-vegas" },
        { title: "Large Item Moving", slug: "large-item-moving" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Henderson", slug: "henderson" },
        { title: "Spring Valley", slug: "spring-valley" }
      ]
    },
    proofLinks: [
      { text: "our Chinatown restaurant move", url: "/recent-moves", context: "See photos from" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "hotel-ffe-movers-las-vegas": {
    slug: "hotel-ffe-movers-las-vegas",
    title: "Hotel & Hospitality FF&E Services",
    shortDescription: "FF&E delivery, assembly, and placement for hotels and hospitality, plus buyout moves, phased floor-by-floor scheduling, and packaging cleared as you go.",
    image: "/images/move3-summit-truck.jpeg",
    heroImage: "/images/move3-summit-truck.jpeg",
    metaTitle: "Hotel FF&E Movers Las Vegas | Delivery & Assembly",
    metaDescription: "Hotel and hospitality FF&E in Las Vegas. Delivery, assembly, placement, buyout moves and phased floor-by-floor work. Request a project estimate.",
    h1: "Hotel & Hospitality FF&E Movers in Las Vegas",
    ctaLabel: "Request a Commercial Project Estimate",
    ctaSecondary: "Schedule a Site Walkthrough",
    ctaSupport: "Receive a move plan, crew recommendation and phased timeline built around your occupancy.",
    content: {
      intro: "Hospitality FF&E work is a logistics problem before it is a moving problem: freight arrives on a schedule, service elevators are shared, and rooms have to come back online floor by floor. Umbrella Movers delivers, places, and sets hotel and restaurant furniture, fixtures, and equipment across the Las Vegas valley, and clears the old inventory on buyouts. WBENC-certified, licensed under CPCN 3364, and fully insured.",
      introLinks: [
        { text: "commercial moving services", url: "/services/commercial-moving", context: "Part of our broader" }
      ],
      features: [
        "FF&E delivery, assembly, and placement",
        "Guest room furniture sets delivered and set floor by floor",
        "Hotel and restaurant buyout moves",
        "Case goods uncartoned, assembled, and positioned",
        "Phased scheduling that keeps floors in service",
        "Service elevator, dock, and freight window coordination",
        "Packaging cleared from completed floors as we go",
        "Multi-truck and multi-crew capacity for volume deliveries"
      ],
      process: [
        {
          title: "Project Walkthrough",
          description: "We review the FF&E schedule, the floors in scope, the dock and service elevator access, and the freight windows your property allows."
        },
        {
          title: "Phased Plan",
          description: "You get a written plan covering crew size, truck count, and the room or floor sequence, built so occupied floors keep operating through the project."
        },
        {
          title: "Delivery and Placement",
          description: "Protection goes down on corridors and elevators first. Case goods are uncartoned, assembled, and set to the room plan, and packaging is cleared as we go."
        },
        {
          title: "Removal and Handover",
          description: "On refurbishments and buyouts the outgoing furniture leaves the same trip where the schedule allows. We walk completed floors with your project manager before releasing the crew."
        }
      ],
      contentSections: [
        {
          heading: "New fit-outs, refurbishments, and buyouts",
          body: [
            "On a new fit-out or a soft-goods refurbishment we take delivery at the dock, move sets up floor by floor, uncarton and assemble case goods, place them to the room plan, and remove the packaging so housekeeping is not working around cardboard.",
            "On a buyout we do the reverse: clear guest room and restaurant furniture, fixtures, and equipment out of the property on a phased schedule, staged so the freight elevator is not tied up during peak hours."
          ]
        },
        {
          heading: "What the assembly work covers",
          body: [
            "Assembly on these projects means uncartoning, building case goods, joining modular and systems furniture, levelling, and positioning to the room plan.",
            "On a buyout we detach wall-mounted items so they can be moved out safely."
          ]
        },
        {
          heading: "Working around an operating property",
          body: [
            "Occupied properties set the constraints: freight windows, shared service elevators, noise curfews on guest floors, and union or property access rules. We plan the sequence around those rather than against them, and we coordinate directly with your project manager, property manager, or general contractor.",
            "Multi-truck and multi-crew scheduling lets us hold a delivery pace that matches your room turnover instead of flooding a dock you cannot clear."
          ]
        }
      ],
      faqs: [
        {
          question: "Do you assemble the FF&E or only deliver it?",
          answer: "Both. We uncarton, assemble, join systems and modular furniture, level it, and place it to the room plan, then clear the packaging as each floor is completed."
        },
        {
          question: "Can you work floor by floor while the hotel stays open?",
          answer: "Yes. Phased, floor-by-floor scheduling is the normal approach on an operating property. We build the sequence around your freight windows, service elevator availability, and guest floor curfews so rooms come back online in the order your project plan needs them."
        },
        {
          question: "Can you handle a full restaurant or hotel buyout move?",
          answer: "Yes. We take furniture, fixtures, and equipment out of the property on a phased schedule and deliver it to the address or storage facility you designate, staged so the dock and freight elevator stay usable. Volume, access, and the hours we can work drive the crew and truck count."
        },
        {
          question: "Do you clear the packaging as you go?",
          answer: "Yes. Cartons, pallets, and packaging are moved off completed floors rather than left for housekeeping, and we take them to the dock or staging area your property designates."
        },
        {
          question: "Who do you coordinate with on these projects?",
          answer: "Whoever owns the schedule, typically the project manager, property manager, or general contractor. We confirm dock times, freight elevator reservations, access credentials, and floor sequencing before the first delivery rather than on the morning of it."
        }
      ],
      additionalInfo: "Hospitality projects are quoted on the FF&E schedule, the floors and room count in scope, the access and freight windows at the property, and the hours crews can work. A walkthrough is the fastest way to get an accurate number."
    },
    relatedContent: {
      services: [
        { title: "Commercial Moving & Equipment Logistics", slug: "commercial-moving" },
        { title: "Office Moving & FF&E Setup", slug: "office-movers-las-vegas" },
        { title: "Restaurant Equipment & Furniture Moving", slug: "restaurant-equipment-movers-las-vegas" },
        { title: "Loading & Unloading Labor", slug: "loading-unloading-labor-las-vegas" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
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
    h1: "Loading & Unloading Labor in Las Vegas",
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
        { title: "Office Moving & FF&E Setup", slug: "office-movers-las-vegas" },
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
    metaDescription: "Affordable long distance moving from Las Vegas. Your items never leave our care. Woman-owned & licensed. Schedule a free video walkthrough.",
    h1: "Long Distance Movers in Las Vegas",
    ctaSupport: "Get a written route-specific estimate with scheduled delivery and no carrier handoffs.",
    ctaLabel: "Schedule a Free Video Walkthrough",
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
      additionalInfoLinks: [
        { text: "movers that fly to you", url: "/services/movers-that-fly-to-you", context: "Moving TO Las Vegas from California or a nearby state instead? We are the" }
      ],
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
        { title: "We Fly to You: Long-Distance Moves to Las Vegas", slug: "movers-that-fly-to-you" },
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
  "movers-that-fly-to-you": {
    slug: "movers-that-fly-to-you",
    title: "We Fly to You: Long-Distance Moves to Las Vegas",
    shortDescription: "Moving to Las Vegas from California or a nearby state? Our Las Vegas crew flies to your city, rents a truck locally, loads your home, and drives your belongings to Las Vegas. Often for less than hiring a local mover.",
    image: "/assets/blog-california-to-vegas.jpg",
    heroImage: "/assets/blog-california-to-vegas.jpg",
    metaTitle: "Movers That Fly to You | Out-of-State Moves to Las Vegas",
    metaDescription: "We fly our Las Vegas crew to you, rent a truck locally, and move you to Las Vegas. Often cheaper than hiring a California mover. Free virtual walkthrough.",
    ctaHeading: "Schedule Your Free Virtual Walkthrough",
    schemaAreaServed: [
      { type: "State", name: "California" },
      { type: "State", name: "Arizona" },
      { type: "State", name: "Utah" },
      { type: "State", name: "Colorado" },
      { type: "State", name: "Texas" },
      { type: "State", name: "Washington" },
      { type: "State", name: "Oregon" },
      { type: "State", name: "Idaho" },
      { type: "State", name: "Nevada" },
      { type: "City", name: "Los Angeles" },
      { type: "Place", name: "Orange County" },
      { type: "City", name: "San Diego" },
      { type: "Place", name: "Inland Empire" },
      { type: "Place", name: "San Francisco Bay Area" },
      { type: "City", name: "San Jose" },
      { type: "City", name: "Sacramento" },
      { type: "Place", name: "Central Valley" },
      { type: "City", name: "Las Vegas" }
    ],
    content: {
      intro: "Umbrella Movers is a licensed Las Vegas moving company (CPCN 3364, US DOT 2474617) that flies its own crews to California and surrounding states, rents a moving truck locally, loads your home, and drives your belongings to Las Vegas, often for less than hiring a local California mover. The same crew that loads you at your old home unloads you at your new one, and your belongings are never combined with anyone else's shipment. Every move starts with a free virtual video walkthrough and an exact quote before you book.",
      introLinks: [
        { text: "credentials and reviews", url: "/why-choose-us", context: "See our" }
      ],
      contentSections: [
        {
          heading: "A Las Vegas Crew That Flies to Your City",
          body: [
            "If you have been searching for movers that fly to you, or for out-of-state movers to Las Vegas that will not hand your belongings to a broker, this is that service. Almost no moving company advertises it, but it works: instead of you hunting for a trustworthy mover in your city, our Las Vegas crew books the earliest flight of the day to you, picks up a rental truck locally, and handles your move like it was around the corner. One or two trucks depending on the size of your move, our own trained movers, and our own dollies checked on the flight.",
            "Because we fly in and rent the truck in your city, we skip the overhead that drives up long-distance quotes. Then the crew drives your belongings straight to Las Vegas. No freight terminals, no handoffs to another carrier, and no waiting for a shared trailer to fill up."
          ]
        },
        {
          heading: "Recent Fly-Out Moves from San Jose and Los Angeles",
          body: [
            "We recently completed two of these moves, one from San Jose and one from Los Angeles. Both customers compared quotes from moving companies in their area and told us that hiring us to fly out cost less than hiring a local California mover for the same move. Every move is different, so your exact price comes from your virtual walkthrough, but that is the experience our customers have reported.",
            "The Los Angeles move was loaded and on the road to Las Vegas the same day. The San Jose move followed our typical Northern California timeline of 2 to 3 days, depending on traffic, move size, and other variables."
          ]
        },
        {
          heading: "One Crew, Your Belongings Only",
          body: [
            "Most long-distance moving quotes involve a broker, a carrier you have never spoken to, and a semi trailer shared with several other households. Ours involves none of that. The crew that walks through your home is our crew, on our payroll, and the truck carries your belongings only.",
            "You also get a dedicated moving coordinator you can reach directly throughout the move to coordinate arrival and unload times and answer any questions. When the truck pulls up to your new Las Vegas home, the same movers who loaded you carry everything inside."
          ]
        },
        {
          heading: "Where We Fly",
          body: [
            "Our primary coverage is anywhere in California, including Los Angeles, Orange County, San Diego, the Inland Empire, the Bay Area, San Jose, Sacramento, and the Central Valley. For Southern California we fly into whichever airport is most convenient to you: LAX, Burbank, Long Beach, Ontario, or Santa Ana. For Northern California we fly into SFO or San Jose.",
            "We also fly out for moves from Arizona, Utah, Colorado, Texas, Washington, Oregon, and Idaho, and beyond by request, using whichever airport puts our crew closest to your home."
          ]
        }
      ],
      features: [
        "Free virtual video walkthrough and an exact quote before you book",
        "Our own Las Vegas crew flies to your city, never subcontractors",
        "One or two rental trucks depending on the size of your move",
        "Your belongings only, never combined with other households' shipments",
        "The same crew that loads you unloads you in Las Vegas",
        "A dedicated moving coordinator you can reach throughout the move",
        "Licensed (CPCN 3364, US DOT 2474617) and insured"
      ],
      process: [
        {
          title: "Schedule a Virtual Video Walkthrough",
          description: "Contact us and we set up a video call. We go room by room with you and document your full inventory, so the quote reflects exactly what is moving."
        },
        {
          title: "Approve Your Quote and Book",
          description: "We agree on a quote based on the walkthrough, including any moving supplies you need such as boxes and tape. You place a deposit to lock in your date."
        },
        {
          title: "Our Crew Flies Out",
          description: "We book the earliest flight of the day into the most convenient airport: LAX, Burbank, Long Beach, Ontario, or Santa Ana for Southern California; SFO or San Jose for Northern California; other airports depending on the state."
        },
        {
          title: "Truck and Supplies Pickup",
          description: "The crew lands, takes a rideshare to pick up the rental truck (one or two trucks depending on move size), grabs any needed moving supplies locally, and brings our own dollies, checked on the flight."
        },
        {
          title: "We Load Your Home",
          description: "The crew arrives at your home and loads everything, wrapping and protecting furniture the same way we do on every Las Vegas move."
        },
        {
          title: "We Drive Straight to Las Vegas",
          description: "Southern California moves are typically loaded and driven the same day. Northern California moves typically take 2 to 3 days, depending on traffic, move size, and other variables."
        },
        {
          title: "The Same Crew Unloads You",
          description: "The movers who loaded you in your old city unload you at your new Las Vegas home. No handoffs, no freight terminals, no other people's belongings on the truck."
        }
      ],
      additionalInfo: "If you are moving to Las Vegas from California, Arizona, Utah, Colorado, Texas, Washington, Oregon, Idaho, or beyond by request, start with a free virtual video walkthrough. You will have an exact quote and a clear plan before you commit to anything.",
      additionalInfoLinks: [
        { text: "Los Angeles to Las Vegas movers", url: "/services/los-angeles-to-las-vegas-movers", context: "Moving from Southern California? See our" },
        { text: "Bay Area to Las Vegas movers", url: "/services/bay-area-to-las-vegas-movers", context: "From the Bay Area or San Jose, see our" },
        { text: "Northern California to Las Vegas movers", url: "/services/northern-california-to-las-vegas-movers", context: "From Sacramento or the Central Valley, see our" }
      ],
      faqs: [
        {
          question: "How does a fly-out move work?",
          answer: "We schedule a virtual video walkthrough and document your full inventory, then agree on a quote and you place a deposit to book. On moving day our Las Vegas crew takes the earliest flight of the day to your city, picks up a rental truck, loads your home, and drives your belongings straight to Las Vegas, where the same crew unloads you."
        },
        {
          question: "Is it really cheaper than hiring California movers?",
          answer: "It often is. Both of our recent fly-out customers, one in San Jose and one in Los Angeles, told us hiring us to fly out cost less than the quotes they received from local California movers. Every move is different, so your exact price comes from your free virtual walkthrough."
        },
        {
          question: "How long does a move from Los Angeles take?",
          answer: "Southern California moves are typically loaded and driven to Las Vegas the same day, depending on traffic, move size, and other variables. Your coordinator keeps you updated so you can plan the unload at your new home."
        },
        {
          question: "How long does a move from Northern California take?",
          answer: "Northern California moves typically take 2 to 3 days from load to unload, depending on traffic, move size, and other variables. Your dedicated coordinator coordinates the arrival and unload time with you."
        },
        {
          question: "Which airports do you fly into?",
          answer: "For Southern California: LAX, Burbank, Long Beach, Ontario, or Santa Ana, whichever is most convenient to your home. For Northern California: SFO or San Jose. For other states we use whichever airport puts our crew closest to you."
        },
        {
          question: "Who handles my belongings?",
          answer: "Our own Las Vegas crew, start to finish. The same movers who load you at your old home unload you at your new one. We never hand your move off to subcontractors, brokers, or third-party carriers."
        },
        {
          question: "Is my stuff on a truck with other people's belongings?",
          answer: "No. The rental truck carries your belongings only. There are no freight terminals, no consolidated shipments, and no shared trailers at any point in the move."
        },
        {
          question: "Do you do virtual estimates?",
          answer: "Yes, every fly-out move starts with one. We do a video walkthrough of your home, room by room, and document the full inventory. Your quote is based on that walkthrough, so there are no surprises on moving day."
        },
        {
          question: "What states do you cover?",
          answer: "Anywhere in California is our primary coverage area, including Los Angeles, Orange County, San Diego, the Inland Empire, the Bay Area, San Jose, Sacramento, and the Central Valley. We also fly out to Arizona, Utah, Colorado, Texas, Washington, Oregon, and Idaho, and beyond by request."
        },
        {
          question: "What about moving supplies like boxes and tape?",
          answer: "We include any supplies you need in your quote during the virtual walkthrough. On moving day the crew picks up those supplies locally in your city, and we bring our own dollies with us on the flight."
        },
        {
          question: "How do I book a fly-out move?",
          answer: "Call 702-533-2853 or use the quote form on this page to schedule your free virtual video walkthrough. Once we agree on a quote, you place a deposit and your move date is locked in."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "Los Angeles to Las Vegas Movers", slug: "los-angeles-to-las-vegas-movers" },
        { title: "Bay Area to Las Vegas Movers", slug: "bay-area-to-las-vegas-movers" },
        { title: "Northern California to Las Vegas Movers", slug: "northern-california-to-las-vegas-movers" },
        { title: "Long Distance Moving", slug: "long-distance-moving" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Summerlin", slug: "summerlin" },
        { title: "Henderson", slug: "henderson" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "los-angeles-to-las-vegas-movers": {
    slug: "los-angeles-to-las-vegas-movers",
    title: "Los Angeles to Las Vegas Movers",
    shortDescription: "Our Las Vegas crew flies into LA, rents a truck locally, loads your home, and drives it to Las Vegas, typically the same day. Schedule a free virtual walkthrough.",
    image: "/assets/blog-vegas-la-cost.jpg",
    heroImage: "/assets/blog-vegas-la-cost.jpg",
    metaTitle: "Los Angeles to Las Vegas Movers | We Fly to You",
    metaDescription: "Moving from Los Angeles to Las Vegas? Our crew flies into LA, loads your home, and drives straight to Vegas, typically the same day. Free virtual walkthrough.",
    ctaHeading: "Schedule Your Free Virtual Walkthrough",
    schemaAreaServed: [
      { type: "City", name: "Los Angeles" },
      { type: "Place", name: "Los Angeles County" },
      { type: "Place", name: "Orange County" },
      { type: "Place", name: "Inland Empire" },
      { type: "City", name: "Long Beach" },
      { type: "City", name: "Burbank" },
      { type: "City", name: "Ontario" },
      { type: "City", name: "Santa Ana" },
      { type: "City", name: "Las Vegas" }
    ],
    content: {
      intro: "Umbrella Movers is a licensed Las Vegas moving company (CPCN 3364, US DOT 2474617) that moves people from Los Angeles to Las Vegas by flying our own crew into Southern California, renting a truck locally, and driving your belongings straight to your new Las Vegas home. Los Angeles moves are typically loaded and driven the same day, depending on traffic, move size, and other variables, and a recent Los Angeles customer told us our fly-out service cost less than hiring a local LA mover for the same move.",
      introLinks: [
        { text: "how our fly-out moving service works", url: "/services/movers-that-fly-to-you", context: "Read the full breakdown of" }
      ],
      contentSections: [
        {
          heading: "Why Hire a Las Vegas Mover for an LA Move?",
          body: [
            "It sounds backwards until you see the quotes. When you hire a Los Angeles moving company for a one-way move to Las Vegas, you are usually paying long-distance rates through a broker, or paying for their truck and crew to drive back to LA empty. When you hire us, our crew takes an early morning flight into whichever airport is closest to you (LAX, Burbank, Long Beach, Ontario, or Santa Ana), picks up a rental truck, and works your move like a local job that happens to end in our hometown.",
            "We recently completed exactly this move for a Los Angeles customer, who told us it was cheaper to have us fly out than to hire a California moving company. Your price depends on your inventory, which is why every move starts with a free virtual video walkthrough and an exact quote."
          ]
        },
        {
          heading: "Loaded and On the Road, Typically the Same Day",
          body: [
            "Los Angeles to Las Vegas is one of the shortest long-distance routes in the country, and our schedule takes advantage of that. The crew lands early, has the truck and any moving supplies by mid-morning, and loads your home. Southern California moves are typically loaded and driven to Las Vegas the same day, depending on traffic, move size, and other variables.",
            "Because it is one crew and one truck the whole way, there is no waiting for a shared trailer, no delivery window that spans a week, and no freight terminal in between. Your dedicated moving coordinator keeps you posted on the drive and coordinates your unload time in Las Vegas."
          ]
        },
        {
          heading: "Covering All of Greater Los Angeles",
          body: [
            "With five airports to choose from, we can start your move efficiently anywhere in the region: the city of Los Angeles, the San Fernando Valley, the South Bay, Long Beach, Orange County, and the Inland Empire. Wherever you are, we fly into the airport that puts the crew closest to your front door."
          ]
        }
      ],
      features: [
        "Free virtual video walkthrough and an exact quote before you book",
        "Crew flies into LAX, Burbank, Long Beach, Ontario, or Santa Ana",
        "Typically loaded and driven to Las Vegas the same day",
        "One or two rental trucks depending on the size of your move",
        "The same crew loads you in LA and unloads you in Las Vegas",
        "Your belongings only, never a shared trailer",
        "A dedicated moving coordinator throughout the move"
      ],
      process: [
        {
          title: "Virtual Walkthrough and Quote",
          description: "We video call, walk your LA home room by room, document the inventory, and give you an exact quote including any moving supplies. A deposit books your date."
        },
        {
          title: "Crew Flies Into LA",
          description: "On moving day our crew takes the earliest flight of the day into the most convenient airport, then takes a rideshare to pick up the rental truck and any supplies."
        },
        {
          title: "Load and Drive",
          description: "We load your home and drive straight to Las Vegas, typically the same day, depending on traffic, move size, and other variables."
        },
        {
          title: "Same Crew Unloads in Las Vegas",
          description: "The movers who loaded you carry everything into your new home. Your coordinator arranges the unload time that works for you."
        }
      ],
      additionalInfo: "We handle fly-out moves from all of Southern California, not just Los Angeles. If you are coming from San Diego, Orange County, or the Inland Empire, the process works the same way: schedule a free virtual walkthrough and we take it from there.",
      additionalInfoLinks: [
        { text: "We Fly to You: Long-Distance Moves to Las Vegas", url: "/services/movers-that-fly-to-you", context: "See the full service overview at" },
        { text: "Northern California to Las Vegas movers", url: "/services/northern-california-to-las-vegas-movers", context: "Moving from farther north? See our" }
      ],
      faqs: [
        {
          question: "How much does a move from Los Angeles to Las Vegas cost?",
          answer: "Your exact quote comes from a free virtual video walkthrough of your home, so it reflects your actual inventory. Our fly-out model is often more affordable than hiring a local California mover, and a recent Los Angeles customer reported exactly that after comparing quotes."
        },
        {
          question: "How long does a Los Angeles to Las Vegas move take?",
          answer: "Los Angeles moves are typically loaded and driven to Las Vegas the same day, depending on traffic, move size, and other variables. Your dedicated coordinator keeps you updated and schedules the unload with you."
        },
        {
          question: "Which LA airports does your crew fly into?",
          answer: "LAX, Burbank, Long Beach, Ontario, or Santa Ana, whichever is most convenient to your home. That lets us serve the whole region, from the San Fernando Valley to Orange County and the Inland Empire."
        },
        {
          question: "Will my belongings share a truck with other shipments?",
          answer: "No. We rent a truck (or two, depending on move size) just for your move, load your belongings, and drive them straight to Las Vegas. No freight terminals and no consolidation with other households."
        },
        {
          question: "Do I need to meet you at the truck rental or airport?",
          answer: "No. The crew handles the flight, the rideshare, the truck pickup, and the supplies on their own. You just need to be at your home for the load, and at your new Las Vegas home for the unload."
        },
        {
          question: "How do I get started?",
          answer: "Call 702-533-2853 or use the quote form on this page to schedule your free virtual video walkthrough. We document your inventory on the call and follow up with an exact quote."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "We Fly to You: Long-Distance Moves to Las Vegas", slug: "movers-that-fly-to-you" },
        { title: "Bay Area to Las Vegas Movers", slug: "bay-area-to-las-vegas-movers" },
        { title: "Long Distance Moving", slug: "long-distance-moving" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "bay-area-to-las-vegas-movers": {
    slug: "bay-area-to-las-vegas-movers",
    title: "Bay Area to Las Vegas Movers",
    shortDescription: "Moving from San Jose, San Francisco, or anywhere in the Bay Area? Our Las Vegas crew flies into SFO or San Jose, loads your home, and drives it to Las Vegas.",
    image: "/images/move1-truck-home.jpeg",
    heroImage: "/images/move1-truck-home.jpeg",
    metaTitle: "Bay Area & San Jose to Las Vegas Movers | We Fly to You",
    metaDescription: "Moving from the Bay Area or San Jose to Las Vegas? Our crew flies into SFO or San Jose, loads your home, and drives it to Vegas. Free virtual walkthrough.",
    ctaHeading: "Schedule Your Free Virtual Walkthrough",
    schemaAreaServed: [
      { type: "Place", name: "San Francisco Bay Area" },
      { type: "City", name: "San Jose" },
      { type: "City", name: "San Francisco" },
      { type: "City", name: "Oakland" },
      { type: "Place", name: "Silicon Valley" },
      { type: "Place", name: "East Bay" },
      { type: "Place", name: "Peninsula" },
      { type: "City", name: "Las Vegas" }
    ],
    content: {
      intro: "Umbrella Movers is a licensed Las Vegas moving company (CPCN 3364, US DOT 2474617) that moves people from the Bay Area to Las Vegas by flying our crew into SFO or San Jose, renting a truck locally, loading your home, and driving your belongings to Las Vegas. We recently completed this exact move for a San Jose customer, who told us it cost less than hiring a local Bay Area moving company. Bay Area moves typically take 2 to 3 days from load to unload, depending on traffic, move size, and other variables.",
      introLinks: [
        { text: "how our fly-out moving service works", url: "/services/movers-that-fly-to-you", context: "Get the full picture of" }
      ],
      contentSections: [
        {
          heading: "We Just Did This Move from San Jose",
          body: [
            "This is not a service we are hoping to try someday. We recently flew a crew into San Jose, picked up a rental truck, loaded the customer's home, and drove their belongings to Las Vegas, where the same crew unloaded them. The customer compared our quote against local Bay Area movers and told us hiring us to fly out was the cheaper option.",
            "That is their reported experience rather than a guarantee, because every home is different. Your own number comes from a free virtual video walkthrough, where we document your full inventory before you commit to anything."
          ]
        },
        {
          heading: "How a Bay Area to Las Vegas Move Runs",
          body: [
            "Our crew books the earliest flight of the day into SFO or San Jose, whichever puts them closer to your home. They land, take a rideshare to the truck rental, pick up any moving supplies locally, and bring our own dollies, which fly with them as checked baggage. Then they load your home the same way we load every home in Las Vegas: furniture wrapped, boxes stacked tight, nothing left to shift on the drive.",
            "From there the crew drives to Las Vegas. Northern California moves typically take 2 to 3 days from load to unload, depending on traffic, move size, and other variables. Your dedicated moving coordinator stays in touch the whole way and sets an unload time that works for you."
          ]
        },
        {
          heading: "Serving the Whole Bay Area",
          body: [
            "San Jose and Silicon Valley, San Francisco, the Peninsula, the East Bay, the North Bay: with two airports to work from, we can start a move efficiently anywhere in the region. If you are outside the Bay Area, in Sacramento or the Central Valley, we cover those routes too on our Northern California service."
          ]
        }
      ],
      features: [
        "Free virtual video walkthrough and an exact quote before you book",
        "Crew flies into SFO or San Jose, whichever is closer to you",
        "Typically 2 to 3 days from load to unload",
        "One or two rental trucks depending on the size of your move",
        "The same crew loads you in the Bay Area and unloads you in Las Vegas",
        "Your belongings only, never a shared trailer",
        "A dedicated moving coordinator throughout the move"
      ],
      process: [
        {
          title: "Virtual Walkthrough and Quote",
          description: "We video call, go through your home room by room, and document the full inventory. You get an exact quote including any moving supplies, and a deposit books your date."
        },
        {
          title: "Crew Flies Into SFO or San Jose",
          description: "On moving day the crew takes the earliest flight of the day, picks up the rental truck by rideshare, and grabs any needed supplies locally."
        },
        {
          title: "Load and Drive",
          description: "We load your home and head for Las Vegas. Bay Area moves typically take 2 to 3 days, depending on traffic, move size, and other variables."
        },
        {
          title: "Same Crew Unloads in Las Vegas",
          description: "The movers who loaded you carry everything into your new Las Vegas home at a time your coordinator arranges with you."
        }
      ],
      additionalInfo: "If you are weighing a Bay Area mover against a container service or a rental truck you drive yourself, get our quote first. It is free, it is based on a real inventory from your virtual walkthrough, and our recent San Jose customer found it beat hiring a local mover.",
      additionalInfoLinks: [
        { text: "We Fly to You: Long-Distance Moves to Las Vegas", url: "/services/movers-that-fly-to-you", context: "See the full service overview at" },
        { text: "Northern California to Las Vegas movers", url: "/services/northern-california-to-las-vegas-movers", context: "In Sacramento or the Central Valley? See our" }
      ],
      faqs: [
        {
          question: "How long does a Bay Area to Las Vegas move take?",
          answer: "Bay Area and Northern California moves typically take 2 to 3 days from load to unload, depending on traffic, move size, and other variables. Your dedicated coordinator keeps you updated throughout and schedules the unload with you."
        },
        {
          question: "Is it cheaper than hiring a Bay Area moving company?",
          answer: "It often is. Our recent San Jose customer compared quotes and told us hiring us to fly out cost less than hiring a local Bay Area mover. Your exact price depends on your inventory, which we document in a free virtual video walkthrough."
        },
        {
          question: "Which airports do you fly into for Bay Area moves?",
          answer: "SFO or San Jose, whichever puts the crew closer to your home. From there they take a rideshare to the truck rental and come straight to you."
        },
        {
          question: "Do you serve San Francisco and the East Bay, or just San Jose?",
          answer: "The whole Bay Area: San Jose and Silicon Valley, San Francisco, the Peninsula, the East Bay, and the North Bay. We also cover Sacramento and the Central Valley through our Northern California service."
        },
        {
          question: "Who unloads my belongings in Las Vegas?",
          answer: "The exact same crew that loaded you in the Bay Area. There are no handoffs, no freight terminals, and no other households' belongings on the truck."
        },
        {
          question: "How do I book a Bay Area to Las Vegas move?",
          answer: "Call 702-533-2853 or use the quote form on this page to schedule your free virtual video walkthrough. Once you approve the quote, a deposit locks in your date."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "We Fly to You: Long-Distance Moves to Las Vegas", slug: "movers-that-fly-to-you" },
        { title: "Northern California to Las Vegas Movers", slug: "northern-california-to-las-vegas-movers" },
        { title: "Long Distance Moving", slug: "long-distance-moving" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
        { title: "Summerlin", slug: "summerlin" },
        { title: "Henderson", slug: "henderson" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "northern-california-to-las-vegas-movers": {
    slug: "northern-california-to-las-vegas-movers",
    title: "Northern California to Las Vegas Movers",
    shortDescription: "From Sacramento, the Central Valley, or anywhere in Northern California, our Las Vegas crew flies to you, loads your home, and drives your belongings to Las Vegas.",
    image: "/assets/hero-trucks.jpg",
    heroImage: "/assets/hero-trucks.jpg",
    metaTitle: "Northern California to Las Vegas Movers | We Fly to You",
    metaDescription: "Moving from Sacramento, the Central Valley, or anywhere in Northern California? Our crew flies to you and moves you to Las Vegas. Free virtual walkthrough.",
    ctaHeading: "Schedule Your Free Virtual Walkthrough",
    schemaAreaServed: [
      { type: "Place", name: "Northern California" },
      { type: "City", name: "Sacramento" },
      { type: "Place", name: "Central Valley" },
      { type: "City", name: "Stockton" },
      { type: "City", name: "Modesto" },
      { type: "City", name: "Fresno" },
      { type: "City", name: "Las Vegas" }
    ],
    content: {
      intro: "Umbrella Movers is a licensed Las Vegas moving company (CPCN 3364, US DOT 2474617) that moves people from Northern California to Las Vegas. Our own crew flies into SFO or San Jose, rents a truck, drives to your home anywhere in the region, loads everything, and hauls it to Las Vegas, where the same crew unloads you. Northern California moves typically take 2 to 3 days from load to unload, depending on traffic, move size, and other variables, and customers on our recent fly-out moves reported it cost less than hiring a local California mover.",
      introLinks: [
        { text: "how our fly-out moving service works", url: "/services/movers-that-fly-to-you", context: "Read the full explanation of" }
      ],
      contentSections: [
        {
          heading: "Good Movers Are Hard to Find Outside the Big Metros",
          body: [
            "If you live in Sacramento, Stockton, Modesto, Fresno, or a smaller Northern California town, your local moving options for a one-way move to Las Vegas can be thin: a couple of national van lines with long delivery windows, brokers who resell your move to a carrier you have never met, or driving a rental truck yourself. Our fly-out service gives you a fourth option: a licensed, insured Las Vegas crew that treats your move like a local job.",
            "The crew flies into SFO or San Jose, picks up a rental truck and any moving supplies, and drives out to your home, wherever in Northern California it is. Everything is loaded by our movers, driven by our movers, and unloaded by the same movers at your new Las Vegas home."
          ]
        },
        {
          heading: "What the Timeline Looks Like",
          body: [
            "Northern California is the longer of our two main California routes, so plan on the move typically taking 2 to 3 days from load to unload, depending on traffic, move size, and other variables. Depending on your location and the size of the job, loading may happen the day the crew lands or the following morning, and the drive to Las Vegas follows.",
            "Through all of it you have a dedicated moving coordinator you can reach directly. They coordinate the crew's arrival at your home, keep you posted on the drive, and set an unload time at your new place that fits your travel plans."
          ]
        },
        {
          heading: "Your Belongings Never Change Hands",
          body: [
            "The standard long-distance industry model moves your belongings through freight terminals and shared 53-foot trailers, with different people touching your things at each step. Our model is simpler: one crew, one truck (or two for larger homes), your belongings only. We recently ran fly-out moves from San Jose and Los Angeles on exactly this model, and both customers told us it was cheaper than hiring a California moving company."
          ]
        }
      ],
      features: [
        "Free virtual video walkthrough and an exact quote before you book",
        "Serving Sacramento, the Central Valley, and all of Northern California",
        "Crew flies into SFO or San Jose and drives to your door",
        "Typically 2 to 3 days from load to unload",
        "The same crew loads and unloads, no handoffs or freight terminals",
        "Your belongings only, never a shared trailer",
        "A dedicated moving coordinator throughout the move"
      ],
      process: [
        {
          title: "Virtual Walkthrough and Quote",
          description: "We video call and document your full inventory room by room, then give you an exact quote including any moving supplies. A deposit books your date."
        },
        {
          title: "Crew Flies In and Drives to You",
          description: "The crew takes the earliest flight of the day into SFO or San Jose, picks up the rental truck and supplies, and drives to your home anywhere in Northern California."
        },
        {
          title: "Load and Haul to Las Vegas",
          description: "We load everything and make the drive. Northern California moves typically take 2 to 3 days, depending on traffic, move size, and other variables."
        },
        {
          title: "Same Crew Unloads You",
          description: "The movers who loaded your home carry everything into your new Las Vegas home at a time your coordinator sets with you."
        }
      ],
      additionalInfo: "Closer to the coast? Our Bay Area to Las Vegas page covers San Jose, San Francisco, and the surrounding metro in detail. Wherever in Northern California you are starting from, the first step is the same: a free virtual video walkthrough and an exact quote.",
      additionalInfoLinks: [
        { text: "Bay Area to Las Vegas movers", url: "/services/bay-area-to-las-vegas-movers", context: "See our" },
        { text: "We Fly to You: Long-Distance Moves to Las Vegas", url: "/services/movers-that-fly-to-you", context: "or the full service overview at" }
      ],
      faqs: [
        {
          question: "Do you really come out to Sacramento and the Central Valley?",
          answer: "Yes. Our crew flies into SFO or San Jose, picks up a rental truck, and drives to your home anywhere in Northern California, including Sacramento, Stockton, Modesto, Fresno, and the surrounding areas."
        },
        {
          question: "How long does a Northern California to Las Vegas move take?",
          answer: "Typically 2 to 3 days from load to unload, depending on traffic, move size, and other variables. Your dedicated coordinator keeps you updated and arranges the unload time with you."
        },
        {
          question: "Is this cheaper than hiring a local California mover?",
          answer: "It often is. Customers on our recent fly-out moves from San Jose and Los Angeles both told us our quote beat what local California movers wanted for the same move. Your exact price comes from a free virtual video walkthrough of your home."
        },
        {
          question: "Who drives the truck with my belongings?",
          answer: "Our own movers, the same crew that loaded your home. Your belongings stay on one truck from your driveway in Northern California to your driveway in Las Vegas, with no freight terminals or carrier handoffs."
        },
        {
          question: "What if I am moving from somewhere else in the West?",
          answer: "We also fly out for moves from Arizona, Utah, Colorado, Texas, Washington, Oregon, and Idaho, and beyond by request. Contact us with your city and we will confirm coverage and set up your virtual walkthrough."
        },
        {
          question: "How do I schedule the virtual walkthrough?",
          answer: "Call 702-533-2853 or use the quote form on this page. We set up a video call, go through your home room by room, and follow up with an exact quote before you commit to anything."
        }
      ]
    },
    relatedContent: {
      services: [
        { title: "We Fly to You: Long-Distance Moves to Las Vegas", slug: "movers-that-fly-to-you" },
        { title: "Bay Area to Las Vegas Movers", slug: "bay-area-to-las-vegas-movers" },
        { title: "Los Angeles to Las Vegas Movers", slug: "los-angeles-to-las-vegas-movers" }
      ],
      locations: [
        { title: "Las Vegas", slug: "las-vegas" },
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
    metaDescription: "Expert packing services in Las Vegas. Quality materials, trained packers, special handling for fragile items. Woman-owned. Estimate your packing service.",
    h1: "Packing Services in Las Vegas",
    ctaLabel: "Estimate My Packing Service",
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
    h1: "Storage Solutions in Las Vegas",
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
    h1: "Specialty Movers in Las Vegas",
    content: {
      intro: "Some items require extra care, specialized equipment, and trained expertise. Umbrella Movers' specialty moving services are designed for pianos, antiques, fine art, and other valuable or delicate items that need more than standard moving procedures.",
      features: [
        "Piano moving expertise (uprights and grands)",
        "Antique furniture handling",
        "Fine art and sculpture transport",
        "Gun safe and vault moving",
        "Hot tub and spa relocation",
        "Pool table disassembly and setup",
        "Custom packing for fragile and high-value items"
      ],
      process: [
        {
          title: "Expert Consultation",
          description: "Our specialty moving coordinator assesses your items and develops a custom handling plan."
        },
        {
          title: "Proper Equipment",
          description: "We use specialized equipment including piano boards, custom packing for art, and custom padding as needed."
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
    metaDescription: "Professional piano moving in Las Vegas. Specialized equipment for uprights and grands. Woman-owned, fully insured. Get your piano moving price.",
    h1: "Piano Movers in Las Vegas",
    quoteFormMode: "piano",
    ctaLabel: "Get My Piano Moving Price",
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
    shortDescription: "A defined, protection-first moving service for luxury homes, high-value furnishings, art, and specialty deliveries across Las Vegas. Full packing, floor and wall protection, room-by-room placement, and the same crew from load to unload.",
    image: "/images/white-glove-moving.png",
    heroImage: "/images/move1-truck.jpeg",
    metaTitle: "White Glove Movers Las Vegas",
    metaDescription: "White glove movers in Las Vegas for luxury homes, fine art, antiques, designer cabinetry, and specialty deliveries. Full protection, packing, placement, and HOA and high-rise coordination. Woman-owned and insured.",
    h1: "White Glove Movers in Las Vegas",
    ctaHeading: "Schedule a White-Glove Walkthrough",
    ctaLabel: "Schedule a Walkthrough",
    ctaSupport: "A move coordinator walks your home or project with you, notes every item that needs special handling, and builds a written plan before moving day.",
    ctaSecondary: "Get a Free Quote",
    content: {
      intro: "White glove moving at Umbrella Movers is a defined service, not a label. It means every surface in your home is protected before the first item moves, every piece is packed and wrapped to match its value, and the same crew that loads your belongings is the crew that places them in your new home. It is the service we run for estates in The Ridges and Summerlin, for designer cabinetry deliveries into new builds, and for homes where the furniture, art, and electronics are worth doing right.",
      introLinks: [
        { text: "protection-first standards", url: "/why-choose-us", context: "Read about our" },
        { text: "high-rise condo moving", url: "/services/high-rise-moving", context: "For tower moves with freight elevators and COIs, see our" }
      ],
      contentSections: [
        {
          heading: "What White Glove Moving Includes",
          body: [
            "Every white glove move starts with an in-home walkthrough. A move coordinator goes room by room with you, documents high-value and fragile items, checks doorways, stairs, elevators, and access points, and turns that into a written plan with crew size, truck count, and materials.",
            "On moving day the crew protects the home before touching furniture. That means floor runners on hard surfaces, carpet shield, padded doorway and jamb protection, wall corner guards on tight turns, and elevator pads where a building requires them. The same protection goes down at the destination before the first item is carried in.",
            "Items are wrapped and packed to match their value: custom packing and double-boxing for art and mirrors, blanket wrap and stretch wrap on every furniture piece, screen protection for TVs, and hardware bagged and labeled so reassembly is straightforward. Gym equipment, safes, and oversized pieces are disassembled where appropriate and moved with the right equipment."
          ]
        },
        {
          heading: "Specialty Items We Handle",
          body: [
            "Fine art, mirrors, and framed pieces are packed in custom or double-walled cartons with corner protection and carried flat or upright as the piece requires. Antiques and heirloom furniture are blanket-wrapped and padded at every contact point.",
            "Televisions and monitors are dismounted from walls when needed, screen-protected, and boxed. Designer cabinetry, custom millwork, and specialty furniture are wrapped and moved as coordinated deliveries, including into active new-construction homes. Ellipticals, treadmills, StairMasters, and other heavy gym equipment are disassembled, padded, and moved with dollies and ramps built for the weight.",
            "Pianos, safes, hot tubs, and other oversized items are handled under the same standard with the right crew size and equipment."
          ]
        },
        {
          heading: "Packing, Unpacking, and Room-by-Room Placement",
          body: [
            "White glove service can include full packing of the entire home, partial packing of kitchens and fragile rooms, or protection-only handling of furniture you have already packed. Boxes are labeled by room and by contents so nothing has to be opened to figure out where it belongs.",
            "At the destination the crew places furniture where you want it, unpacks to the level you have chosen, and removes the packing materials we brought. You walk the home with the crew lead at the end and confirm every room before the truck leaves."
          ]
        },
        {
          heading: "Inventory, Labeling, and Staging",
          body: [
            "High-value moves get a written inventory of specialty items at the walkthrough, updated as the crew packs. Boxes and wrapped pieces are labeled and color-coded by room. Items are staged in the truck by destination room so unloading happens in the right order, and staging areas at the new home keep hallways and finished floors clear while rooms are set."
          ]
        },
        {
          heading: "HOA, Gated Community, High-Rise, and COI Coordination",
          body: [
            "Many white glove moves happen inside guard-gated communities and towers with their own rules. We coordinate gate access and crew arrival with the community, deliver certificates of insurance to HOAs and building management ahead of the move, reserve freight elevators and loading docks, and follow each building's protection requirements for hallways and elevators. If a community has its own safety procedures for new builds, the crew follows them."
          ]
        },
        {
          heading: "Same Crew From Load to Unload",
          body: [
            "The crew that packs and loads your home is the crew that unloads and places it. They know how each piece was wrapped, where the fragile boxes are, and which room everything belongs in. Customers tell us this is the single biggest difference they notice."
          ]
        }
      ],
      features: [
        "In-home walkthrough and written move plan",
        "Floor runners, carpet shield, doorway, wall corner, and elevator protection at both homes",
        "Custom packing and double-boxing for art, mirrors, and fragile pieces",
        "Blanket wrap and stretch wrap on every furniture piece",
        "TV and monitor dismounting with screen protection",
        "Designer cabinetry and specialty furniture deliveries",
        "Gym equipment, safe, and oversized item disassembly and handling",
        "Full or partial packing, labeled by room and contents",
        "Written inventory of high-value items",
        "HOA, gated community, high-rise, and COI coordination",
        "Room-by-room furniture placement and unpacking",
        "Packing materials we brought removed at the end",
        "Same crew from load to unload, with a final walkthrough"
      ],
      process: [
        { title: "Walkthrough", description: "A move coordinator walks your home, documents specialty items, checks access at both ends, and delivers a written plan and quote." },
        { title: "Coordination", description: "Gate access, COIs, elevator reservations, and building rules are handled with your HOA or building before moving day." },
        { title: "Protect and Pack", description: "The crew protects floors, doorways, and walls, then wraps, packs, and labels everything to match its value." },
        { title: "Place and Walk Through", description: "The same crew unloads room by room, places furniture, unpacks to your chosen level, clears our materials, and walks the home with you." }
      ],
      additionalInfo: "White glove service is the right fit for luxury homes and estates, designer and specialty deliveries, art and antique collections, and any move where you want a hands-off experience with a written plan behind it.",
      additionalInfoLinks: [
        { text: "piano moving expertise", url: "/services/piano-moving", context: "For pianos, see our" },
        { text: "large item moving", url: "/services/large-item-moving", context: "For safes, hot tubs, and oversized pieces, see" }
      ],
      faqs: [
        {
          question: "What is the difference between white glove moving and a standard move?",
          answer: "A standard move loads, transports, and unloads your belongings. White glove moving adds an in-home walkthrough and written plan, full protection of floors, doorways, and walls at both homes, custom packing matched to the value of each item, a written inventory of specialty pieces, room-by-room placement and unpacking, and the same crew from load to unload."
        },
        {
          question: "Do you handle fine art, antiques, and mirrors?",
          answer: "Yes. Art, mirrors, and framed pieces are custom packed in double-walled cartons with corner protection. Antiques and heirloom furniture are blanket-wrapped and padded at every contact point and carried by hand where needed."
        },
        {
          question: "Can you take TVs off the wall?",
          answer: "Yes. We dismount TVs and monitors, protect the screens, and box them for transport."
        },
        {
          question: "Do you coordinate with HOAs and high-rise buildings?",
          answer: "Yes. We deliver certificates of insurance, arrange gate access, reserve freight elevators and loading docks, and follow each building's protection requirements. This is standard on white glove moves in Summerlin, Henderson, and the Strip corridor towers."
        },
        {
          question: "Is the same crew there for the whole move?",
          answer: "Yes. The crew that packs and loads is the crew that unloads and places. For multi-day or long-distance white glove moves we keep the crew lead consistent so nothing is lost in handoff."
        },
        {
          question: "How do I get a white glove quote?",
          answer: "Schedule a walkthrough. A move coordinator visits your home or project site, documents what needs special handling, and sends a written plan and quote. There is no charge for the walkthrough."
        }
      ]
    },
    featuredMoves: [
      "ridges-to-southern-highlands-luxury-home-move",
      "summit-summerlin-designer-cabinetry-delivery"
    ],
    reviews: [
      { text: "Same crew from start to finish made all the difference. They knew exactly where everything was and how it was packed. Will definitely use Umbrella Movers again!", author: "Michael R.", location: "Summerlin, NV" },
      { text: "Outstanding service! They handled our fragile items with extreme care and were incredibly efficient. Worth every penny.", author: "David L.", location: "North Las Vegas, NV" },
      { text: "Best movers in Las Vegas! The team was professional, careful with our belongings, and made our move stress-free. So glad to support a woman-owned business!", author: "Sarah M.", location: "Henderson, NV" }
    ],
    relatedContent: {
      services: [
        { title: "High Rise Moving", slug: "high-rise-moving" },
        { title: "Specialty Moving", slug: "specialty-moving" },
        { title: "Packing Services", slug: "packing-services" },
        { title: "Piano Moving", slug: "piano-moving" }
      ],
      locations: [
        { title: "Summerlin", slug: "summerlin" },
        { title: "The Ridges", slug: "the-ridges" },
        { title: "Henderson", slug: "henderson" },
        { title: "MacDonald Highlands", slug: "macdonald-highlands" }
      ]
    },
    proofLinks: [
      { text: "recent white-glove moves", url: "/recent-moves", context: "See photos from" },
      { text: "300+ verified reviews", url: "/#testimonials", context: "Read our" },
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
    h1: "Large Item Movers in Las Vegas",
    content: {
      intro: "Some items are too large, heavy, or awkward for standard moving. Umbrella Movers has the specialized equipment and trained personnel to safely move your oversized possessions.",
      features: [
        "Gun safe and vault moving",
        "Hot tub and spa relocation",
        "Oversized furniture handling",
        "Pool table disassembly and setup",
        "Exercise equipment moving",
        "Appliance moving",
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
  "senior-moving": {
    slug: "senior-moving",
    title: "Senior Moving & Downsizing",
    shortDescription: "Patient, respectful moves for seniors and families, built around 55+ community rules, downsizing decisions, and a pace that does not rush anyone.",
    image: "/assets/blog-senior-downsizing.jpg",
    heroImage: "/assets/blog-senior-downsizing.jpg",
    metaTitle: "Senior Movers Las Vegas | 55+ Community & Downsizing",
    metaDescription: "Senior movers in Las Vegas. Patient, respectful downsizing and 55+ community moves with storage coordination. Woman-owned and licensed. Get your estimate.",
    h1: "Senior Movers in Las Vegas",
    ctaLabel: "Get My Senior Moving Estimate",
    ctaSupport: "We will walk the home at your pace and give you a written estimate with no pressure and no deposit to hold a date.",
    content: {
      intro: "A senior move is rarely just a move. It is often a house someone has lived in for thirty years, a family trying to help from out of state, and a new place that is a good deal smaller. Umbrella Movers has spent fifteen years doing this work across Las Vegas, Henderson, and the valley's 55+ communities, and the thing that matters most is pace. We are WBENC-certified and woman-owned, licensed under CPCN 3364 and fully insured, and the same crew that loads your home unloads it.",
      introLinks: [
        { text: "downsizing guide for seniors", url: "/blog/downsizing-tips-seniors", context: "Planning ahead? Read our" }
      ],
      features: [
        "Patient, respectful handling with no rushing on move day",
        "55+ community gate access, timing, and elevator coordination",
        "Downsizing moves where only part of the home is coming",
        "Storage coordination when the new place is not ready yet",
        "Packing and unpacking, including full white-glove service",
        "Furniture placement and arrangement in the new home",
        "Medical equipment and hospital beds moved and set up",
        "Same crew from start to finish, background-checked"
      ],
      process: [
        {
          title: "A Walkthrough With No Pressure",
          description: "We walk the home with you and whoever is helping, room by room, at whatever pace suits. You get a written estimate afterward. There is no deposit required to hold a date."
        },
        {
          title: "Tell Us What Is Coming",
          description: "Downsizing means some things stay behind. You and your family decide what makes the trip, and we load and move exactly what you point us to."
        },
        {
          title: "Packed and Moved at Your Pace",
          description: "We pack whatever you have asked us to pack, from a few rooms to the whole house, then protect and load it. Fragile and sentimental items are handled separately. If the day needs to slow down, it slows down."
        },
        {
          title: "Set Up, Not Just Delivered",
          description: "We place the furniture where you want it, unpack as much as you would like, and take away the packing materials we brought so you are not living around a stack of boxes."
        }
      ],
      contentSections: [
        {
          heading: "Moving into a 55+ community",
          body: [
            "Sun City Summerlin, Sun City Anthem, Siena, and the valley's other active adult communities each have their own rules: gate access lists, permitted move hours, elevator reservations, and where a truck is allowed to park. We handle that coordination with the community before move day rather than discovering it at the gate.",
            "The same applies to independent and assisted living residences, which usually have tighter move windows and a loading entrance that is not the front door."
          ]
        },
        {
          heading: "Downsizing without the pressure",
          body: [
            "Most senior moves are downsizing moves, which means the hard part happens before the truck arrives. Once you and your family have settled what is coming, tell us and we handle it from there.",
            "What we do not do is push. There is no upsell on move day and no deposit to hold your date. If you need a second walkthrough because a family member wants to be there, that is normal and it is free."
          ]
        },
        {
          heading: "When the new place is not ready",
          body: [
            "Timing rarely lines up cleanly. If the new residence is not available yet, we can coordinate storage and move your belongings in when it is, so you are not paying for a rushed close or a hotel stay full of boxes.",
            "That coordination is part of the same job with the same crew, not a handoff to a third party."
          ]
        },
        {
          heading: "Packing as much or as little as you want",
          body: [
            "Some families pack everything themselves and just want the heavy work done. Others want us to walk in and handle all of it. Both are normal.",
            "Tell us what you want packed and we will pack it, from a few rooms of fragile and sentimental items up to a full white-glove pack of the entire house. We bring the materials, and we take them away again once you are unpacked."
          ]
        }
      ],
      faqs: [
        {
          question: "Can you work with the rules at a 55+ community or assisted living residence?",
          answer: "Yes, and we confirm them in advance. Gate access lists, permitted move hours, elevator reservations, and truck parking get sorted with the community before move day, so the crew is not held up at the entrance."
        },
        {
          question: "What if the new place is not ready when I have to be out?",
          answer: "We can coordinate storage and move you in when it is available. It stays one job with the same crew rather than a handoff, so nothing gets lost between two companies."
        },
        {
          question: "Can you move a hospital bed or medical equipment?",
          answer: "Yes. We move and set up hospital beds and durable medical equipment, and we can transport a bed back to the supplier or on to another address if one is being replaced."
        },
        {
          question: "Is a family member able to handle this from out of state?",
          answer: "Yes, that is common. We can do the walkthrough with an adult child on video, send the written estimate to whoever is coordinating, and keep a single point of contact updated through the day."
        }
      ],
      additionalInfo: "Senior moves are quoted on the size of the move, the access at both ends, and how much packing you want us to do. A walkthrough is free and there is no deposit to hold a date."
    },
    relatedContent: {
      services: [
        { title: "White Glove Moving", slug: "white-glove-moving" },
        { title: "Packing Services", slug: "packing-services" },
        { title: "Storage Solutions", slug: "storage-solutions" },
        { title: "Medical Equipment & Hospital Bed Moving", slug: "medical-equipment-movers-las-vegas" }
      ],
      locations: [
        { title: "Sun City Summerlin", slug: "sun-city-summerlin" },
        { title: "Anthem", slug: "anthem" },
        { title: "Henderson", slug: "henderson" },
        { title: "Summerlin", slug: "summerlin" }
      ]
    },
    proofLinks: [
      { text: "verified reviews", url: "/#testimonials", context: "Read our" },
      { text: "licensed credentials", url: "/why-choose-us", context: "Verify our" }
    ]
  },
  "apartment-moving": {
    slug: "apartment-moving",
    title: "Apartment Moving",
    shortDescription: "Efficient apartment moves with elevator coordination, tight space navigation, and building rule compliance.",
    image: "/images/apartment-moving.jpeg",
    heroImage: "/images/apartment-moving.jpeg",
    metaTitle: "Apartment Moving Las Vegas | Apartment Movers",
    metaDescription: "Professional apartment moving in Las Vegas. Elevator coordination, tight spaces, building compliance. Woman-owned & insured. Get your apartment move price.",
    h1: "Apartment Movers in Las Vegas",
    ctaLabel: "Get My Apartment Move Price",
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
    h1: "High-Rise Movers in Las Vegas",
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
    metaDescription: "Fast, affordable local moving in Las Vegas. Transparent hourly rates, same-day availability. Woman-owned & licensed. Check your date and see local pricing.",
    h1: "Local Movers in Las Vegas",
    ctaLabel: "Check My Date & See Local Pricing",
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
    h1: "Renovation Moving Services in Las Vegas",
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
          answer: "We use professional-grade moving blankets, shrink wrap, and custom packing for delicate items. In our climate-controlled storage facility, items are kept clean, dry, and away from any construction debris."
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

// The commercial cluster gets its own top-level nav menu, so it is excluded from
// the general Services dropdown to avoid listing the same page twice.
export const commercialServiceSlugs = [
  "commercial-moving",
  "office-movers-las-vegas",
  "retail-store-movers-las-vegas",
  "restaurant-equipment-movers-las-vegas",
  "hotel-ffe-movers-las-vegas",
] as const;

export const commercialServices = commercialServiceSlugs.map((slug) => servicesData[slug]);

export const generalServices = servicesList.filter(
  (service) => !commercialServiceSlugs.includes(service.slug as (typeof commercialServiceSlugs)[number])
);

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
