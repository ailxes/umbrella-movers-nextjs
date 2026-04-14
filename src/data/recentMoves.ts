export interface MovePhoto {
  src: string;
  alt: string;
}

export interface ProtectionChecklistItem {
  text: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface RecentMove {
  id: string;
  neighborhood: string;
  homeType: string;
  moveDetails: string;
  crewSize: string;
  photos: MovePhoto[];
  protectionChecklist: ProtectionChecklistItem[];
  relatedServices: RelatedLink[];
  relatedAreas: RelatedLink[];
  summary: string;
}

export const recentMoves: RecentMove[] = [
  {
    id: "move-ridges-southern-highlands",
    neighborhood: "The Ridges to Southern Highlands Country Club",
    homeType: "5,000 sq ft Two-Story Home",
    moveDetails: "Full home move with 8 new curved style TVs & home security monitors needing to be dismounted. Also with large heavy/awkward gym equipment including elliptical & treadmill.",
    crewSize: "5 movers + 2 trucks",
    photos: [
      { src: "/images/move1-truck.jpeg", alt: "Umbrella Movers truck at The Ridges luxury home" },
      { src: "/images/move1-stairmaster-loading.jpeg", alt: "Loading StairMaster gym equipment onto truck" },
      { src: "/images/move1-stairmaster-unload.jpeg", alt: "Mover unloading StairMaster with protective mat" },
      { src: "/images/move1-truck-home.jpeg", alt: "Umbrella Movers truck at Southern Highlands destination" },
    ],
    protectionChecklist: [
      { text: "TV screens wrapped with specialized protection" },
      { text: "Gym equipment disassembled and padded" },
      { text: "Floor runners throughout both homes" },
    ],
    relatedServices: [
      { label: "Residential Moving", href: "/services/residential-moving" },
      { label: "Large Item Moving", href: "/services/large-item-moving" },
      { label: "White-Glove Moving", href: "/services/white-glove-moving" },
      { label: "Local Moving", href: "/services/local-moving" },
    ],
    relatedAreas: [
      { label: "Summerlin", href: "/locations/summerlin" },
      { label: "Southern Highlands", href: "/locations/southern-highlands" },
      { label: "Henderson", href: "/locations/henderson" },
    ],
    summary: "5,000 sq ft home with 8 curved TVs, security monitors, and heavy gym equipment.",
  },
  {
    id: "move-chinatown-restaurant",
    neighborhood: "Chinatown",
    homeType: "4,000 sq ft Local Restaurant",
    moveDetails: "Full restaurant move including tables, chairs, large industrial kitchen equipment and shelves.",
    crewSize: "4 movers + 2 trucks",
    photos: [
      { src: "/images/move2-truck-storefront.jpg", alt: "Umbrella Movers truck at Pho So 1 Vietnamese Restaurant" },
      { src: "/images/move2-restaurant-loading.jpg", alt: "Loading restaurant tables and chairs" },
      { src: "/images/move2-loading-shelves.jpg", alt: "Mover loading metal shelving into truck" },
      { src: "/images/move2-truck-equipment.jpg", alt: "Industrial kitchen equipment staged for loading" },
      { src: "/images/move2-kitchen-equipment.jpg", alt: "Stainless steel prep tables and equipment" },
    ],
    protectionChecklist: [
      { text: "Industrial kitchen equipment secured and padded" },
      { text: "Tables and chairs organized for efficient transport" },
      { text: "Shelving units carefully disassembled" },
    ],
    relatedServices: [
      { label: "Specialty Moving", href: "/services/specialty-moving" },
      { label: "Large Item Moving", href: "/services/large-item-moving" },
      { label: "Local Moving", href: "/services/local-moving" },
      { label: "Storage Solutions", href: "/services/storage-solutions" },
    ],
    relatedAreas: [
      { label: "Las Vegas", href: "/locations/las-vegas" },
      { label: "Centennial Hills", href: "/locations/centennial-hills" },
    ],
    summary: "Full restaurant move with industrial kitchen equipment, tables, chairs, and shelving.",
  },
  {
    id: "move-summit-summerlin-cabinetry",
    neighborhood: "The Summit Summerlin",
    homeType: "New Build",
    moveDetails: "Moving designer specialty cabinetry into new builds in The Summit neighborhood. We coordinated with The Summit neighborhood in order to accommodate the special move along with following safety procedures moving the items in.",
    crewSize: "2 movers + 1 truck",
    photos: [
      { src: "/images/move3-summit-truck.jpeg", alt: "Umbrella Movers truck at The Summit Summerlin new build" },
    ],
    protectionChecklist: [
      { text: "Coordinated with HOA for access" },
      { text: "Designer cabinetry wrapped and protected" },
      { text: "Safety procedures followed for new build entry" },
    ],
    relatedServices: [
      { label: "Specialty Moving", href: "/services/specialty-moving" },
    ],
    relatedAreas: [
      { label: "Summerlin", href: "/locations/summerlin" },
      { label: "Las Vegas", href: "/locations/las-vegas" },
    ],
    summary: "Designer specialty cabinetry delivery to new builds with HOA coordination.",
  },
];

// Popular services for internal linking (limit to 4 as per SEO requirements)
export const popularServices = [
  { label: "Local Moving", href: "/services/local-moving" },
  { label: "Residential Moving", href: "/services/residential-moving" },
  { label: "White-Glove Moving", href: "/services/white-glove-moving" },
  { label: "Specialty Moving", href: "/services/specialty-moving" },
];

// Popular areas for internal linking (limit to 4 as per SEO requirements)
export const popularAreas = [
  { label: "Henderson", href: "/locations/henderson" },
  { label: "Summerlin", href: "/locations/summerlin" },
  { label: "Las Vegas", href: "/locations/las-vegas" },
  { label: "Southern Highlands", href: "/locations/southern-highlands" },
];
