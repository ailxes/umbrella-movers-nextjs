// Out-of-state destination guides for moves originating in Las Vegas.
// Each destination powers a /destinations/[slug] route via DestinationPageTemplate.
//
// Drive times are estimates for a LOADED 26-ft moving truck, which travels
// slower than the passenger-car times Google Maps shows. Federal FMCSA rules
// cap a driver at 11 hours of driving per day, so any haul over ~11 hours of
// truck driving is realistically a two-day trip. Ranges include buffer for
// traffic, weather, and fuel stops. Distances are approximate road miles.

export interface DestinationFAQ {
  question: string;
  answer: string;
}

export interface DestinationData {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;

  // Logistics
  distanceMiles: number;
  driveTimeRange: string; // truck-adjusted driving time, e.g. "≈ 21–24 hours"
  tripDuration: string; // e.g. "1 day" / "1–2 days" / "2 days"
  route: string; // primary highway routing
  driveNotes: string; // what the haul is actually like (truck speed + FMCSA)

  // Hero + intro (unique per page)
  heroTitle: string;
  heroSubhead: string;
  introParagraph: string;

  // Why people make this move + where they land
  whyMove: string[];
  popularAreas: string[];

  // Plain-English bottom line on movers vs. PODS for this route (no price figures)
  comparisonVerdict: string;

  faqItems: DestinationFAQ[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// Shared trust content — surfaced on every destination page.
export const umbrellaTrustPoints: { title: string; description: string }[] = [
  {
    title: "We move people out of state regularly",
    description:
      "Long-distance relocations aren't a side service for us — we run interstate moves out of Las Vegas regularly and know the logistics, paperwork, and timing that keep a cross-country move on schedule.",
  },
  {
    title: "Experienced, in-house staff — never contractors",
    description:
      "The crew that loads your home is on our payroll, trained by us, and accountable to us. We do not hand your move off to day-laborers or third-party contractors.",
  },
  {
    title: "Every mover is background-checked",
    description:
      "Each member of our team passes a background check before they ever set foot in your home. The same trusted faces handle your belongings from start to finish.",
  },
  {
    title: "A dedicated point of contact",
    description:
      "You get one person who knows your move — reachable before, during, and after the truck rolls. No call-center roulette, no repeating your details to a stranger.",
  },
  {
    title: "Licensed & insured",
    description:
      "Umbrella Movers is a licensed Nevada mover (CPCN 3364), fully insured, and woman-owned, with 300+ 5-star reviews across our local and long-distance customers.",
  },
];

// Shared "red flags" content — the same scams apply to every long-distance route.
export const moverRedFlags: { flag: string; detail: string }[] = [
  {
    flag: "No license or DOT number",
    detail:
      "Any company doing interstate moves must have a USDOT number (and an MC number for household goods). If they can't give you one to look up on the FMCSA website, walk away.",
  },
  {
    flag: "A large deposit demanded up front",
    detail:
      "Reputable movers rarely require more than a small deposit. A demand for a big cash or wire payment before the work begins is a classic setup for a no-show or a 'hostage load.'",
  },
  {
    flag: "A quote with no survey",
    detail:
      "An honest long-distance estimate comes after an in-home or video walkthrough of what's actually being moved. A flat phone quote sight-unseen almost always balloons on delivery day.",
  },
  {
    flag: "No written, not-to-exceed rate",
    detail:
      "Insist on a written 'not-to-exceed' (guaranteed-cap) rate. It locks in a maximum so your final bill can never climb above the number you agreed to. Open-ended estimates and blank paperwork are exactly how the price doubles once your belongings are on the truck.",
  },
  {
    flag: "The price seems too good to be true",
    detail:
      "Lowball bids win the booking, then the price jumps once your belongings are on the truck. If one quote is dramatically under the others, that's the bait — not a bargain.",
  },
  {
    flag: "No real address, reviews, or insurance proof",
    detail:
      "A shifting business name, no physical address, unmarked rental trucks, and refusal to show proof of insurance all point to a broker or fly-by-night operation, not a real carrier.",
  },
];

// Shared movers-vs-PODS comparison content — the benefits/tradeoffs are the
// same regardless of destination. Rendered as two columns on every page.
export const moverBenefits: { title: string; description: string }[] = [
  {
    title: "We do all the heavy lifting",
    description:
      "Our crew loads and unloads your entire home. With a container, every box and every piece of furniture is on you — twice, on both ends of the move.",
  },
  {
    title: "Trained, careful handling",
    description:
      "Professional padding, wrapping, and load-securing so nothing shifts or breaks over hundreds of miles. A container is only as safe as how well you packed it yourself.",
  },
  {
    title: "A firm, scheduled delivery window",
    description:
      "You know when your belongings arrive. Container delivery timelines are often looser and depend on the carrier's wider network and schedule.",
  },
  {
    title: "No truck to drive or rent",
    description:
      "You're not driving a 26-ft truck across state lines, and you're not coordinating a container drop-off, on-site storage, and a separate pickup.",
  },
  {
    title: "One insured, accountable team",
    description:
      "A licensed, insured company handles your move start to finish — versus a self-move where any damage in transit is simply your problem.",
  },
  {
    title: "Far less time and stress",
    description:
      "Hours of loading in the heat, renting equipment, and recruiting friends add up fast. Movers turn a multi-day project into a scheduled service.",
  },
];

export const podsConsiderations: { title: string; description: string }[] = [
  {
    title: "Lower upfront cost — if you supply the labor",
    description:
      "A container can cost less out of pocket, but only because you provide all of the loading and unloading yourself (or pay separately to hire it on both ends).",
  },
  {
    title: "Flexible loading window",
    description:
      "The container sits at your home, so you can load it over several days at your own pace instead of on a single move day.",
  },
  {
    title: "You own the pack quality",
    description:
      "If something shifts, tips, or breaks in transit, it comes down to how you loaded and secured it — there's no professional crew standing behind the pack.",
  },
  {
    title: "Best for smaller, flexible moves",
    description:
      "Containers make the most sense for lighter loads, tight budgets, and people who can do their own labor and don't need a guaranteed delivery date.",
  },
];

export const destinationsData: Record<string, DestinationData> = {
  "las-vegas-to-austin": {
    slug: "las-vegas-to-austin",
    city: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    distanceMiles: 1225,
    driveTimeRange: "≈ 21–24 hours",
    tripDuration: "2–3 days",
    route: "US-93 S / I-11 → I-40 E → US-287 S → I-35 S into Austin",
    driveNotes:
      "Google Maps will tell you Las Vegas to Austin is about 18 hours — but that's for a passenger car. A loaded 26-foot moving truck travels slower, so plan on roughly 21–24 hours of real driving. On top of that, federal FMCSA rules cap a driver at 11 hours of driving per day, so once daily limits and rest are factored in this haul runs two to three days. We build that into the schedule and give you a delivery window with room for traffic, weather, and fuel stops, so a hiccup on the road doesn't blow up your move-in day.",
    heroTitle: "Moving from Las Vegas to Austin, TX",
    heroSubhead:
      "A licensed, insured Las Vegas crew that handles the 1,200-mile haul to Central Texas — no contractors, no surprises.",
    introParagraph:
      "Austin remains one of the most popular out-of-state destinations for Las Vegas residents, drawn by a booming tech and music scene, no state income tax, and a fast-growing job market. It's also a serious distance — around 1,225 miles — so the company you choose matters more than it would for a cross-town move. Umbrella Movers runs interstate moves out of Las Vegas regularly, with our own background-checked crew and a single point of contact who owns your move from quote to delivery.",
    whyMove: [
      "No state income tax — same tax advantage you have in Nevada",
      "Major tech, healthcare, and university employers (it's nicknamed 'Silicon Hills')",
      "Live-music culture, lakes, and Hill Country outdoors",
      "Lower housing costs than coastal California metros",
    ],
    popularAreas: [
      "Downtown & East Austin",
      "Round Rock & Pflugerville",
      "Cedar Park & Leander",
      "South Congress (SoCo)",
      "Georgetown",
    ],
    comparisonVerdict:
      "Over a 1,200-mile haul like this, a container looks cheaper mainly because you're doing all the loading and unloading yourself — in Texas heat, on both ends. Full-service movers take that labor, the truck, and the driving off your plate and deliver on a firm window. For most full-home moves to Austin, that's the difference between a scheduled service and a two-week DIY project.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Austin?",
        answer:
          "It's about 1,225 miles. A loaded moving truck takes roughly 21–24 hours of driving — slower than the car time Google Maps shows — and because FMCSA rules limit a driver to 11 hours per day, it runs two to three days once rest is factored in. We give you a firm delivery window rather than the vague multi-week spreads big national van lines often quote.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Austin move?",
        answer:
          "A container can cost less upfront, but only if you load and unload a full home yourself and you're flexible on timing. Hiring movers means a trained crew handles the heavy lifting, the truck, and the driving, with a guaranteed delivery window — which is why most full-home moves to Austin go with full-service.",
      },
      {
        question: "Do you handle the move yourselves or use contractors in Texas?",
        answer:
          "Our own background-checked Las Vegas crew loads your home and stays with the shipment. We don't hand your belongings off to local day-labor or third-party contractors at either end.",
      },
    ],
    metaTitle: "Las Vegas to Austin Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Austin, TX? ~1,225 mi, a 21–24 hour, 2–3 day haul by truck. Movers vs PODS benefits and red flags to avoid. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to austin movers",
      "moving from las vegas to austin",
      "las vegas to austin moving cost",
      "movers vs pods las vegas to austin",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-phoenix": {
    slug: "las-vegas-to-phoenix",
    city: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    distanceMiles: 300,
    driveTimeRange: "≈ 5–6 hours",
    tripDuration: "1 day",
    route: "US-93 S / I-11 → I-10 E into the Phoenix metro",
    driveNotes:
      "Google Maps shows about 4.5 hours for a car, but a loaded 26-foot truck is slower — figure roughly 5–6 hours of real driving. That's comfortably within the federal 11-hour daily driving limit, so Phoenix is a one-day move. We still build a buffer into the schedule for traffic and fuel stops so the timeline holds even if something slows us down.",
    heroTitle: "Moving from Las Vegas to Phoenix, AZ",
    heroSubhead:
      "A short, straightforward interstate haul handled by our own licensed Las Vegas crew — often delivered the same day.",
    introParagraph:
      "Phoenix is one of the most common moves we make out of Las Vegas — two desert metros just 300 miles apart with a lot of back-and-forth for jobs, family, and lower housing costs. Because it's a short haul, a Las Vegas to Phoenix move is usually a single-day, single-crew job: the same background-checked team that loads your home in Nevada unloads it in Arizona. One point of contact, no handoffs.",
    whyMove: [
      "Lower home prices than much of the Las Vegas valley in many neighborhoods",
      "Large job market in tech, healthcare, aerospace, and finance",
      "Familiar desert climate — no winter to adjust to",
      "Close enough to keep ties to Las Vegas family and work",
    ],
    popularAreas: [
      "Scottsdale",
      "Gilbert & Chandler",
      "Tempe & Mesa",
      "Peoria & Glendale",
      "Queen Creek",
    ],
    comparisonVerdict:
      "Even on a short hop like Phoenix, a container still means loading and unloading a full home yourself, twice. Hiring movers gets you a trained crew, careful handling, and a same-day delivery without renting a truck or wrangling a container drop-off — usually well worth it once you factor in your own time and back.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Phoenix?",
        answer:
          "About 300 miles, or roughly 5–6 hours of driving in a loaded moving truck (slower than the car time Google Maps shows). That's within the federal 11-hour daily limit, so we usually load and deliver the same day with one crew.",
      },
      {
        question: "Should I hire movers or use a container for a Las Vegas to Phoenix move?",
        answer:
          "A container is the cheaper sticker price if you supply all the labor. But even on a same-day haul this short, hiring movers means you skip loading and unloading an entire household yourself — and you get professional handling and a firm schedule.",
      },
      {
        question: "Can you do a Las Vegas to Phoenix move in one day?",
        answer:
          "Usually, yes. With an early start the same crew that loads in Las Vegas can unload in the Phoenix metro the same day, depending on home size and access.",
      },
    ],
    metaTitle: "Las Vegas to Phoenix Movers | Same-Day Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Phoenix, AZ? ~300 mi, a 5–6 hour truck drive, often same-day. Movers vs container benefits and red flags to avoid. Licensed, insured movers.",
    keywords: [
      "las vegas to phoenix movers",
      "moving from las vegas to phoenix",
      "las vegas to phoenix moving cost",
      "same day movers las vegas phoenix",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-denver": {
    slug: "las-vegas-to-denver",
    city: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    distanceMiles: 748,
    driveTimeRange: "≈ 13–15 hours",
    tripDuration: "2 days",
    route: "I-15 N → I-70 E across Utah and the Rockies into Denver",
    driveNotes:
      "Google Maps lists about 11 hours for a car, but a loaded 26-foot truck climbing through Utah and over the Rockies on I-70 is slower — plan on roughly 13–15 hours of real driving. Because federal FMCSA rules cap a driver at 11 hours per day, that makes Denver a two-day trip. Mountain grades and weather can affect timing, so we build buffer into the delivery window for traffic, weather, and fuel stops.",
    heroTitle: "Moving from Las Vegas to Denver, CO",
    heroSubhead:
      "A licensed Las Vegas crew for the I-70 haul to the Front Range — planned around the passes and the weather.",
    introParagraph:
      "Denver draws Las Vegas movers with its outdoor lifestyle, strong job market, and four real seasons. At roughly 748 miles over the Rockies, it's a true long-distance move where mountain grades and weather can affect timing. We run this route regularly with our own background-checked crew, and we plan realistic schedules with buffer built in for the conditions.",
    whyMove: [
      "Outdoor and mountain lifestyle — skiing, hiking, and 300+ sunny days",
      "Diverse economy: tech, aerospace, healthcare, and energy",
      "Four-season climate for those ready to leave the desert",
      "Major airport hub keeping you connected nationwide",
    ],
    popularAreas: [
      "Highlands & LoHi",
      "Wash Park",
      "Aurora & Centennial",
      "Lakewood & Littleton",
      "Boulder (nearby)",
    ],
    comparisonVerdict:
      "A container can look cheaper for Denver, but you'd be loading and unloading a full home yourself and trusting your own pack job over the Rockies. Hiring movers puts a trained crew and the truck on a firm two-day schedule and takes the loading and the long drive off your plate. For most full-home moves to the Front Range, that convenience is the deciding factor.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Denver?",
        answer:
          "About 748 miles over the Rockies on I-70. A loaded moving truck takes roughly 13–15 hours of driving — more than the car time Google Maps shows — and with the FMCSA 11-hour daily driving limit, it's a two-day trip. We plan delivery windows around the passes and the weather.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Denver move?",
        answer:
          "A container costs less upfront if you handle all the loading and unloading yourself. For a long mountain route, most people prefer hiring movers, who handle the heavy lifting and the driving so a full home arrives on a firm delivery window.",
      },
    ],
    metaTitle: "Las Vegas to Denver Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Denver, CO? ~748 mi over the Rockies, a 13–15 hour / 2-day truck haul. Movers vs PODS benefits and red flags. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to denver movers",
      "moving from las vegas to denver",
      "las vegas to denver moving cost",
      "movers vs pods las vegas to denver",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-dallas": {
    slug: "las-vegas-to-dallas",
    city: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    distanceMiles: 1225,
    driveTimeRange: "≈ 21–24 hours",
    tripDuration: "2–3 days",
    route: "US-93 S / I-11 → I-40 E → US-287 S into the Dallas–Fort Worth metroplex",
    driveNotes:
      "Google Maps shows about 18 hours for a car, but a loaded 26-foot truck is slower — plan on roughly 21–24 hours of real driving. Federal FMCSA rules limit a driver to 11 hours per day, so once daily limits and rest are factored in this haul into the DFW metroplex runs two to three days. We coordinate fuel, rest, and a firm delivery window with buffer for traffic and weather so a long run stays predictable.",
    heroTitle: "Moving from Las Vegas to Dallas, TX",
    heroSubhead:
      "Long-distance moves to the DFW metroplex, handled by our own background-checked Las Vegas crew.",
    introParagraph:
      "Dallas pulls Las Vegas residents with its huge job market, no state income tax, and big-city amenities at a lower cost than the coasts. At about 1,225 miles, it's a two- to three-day haul where reliability matters most. Umbrella Movers runs interstate moves out of Las Vegas regularly, with one dedicated point of contact and our own crew — not contractors — from your front door in Nevada to your new home in Texas.",
    whyMove: [
      "No state income tax and a strong corporate job market",
      "Major hub for finance, tech, telecom, and logistics",
      "More house for your money than coastal metros",
      "DFW International keeps you connected anywhere",
    ],
    popularAreas: [
      "Plano & Frisco",
      "McKinney & Allen",
      "Uptown & Oak Lawn",
      "Irving & Las Colinas",
      "Arlington",
    ],
    comparisonVerdict:
      "On a 1,200-mile haul like Dallas, a container's lower price tag assumes you're providing all the labor and have a flexible timeline. Hiring movers takes the loading, the truck, and the long drive off your plate and lands your home on a firm window. For most full-home moves to DFW, full-service is the simpler, lower-stress choice.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Dallas?",
        answer:
          "About 1,225 miles. A loaded moving truck takes roughly 21–24 hours of driving — slower than the car time Google Maps shows — and with the FMCSA 11-hour daily limit it runs two to three days once rest is factored in. We commit to a firm delivery window instead of the wide multi-week spreads common with national van lines.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Dallas move?",
        answer:
          "A container often has the lower sticker price if you supply all the labor and stay flexible on dates. Hiring movers means a trained crew handles the heavy lifting and the long drive, with a guaranteed window — which is why most full-home DFW moves go full-service.",
      },
      {
        question: "Will the same crew handle the move in Texas?",
        answer:
          "Your shipment stays with our own background-checked team. We don't subcontract the Texas side to local day-labor, so the people who packed your home are accountable for it on delivery.",
      },
    ],
    metaTitle: "Las Vegas to Dallas Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Dallas, TX? ~1,225 mi, a 21–24 hour, 2–3 day truck haul. Movers vs PODS benefits and red flags to avoid. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to dallas movers",
      "moving from las vegas to dallas",
      "las vegas to dallas moving cost",
      "movers vs pods las vegas to dallas",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-salt-lake-city": {
    slug: "las-vegas-to-salt-lake-city",
    city: "Salt Lake City",
    state: "Utah",
    stateAbbr: "UT",
    distanceMiles: 421,
    driveTimeRange: "≈ 7–9 hours",
    tripDuration: "1 day",
    route: "I-15 N straight through to Salt Lake City",
    driveNotes:
      "Google Maps shows about 6 hours for a car, but a loaded 26-foot truck is slower — figure roughly 7–9 hours of real driving straight up I-15. That keeps it within the federal 11-hour daily driving limit, so Salt Lake City is generally a one-day move. We add buffer for traffic and fuel so an early start still makes for a same-day delivery.",
    heroTitle: "Moving from Las Vegas to Salt Lake City, UT",
    heroSubhead:
      "A clean run up I-15, handled by our own licensed Las Vegas crew — often delivered the same day.",
    introParagraph:
      "Salt Lake City is one of the most convenient out-of-state moves from Las Vegas: a single straight shot up I-15, about 421 miles. People head north for the booming 'Silicon Slopes' tech scene, world-class skiing, and a lower cost of living. Because it's a short, simple route, we can often load in Las Vegas and unload in Utah the same day, with the same background-checked crew the whole way.",
    whyMove: [
      "'Silicon Slopes' tech boom and strong job growth",
      "World-class skiing and mountain access minutes from the city",
      "Lower cost of living than West Coast metros",
      "Easy, direct I-15 connection back to Las Vegas",
    ],
    popularAreas: [
      "Sugar House",
      "The Avenues",
      "Draper & Lehi (Silicon Slopes)",
      "South Jordan & Daybreak",
      "Park City (nearby)",
    ],
    comparisonVerdict:
      "Salt Lake City is short and direct, but a container still leaves you loading and unloading a full home yourself. Hiring movers gets you trained handling, no truck to drive, and a same-day delivery — usually well worth it once you weigh your own time and effort against the lower container sticker price.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Salt Lake City?",
        answer:
          "About 421 miles straight up I-15. A loaded moving truck takes roughly 7–9 hours of driving — slower than the car time Google Maps shows — which is within the FMCSA 11-hour daily limit, so same-day delivery is usually realistic.",
      },
      {
        question: "Should I hire movers or use a container for a Las Vegas to SLC move?",
        answer:
          "A container wins on sticker price if you supply all the labor. On this short, direct route, hiring movers still means you skip loading and unloading a full household yourself and get professional handling on a same-day schedule.",
      },
      {
        question: "Can this move be done in a single day?",
        answer:
          "Often, yes. With an early start, the same crew that loads in Las Vegas can reach Salt Lake City and unload the same day, depending on home size and access.",
      },
    ],
    metaTitle: "Las Vegas to Salt Lake City Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Salt Lake City, UT? ~421 mi up I-15, a 7–9 hour truck drive, often same-day. Movers vs container benefits. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to salt lake city movers",
      "moving from las vegas to salt lake city",
      "las vegas to slc moving cost",
      "movers vs pods las vegas to salt lake city",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-boise": {
    slug: "las-vegas-to-boise",
    city: "Boise",
    state: "Idaho",
    stateAbbr: "ID",
    distanceMiles: 622,
    driveTimeRange: "≈ 11–13 hours",
    tripDuration: "1–2 days",
    route: "I-15 N → I-84 W through Utah and southern Idaho into Boise",
    driveNotes:
      "Google Maps shows about 9.5 hours for a car, but a loaded 26-foot truck running up through Utah and across southern Idaho is slower — plan on roughly 11–13 hours of real driving. That sits right at the federal FMCSA 11-hour daily driving limit, so depending on the start time and conditions this can land as one long day or spill into a second. We schedule it with a firm delivery date and buffer rather than an open-ended window.",
    heroTitle: "Moving from Las Vegas to Boise, ID",
    heroSubhead:
      "A licensed Las Vegas crew for the run up to the Treasure Valley — no contractors, no handoffs.",
    introParagraph:
      "Boise has become a top landing spot for people leaving bigger Western cities, including Las Vegas — drawn by a relaxed pace, outdoor access, and a still-reasonable cost of living. At roughly 622 miles, it's a long-distance move where a reliable schedule matters. We make this haul with our own background-checked crew and a single point of contact, so the people who load your home in Nevada are the ones who deliver it in Idaho.",
    whyMove: [
      "Lower cost of living than Seattle, Portland, or California metros",
      "Fast-growing job market and relaxed, family-friendly pace",
      "Rivers, foothills, and mountains right at the city's edge",
      "Smaller-city feel with real urban amenities",
    ],
    popularAreas: [
      "North End",
      "Boise Bench",
      "Meridian",
      "Eagle",
      "Nampa & Caldwell",
    ],
    comparisonVerdict:
      "Boise sits right at the edge of a one-day drive, so a container means not just doing all your own labor but also trusting your pack over a long haul. Hiring movers hands the loading, the truck, and the driving to a trained crew on a firm schedule — the simpler call for most full-home moves to the Treasure Valley.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Boise?",
        answer:
          "About 622 miles. A loaded moving truck takes roughly 11–13 hours of driving — more than the car time Google Maps shows — which is right at the FMCSA 11-hour daily limit, so it lands as one long day or a two-day trip depending on conditions. We schedule it with a firm delivery date so you're not left guessing.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Boise move?",
        answer:
          "A container usually has the lower sticker price if you handle all the labor yourself. Hiring movers means a trained crew does the heavy lifting and the long drive, with professional handling and a firm delivery date — the easier route for a full home.",
      },
      {
        question: "Do you use local Idaho contractors to unload?",
        answer:
          "No. Our own background-checked crew stays with the shipment and unloads it in Idaho — the same team start to finish.",
      },
    ],
    metaTitle: "Las Vegas to Boise Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Boise, ID? ~622 mi, an 11–13 hour truck haul (1–2 days). Movers vs PODS benefits and red flags to avoid. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to boise movers",
      "moving from las vegas to boise",
      "las vegas to boise moving cost",
      "movers vs pods las vegas to boise",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-fort-worth": {
    slug: "las-vegas-to-fort-worth",
    city: "Fort Worth",
    state: "Texas",
    stateAbbr: "TX",
    distanceMiles: 1205,
    driveTimeRange: "≈ 21–24 hours",
    tripDuration: "2–3 days",
    route: "US-93 S / I-11 → I-40 E → US-287 S into Fort Worth",
    driveNotes:
      "Google Maps shows about 17.5 hours for a car, but a loaded 26-foot truck is slower — plan on roughly 21–24 hours of real driving. Federal FMCSA rules cap a driver at 11 hours per day, so once daily limits and rest are factored in this haul into the western side of the DFW metroplex runs two to three days. We plan it around a firm delivery date with buffer for traffic and weather.",
    heroTitle: "Moving from Las Vegas to Fort Worth, TX",
    heroSubhead:
      "Long-distance moves to the west side of DFW, handled by our own licensed, background-checked Las Vegas crew.",
    introParagraph:
      "Fort Worth offers the no-income-tax, big-job-market appeal of Texas with a more laid-back feel than Dallas next door — and it's a frequent destination for Las Vegas movers. At about 1,205 miles, it's a two- to three-day haul where dependability counts. We run interstate moves out of Las Vegas regularly, with one point of contact and our own crew handling your belongings the entire way to Texas.",
    whyMove: [
      "No state income tax and a strong, diversified job market",
      "More relaxed, lower-cost feel than neighboring Dallas",
      "Western heritage with growing arts and dining scenes",
      "DFW International airport access on the doorstep",
    ],
    popularAreas: [
      "Downtown & Near Southside",
      "Keller & Southlake",
      "North Richland Hills",
      "Aledo & Benbrook",
      "Burleson",
    ],
    comparisonVerdict:
      "At roughly 1,200 miles, a container's lower price assumes you're loading and unloading a full home yourself and staying flexible on dates. Hiring movers takes the labor, the truck, and the long drive off your plate and delivers on a firm window — the lower-stress choice for most full-home moves to Fort Worth.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Fort Worth?",
        answer:
          "About 1,205 miles. A loaded moving truck takes roughly 21–24 hours of driving — slower than the car time Google Maps shows — and with the FMCSA 11-hour daily limit it runs two to three days once rest is factored in. We provide a firm delivery window instead of a vague multi-week spread.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Fort Worth move?",
        answer:
          "A container often has the lower sticker price if you supply all the labor. Hiring movers means a trained crew handles the heavy lifting and the long drive, with a guaranteed delivery window — which is why most full-home Fort Worth moves go full-service.",
      },
      {
        question: "Is Fort Worth the same move as Dallas for you?",
        answer:
          "The routes are nearly identical and the distances are within a few miles. We serve the whole DFW metroplex, including the western suburbs around Fort Worth.",
      },
    ],
    metaTitle: "Las Vegas to Fort Worth Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Fort Worth, TX? ~1,205 mi, a 21–24 hour, 2–3 day truck haul. Movers vs PODS benefits and red flags. Licensed, insured, woman-owned movers.",
    keywords: [
      "las vegas to fort worth movers",
      "moving from las vegas to fort worth",
      "las vegas to fort worth moving cost",
      "movers vs pods las vegas to fort worth",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-orange-county": {
    slug: "las-vegas-to-orange-county",
    city: "Orange County",
    state: "California",
    stateAbbr: "CA",
    distanceMiles: 270,
    driveTimeRange: "≈ 5–7 hours",
    tripDuration: "1 day",
    route: "I-15 S → CA-91 W into Orange County",
    driveNotes:
      "Google Maps shows about 4 hours for a car, but a loaded 26-foot truck is slower, and Southern California traffic is the real wildcard — plan on roughly 5–7 hours depending on departure time. It's well within the federal 11-hour daily driving limit, so it's a one-day move. We time the run to avoid weekend backups at the California border and on the 91 so a same-day delivery stays on schedule.",
    heroTitle: "Moving from Las Vegas to Orange County, CA",
    heroSubhead:
      "A short, same-day-capable haul to the OC, handled by our own licensed Las Vegas crew — timed around the I-15 traffic.",
    introParagraph:
      "Orange County — from Irvine and Newport Beach to Anaheim and Huntington Beach — is a frequent move from Las Vegas for jobs, family, and the Southern California coast. At about 270 miles, it's one of our shorter interstate routes and often a same-day job. The trick is traffic: the I-15 and the 91 can crawl on weekends, so we plan departure times to keep your delivery on schedule. Our own background-checked crew handles it end to end.",
    whyMove: [
      "Coastal Southern California lifestyle and beaches",
      "Strong job market in tech, healthcare, and tourism",
      "Top-rated school districts in many communities",
      "Close enough for easy trips back to Las Vegas",
    ],
    popularAreas: [
      "Irvine",
      "Newport Beach & Costa Mesa",
      "Anaheim & Orange",
      "Huntington Beach",
      "Mission Viejo & Lake Forest",
    ],
    comparisonVerdict:
      "California building access — gated communities, permits, parking, and elevator reservations — makes a professional crew especially valuable for an OC move. A container leaves all of that, plus the loading and unloading, to you. Hiring movers means trained handling and a same-day delivery without renting a truck or coordinating a container drop in a tight neighborhood.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Orange County?",
        answer:
          "About 270 miles, or roughly 5–7 hours in a loaded moving truck depending on traffic — slower than the car time Google Maps shows. It's within the FMCSA 11-hour daily limit, so it's a one-day move; we time the drive to dodge weekend backups at the border and on the 91.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Orange County move?",
        answer:
          "A container is cheaper upfront if you supply the labor. Given California's building access rules — permits, parking, and elevator bookings — many OC moves go far more smoothly with a full-service crew that handles the heavy lifting and the logistics for you.",
      },
      {
        question: "Can you do a Las Vegas to Orange County move in one day?",
        answer:
          "Usually, yes. With an early start to beat traffic, the same crew can load in Las Vegas and unload in Orange County the same day, depending on home size and building access.",
      },
    ],
    metaTitle: "Las Vegas to Orange County Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Orange County, CA? ~270 mi, a 5–7 hour truck drive, often same-day. Movers vs PODS benefits and red flags. Licensed, insured movers.",
    keywords: [
      "las vegas to orange county movers",
      "moving from las vegas to orange county",
      "las vegas to orange county moving cost",
      "movers vs pods las vegas to orange county",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-san-diego": {
    slug: "las-vegas-to-san-diego",
    city: "San Diego",
    state: "California",
    stateAbbr: "CA",
    distanceMiles: 332,
    driveTimeRange: "≈ 6–8 hours",
    tripDuration: "1 day",
    route: "I-15 S straight into San Diego",
    driveNotes:
      "Google Maps shows about 5 hours for a car, but a loaded 26-foot truck is slower, and SoCal traffic adds variability — plan on roughly 6–8 hours straight down I-15. It's within the federal 11-hour daily driving limit, so it's a one-day move. As with all Southern California runs, we plan around the weekend traffic that builds near the California border so a same-day delivery holds.",
    heroTitle: "Moving from Las Vegas to San Diego, CA",
    heroSubhead:
      "A direct run down I-15, handled by our own licensed Las Vegas crew — often delivered the same day.",
    introParagraph:
      "San Diego's coastal climate, beaches, and biotech and military job base make it a perennial draw for Las Vegas residents. It's a straight shot down I-15 — about 332 miles — which keeps it to a same-day move in most cases. We run this route with our own background-checked crew and a single point of contact, and we plan around the weekend traffic that builds near the California border.",
    whyMove: [
      "Mild coastal climate and beaches year-round",
      "Strong biotech, defense, and healthcare job market",
      "Highly rated universities and school districts",
      "Direct, simple I-15 connection back to Las Vegas",
    ],
    popularAreas: [
      "La Jolla & Pacific Beach",
      "North Park & Hillcrest",
      "Carlsbad & Encinitas",
      "Chula Vista",
      "Escondido",
    ],
    comparisonVerdict:
      "San Diego's older, tighter coastal neighborhoods — narrow streets, permits, and parking challenges — are exactly where a professional crew earns its keep. A container leaves the loading, the parking, and the pack quality to you. Hiring movers means trained handling and a same-day delivery without you driving a truck through La Jolla.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to San Diego?",
        answer:
          "About 332 miles straight down I-15, or roughly 6–8 hours in a loaded moving truck depending on traffic — slower than the car time Google Maps shows. It's within the FMCSA 11-hour daily limit, so it's a one-day move when we time the drive around weekend border traffic.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to San Diego move?",
        answer:
          "A container is the cheaper sticker price if you provide the labor. In San Diego's tighter coastal neighborhoods, hiring movers often makes the move far smoother — a trained crew handles the heavy lifting, the parking, and the logistics for you.",
      },
      {
        question: "Can a Las Vegas to San Diego move be done in a day?",
        answer:
          "Often, yes. With an early start the same crew that loads in Las Vegas can unload in San Diego the same day, depending on home size and access.",
      },
    ],
    metaTitle: "Las Vegas to San Diego Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to San Diego, CA? ~332 mi down I-15, a 6–8 hour truck drive, often same-day. Movers vs PODS benefits and red flags. Licensed, insured movers.",
    keywords: [
      "las vegas to san diego movers",
      "moving from las vegas to san diego",
      "las vegas to san diego moving cost",
      "movers vs pods las vegas to san diego",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-seattle": {
    slug: "las-vegas-to-seattle",
    city: "Seattle",
    state: "Washington",
    stateAbbr: "WA",
    distanceMiles: 1118,
    driveTimeRange: "≈ 20–23 hours",
    tripDuration: "2–3 days",
    route: "US-95 N → I-84 W → I-82 / I-90 W into the Seattle metro",
    driveNotes:
      "Google Maps shows about 17.5 hours for a car, but a loaded 26-foot truck climbing north through Idaho and Oregon and over the Cascades on I-90 is slower — plan on roughly 20–23 hours of real driving. Federal FMCSA rules limit a driver to 11 hours per day, so once daily limits and rest are factored in this haul runs two to three days. Weather and terrain over the passes can affect timing, so we build buffer into the delivery window for traffic, weather, and fuel stops.",
    heroTitle: "Moving from Las Vegas to Seattle, WA",
    heroSubhead:
      "A licensed Las Vegas crew for the long Pacific Northwest haul — planned around the Cascades and a firm delivery date.",
    introParagraph:
      "Seattle pulls Las Vegas movers with its tech-heavy job market (Amazon, Microsoft, and more), no state income tax, and Pacific Northwest scenery. At roughly 1,118 miles over the Cascades, it's a serious two- to three-day haul where weather and terrain matter. We make this run with our own background-checked crew and one dedicated point of contact, and we plan realistic schedules with buffer built in for the conditions over the passes.",
    whyMove: [
      "Major tech job market — Amazon, Microsoft, and a deep startup scene",
      "No state income tax, like Nevada",
      "Mountains, water, and evergreen scenery on every side",
      "Strong public transit and walkable urban neighborhoods",
    ],
    popularAreas: [
      "Ballard & Fremont",
      "Capitol Hill",
      "Bellevue & Redmond (Eastside)",
      "West Seattle",
      "Kirkland",
    ],
    comparisonVerdict:
      "On a 1,100-mile-plus route into a hilly, parking-tight city, a container means doing your own labor, the long drive, and trusting your own pack the whole way. Hiring movers takes the loading, the drive, and Seattle's access headaches off your plate on a firm two- to three-day schedule — the clear choice for most full-home moves.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Seattle?",
        answer:
          "About 1,118 miles over the Cascades. A loaded moving truck takes roughly 20–23 hours of driving — slower than the car time Google Maps shows — and with the FMCSA 11-hour daily limit it runs two to three days once rest is factored in. We plan around the mountain passes and commit to a firm delivery window.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Seattle move?",
        answer:
          "A container usually has the lower sticker price if you supply all the labor. For a long mountain haul into a hilly, parking-tight city, hiring movers means a trained crew handles the heavy lifting, the driving, and the access challenges for you.",
      },
      {
        question: "Do you handle Seattle's tight streets and parking?",
        answer:
          "Yes. Our crew handles the access challenges of Seattle's older neighborhoods, and your dedicated point of contact coordinates timing so the truck isn't fighting parking and permits blind.",
      },
    ],
    metaTitle: "Las Vegas to Seattle Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Seattle, WA? ~1,118 mi over the Cascades, a 20–23 hour, 2–3 day truck haul. Movers vs PODS benefits and red flags. Licensed, insured movers.",
    keywords: [
      "las vegas to seattle movers",
      "moving from las vegas to seattle",
      "las vegas to seattle moving cost",
      "movers vs pods las vegas to seattle",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },

  "las-vegas-to-fort-collins": {
    slug: "las-vegas-to-fort-collins",
    city: "Fort Collins",
    state: "Colorado",
    stateAbbr: "CO",
    distanceMiles: 813,
    driveTimeRange: "≈ 14–16 hours",
    tripDuration: "2 days",
    route: "I-15 N → I-70 E → I-25 N into Fort Collins",
    driveNotes:
      "Google Maps shows about 12 hours for a car, but a loaded 26-foot truck crossing the Rockies on I-70 and heading north on I-25 is slower — plan on roughly 14–16 hours of real driving. Because federal FMCSA rules cap a driver at 11 hours per day, this is a two-day trip. We build the timeline around the mountain passes and seasonal weather, with a delivery window that has buffer for hiccups.",
    heroTitle: "Moving from Las Vegas to Fort Collins, CO",
    heroSubhead:
      "A licensed Las Vegas crew for the Rockies-then-I-25 haul to Northern Colorado.",
    introParagraph:
      "Fort Collins offers a college-town energy, craft-beer culture, and easy access to the Rockies — a growing destination for people leaving Las Vegas for the Front Range without Denver's size and prices. At roughly 813 miles over the mountains, it's a true long-distance move. We run it with our own background-checked crew and a single point of contact, and we plan realistic schedules with buffer built in for the conditions on I-70.",
    whyMove: [
      "Relaxed college-town feel with Colorado State University",
      "Outdoor access — foothills, rivers, and the Rockies nearby",
      "Smaller and often more affordable than Denver to the south",
      "Renowned craft-beer and local food scene",
    ],
    popularAreas: [
      "Old Town",
      "Midtown",
      "Harmony Corridor",
      "Timnath & Windsor",
      "Loveland (nearby)",
    ],
    comparisonVerdict:
      "A container can look cheaper for Fort Collins, but you'd be loading and unloading a full home yourself and driving your own pack over the Rockies. Hiring movers hands the labor, the truck, and the long drive to a trained crew on a firm two-day schedule — usually the deciding factor for a full-home move to Northern Colorado.",
    faqItems: [
      {
        question: "How long does it take to move from Las Vegas to Fort Collins?",
        answer:
          "About 813 miles — over the Rockies on I-70, then north on I-25. A loaded moving truck takes roughly 14–16 hours of driving, more than the car time Google Maps shows, and with the FMCSA 11-hour daily limit it's a two-day trip scheduled around the passes.",
      },
      {
        question: "Should I hire movers or use PODS for a Las Vegas to Fort Collins move?",
        answer:
          "A container usually has the lower sticker price if you do all the loading and unloading. For a mountain route with a firm move-in date, hiring movers means a trained crew handles the heavy lifting and the driving, with professional handling and a guaranteed window.",
      },
      {
        question: "Do you also serve Loveland and Windsor?",
        answer:
          "Yes. We deliver throughout Northern Colorado's Front Range, including Loveland, Windsor, and Timnath around Fort Collins.",
      },
    ],
    metaTitle: "Las Vegas to Fort Collins Movers | Drive Time & Tips",
    metaDescription:
      "Moving from Las Vegas to Fort Collins, CO? ~813 mi over the Rockies, a 14–16 hour / 2-day truck haul. Movers vs PODS benefits and red flags. Licensed, insured movers.",
    keywords: [
      "las vegas to fort collins movers",
      "moving from las vegas to fort collins",
      "las vegas to fort collins moving cost",
      "movers vs pods las vegas to fort collins",
      "long distance movers las vegas",
      "out of state movers las vegas",
    ],
  },
};

export const getDestinationData = (slug: string): DestinationData | undefined =>
  destinationsData[slug];

// Lightweight list for the index page and cross-linking.
export const destinationList = Object.values(destinationsData).map((d) => ({
  slug: d.slug,
  city: d.city,
  state: d.state,
  stateAbbr: d.stateAbbr,
  distanceMiles: d.distanceMiles,
  driveTimeRange: d.driveTimeRange,
  tripDuration: d.tripDuration,
  heroSubhead: d.heroSubhead,
}));
