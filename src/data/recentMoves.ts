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
  slug: string; // URL segment for the individual case-study page
  title: string; // Case-study page H1
  metaDescription: string;
  location: string; // Where the move happened (origin and destination when relevant)
  moveType: string;
  challenge: string; // What the customer needed handled
  access: string; // Building, community, or access requirements
  result: string; // How it finished
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
    slug: "ridges-to-southern-highlands-luxury-home-move",
    title: "The Ridges to Southern Highlands: 5,000 Sq Ft Luxury Home Move",
    metaDescription: "Case study: a 5,000 sq ft two-story home moved from The Ridges in Summerlin to Southern Highlands Country Club, with 8 curved TVs dismounted and heavy gym equipment protected.",
    location: "The Ridges (Summerlin) to Southern Highlands Country Club",
    moveType: "Full-service residential move with white-glove handling",
    challenge: "A full two-story home with eight new curved TVs and home security monitors that needed to be dismounted before the move, plus large and awkward gym equipment including an elliptical, a treadmill, and a StairMaster.",
    access: "Guard-gated community access at The Ridges and a two-story floor plan, so stairs, doorways, and floors needed protection while heavy equipment moved through.",
    result: "Five movers and two trucks completed the move in one coordinated day. Screens were wrapped, gym equipment was disassembled and padded, and floor runners were laid in both homes before the first item moved.",
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
    slug: "chinatown-restaurant-equipment-relocation",
    title: "Chinatown Restaurant Relocation: 4,000 Sq Ft Kitchen and Dining Room",
    metaDescription: "Case study: a full 4,000 sq ft Las Vegas Chinatown restaurant relocation, including industrial kitchen equipment, stainless prep tables, shelving, and dining room furniture.",
    location: "Chinatown, Las Vegas",
    moveType: "Commercial move with restaurant equipment relocation",
    challenge: "A complete restaurant relocation: dining tables and chairs, metal shelving, stainless steel prep tables, and large industrial kitchen equipment that all had to arrive ready for the new space.",
    access: "Storefront loading from a busy commercial corridor, with heavy stainless equipment staged and moved through standard restaurant doorways.",
    result: "Four movers and two trucks handled the job. Kitchen equipment was padded and secured, shelving was disassembled for transport, and tables and chairs were organized so the dining room could be reset quickly on arrival.",
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
    slug: "summit-summerlin-designer-cabinetry-delivery",
    title: "The Summit Summerlin: Designer Cabinetry Delivery to New Builds",
    metaDescription: "Case study: designer specialty cabinetry delivered into new-construction homes at The Summit in Summerlin, with community access coordination and new-build safety procedures.",
    location: "The Summit, Summerlin",
    moveType: "Specialty delivery of designer cabinetry",
    challenge: "Designer specialty cabinetry had to be delivered into new-construction homes without damage to the pieces or to finished surfaces in the homes.",
    access: "The Summit is a private community, so access was coordinated with the community in advance and the crew followed the required safety procedures for entering active new builds.",
    result: "A two-person crew and one truck delivered the cabinetry wrapped and protected, with every piece carried in under the community's procedures.",
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

export function getRecentMove(slug: string): RecentMove | undefined {
  return recentMoves.find((m) => m.slug === slug);
}
