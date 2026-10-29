export interface AreaData {
  slug: string;
  name: string;
  fullName: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  fullServiceContent: string[];
  whyHireContent: string[];
  reviews: {
    text: string;
    author: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const defaultReviews = [
  {
    text: "Best movers in Las Vegas! The team was professional, careful with our belongings, and made our move stress-free. So glad to support a woman-owned business!",
    author: "Sarah M."
  },
  {
    text: "Same crew from start to finish made all the difference. They knew exactly where everything was and how it was packed. Will definitely use Umbrella Movers again!",
    author: "Michael R."
  },
  {
    text: "15 years in business and it shows. True professionals who care about their customers and the community. Highly recommend!",
    author: "Jennifer K."
  },
  {
    text: "Outstanding service! They handled our fragile items with extreme care and were incredibly efficient. Worth every penny.",
    author: "David L."
  },
  {
    text: "The team at Umbrella Movers went above and beyond. Professional, friendly, and they made moving day actually enjoyable. Thank you!",
    author: "Maria G."
  }
];

const defaultFaqs = [
  {
    question: "How do I get a quote?",
    answer: "Getting a quote from Umbrella Movers is easy! Simply fill out our online quote form, call us at 702-533-2853, or email us at umbrellamovers@gmail.com. We'll provide you with a detailed, transparent estimate with no hidden fees."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes! Umbrella Movers is fully licensed, insured, and bonded. Our CPCN license number is 3364. We're also a WBENC-certified woman-owned business, which means we meet the highest standards of professionalism and accountability."
  },
  {
    question: "Do the same movers load and unload?",
    answer: "Absolutely! One of our key differentiators is that the same professional team that loads your belongings also unloads them. We never subcontract your move to third parties, ensuring consistent quality and accountability."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the entire Las Vegas Valley including Summerlin, Henderson, North Las Vegas, Southern Highlands, Green Valley, Anthem, Enterprise, Spring Valley, and all surrounding communities. We also handle long-distance moves throughout the Southwest."
  },
  {
    question: "Do you offer packing services?",
    answer: "Yes! We offer both full-service packing where our professional team handles everything, and partial packing where we focus on fragile items or specific rooms. We use high-quality materials to ensure your belongings are protected."
  }
];

export const areasData: Record<string, AreaData> = {
  "las-vegas": {
    slug: "las-vegas",
    name: "Las Vegas",
    fullName: "Las Vegas, NV",
    heroImage: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=1200&q=80",
    metaTitle: "Movers Las Vegas, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Top-rated Las Vegas movers. Woman-owned, fully licensed & insured. Same team loads & unloads. Residential, commercial & long-distance moving. Free quotes!",
    intro: "When you are moving, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Las Vegas isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Las Vegas because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "summerlin": {
    slug: "summerlin",
    name: "Summerlin",
    fullName: "Summerlin, NV",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    metaTitle: "Movers Summerlin, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Trusted Summerlin movers with 15+ years experience. Woman-owned, WBENC certified. Same team from start to finish. Get your free moving quote today!",
    intro: "When you are moving in Summerlin, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Summerlin isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Summerlin because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "henderson": {
    slug: "henderson",
    name: "Henderson",
    fullName: "Henderson, NV",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    metaTitle: "Movers Henderson, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Henderson's trusted moving company. Woman-owned, fully licensed & insured. Same team loads & unloads your belongings. Get a free quote today!",
    intro: "When you are moving in Henderson, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Henderson isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Henderson because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "southern-highlands": {
    slug: "southern-highlands",
    name: "Southern Highlands",
    fullName: "Southern Highlands, NV",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    metaTitle: "Movers Southern Highlands, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Southern Highlands premier moving company. Woman-owned, WBENC certified. Expert handling of luxury homes. Same team loads & unloads. Free quotes!",
    intro: "When you are moving in Southern Highlands, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Southern Highlands isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Southern Highlands because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "centennial-hills": {
    slug: "centennial-hills",
    name: "Centennial Hills",
    fullName: "Centennial Hills, NV",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    metaTitle: "Movers Centennial Hills, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Centennial Hills trusted moving company. Woman-owned, fully licensed & insured. Same team handles your entire move. Get your free quote today!",
    intro: "When you are moving in Centennial Hills, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Centennial Hills isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Centennial Hills because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "mountains-edge": {
    slug: "mountains-edge",
    name: "Mountains Edge",
    fullName: "Mountains Edge, NV",
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    metaTitle: "Movers Mountains Edge, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Mountains Edge professional movers. Woman-owned, WBENC certified. Same team from start to finish. Residential & commercial moving. Free quotes!",
    intro: "When you are moving in Mountains Edge, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Mountains Edge isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Mountains Edge because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "aliante": {
    slug: "aliante",
    name: "Aliante",
    fullName: "Aliante, NV",
    heroImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    metaTitle: "Movers Aliante, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Aliante's trusted moving company. Woman-owned, fully licensed & insured. Same team handles your belongings. Get your free moving quote today!",
    intro: "When you are moving in Aliante, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Aliante isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Aliante because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "anthem": {
    slug: "anthem",
    name: "Anthem",
    fullName: "Anthem, NV",
    heroImage: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
    metaTitle: "Movers Anthem, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Anthem's premier moving company. Woman-owned, WBENC certified. Expert handling of luxury homes & gated communities. Same team. Free quotes!",
    intro: "When you are moving in Anthem, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Anthem isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Anthem because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "sun-city-summerlin": {
    slug: "sun-city-summerlin",
    name: "Sun City Summerlin",
    fullName: "Sun City Summerlin, NV",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    metaTitle: "Movers Sun City Summerlin, NV | Senior Moving | Umbrella Movers",
    metaDescription: "Sun City Summerlin senior moving specialists. Woman-owned, patient & caring. Same team from start to finish. Downsizing experts. Free quotes!",
    intro: "When you are moving in Sun City Summerlin, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Sun City Summerlin isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Sun City Summerlin because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "green-valley-ranch": {
    slug: "green-valley-ranch",
    name: "Green Valley Ranch",
    fullName: "Green Valley Ranch, NV",
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    metaTitle: "Movers Green Valley Ranch, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Green Valley Ranch trusted movers. Woman-owned, fully licensed & insured. Same team loads & unloads. Residential & commercial. Free quotes!",
    intro: "When you are moving in Green Valley Ranch, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Green Valley Ranch isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Green Valley Ranch because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "lake-las-vegas": {
    slug: "lake-las-vegas",
    name: "Lake Las Vegas",
    fullName: "Lake Las Vegas, NV",
    heroImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    metaTitle: "Movers Lake Las Vegas, NV | Luxury Moving | Umbrella Movers",
    metaDescription: "Lake Las Vegas luxury moving specialists. Woman-owned, WBENC certified. White-glove service for waterfront homes. Same team. Free quotes!",
    intro: "When you are moving in Lake Las Vegas, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Lake Las Vegas isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Lake Las Vegas because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "mcdonalds-highlands": {
    slug: "mcdonalds-highlands",
    name: "McDonald's Highlands",
    fullName: "McDonald's Highlands, NV",
    heroImage: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
    metaTitle: "Movers McDonald's Highlands, NV | Professional Moving | Umbrella Movers",
    metaDescription: "McDonald's Highlands trusted movers. Woman-owned, fully licensed & insured. Same team from start to finish. Get your free quote today!",
    intro: "When you are moving in McDonald's Highlands, there are many stressful aspects to worry about. Luckily, finding top-quality movers in McDonald's Highlands isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in McDonald's Highlands because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "spring-valley": {
    slug: "spring-valley",
    name: "Spring Valley",
    fullName: "Spring Valley, NV",
    heroImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
    metaTitle: "Movers Spring Valley, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Spring Valley trusted moving company. Woman-owned, WBENC certified. Same team loads & unloads. Residential & commercial. Free quotes!",
    intro: "When you are moving in Spring Valley, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Spring Valley isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Spring Valley because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "enterprise": {
    slug: "enterprise",
    name: "Enterprise",
    fullName: "Enterprise, NV",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    metaTitle: "Movers Enterprise, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Enterprise trusted moving company. Woman-owned, fully licensed & insured. Same team handles your entire move. Get your free quote today!",
    intro: "When you are moving in Enterprise, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Enterprise isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Enterprise because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "north-las-vegas": {
    slug: "north-las-vegas",
    name: "North Las Vegas",
    fullName: "North Las Vegas, NV",
    heroImage: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80",
    metaTitle: "Movers North Las Vegas, NV | Professional Moving | Umbrella Movers",
    metaDescription: "North Las Vegas trusted movers. Woman-owned, WBENC certified. Same team from start to finish. Residential & commercial. Free quotes!",
    intro: "When you are moving in North Las Vegas, there are many stressful aspects to worry about. Luckily, finding top-quality movers in North Las Vegas isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in North Las Vegas because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "boulder-city": {
    slug: "boulder-city",
    name: "Boulder City",
    fullName: "Boulder City, NV",
    heroImage: "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=1200&q=80",
    metaTitle: "Movers Boulder City, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Boulder City trusted moving company. Woman-owned, fully licensed & insured. Same team loads & unloads. Get your free quote today!",
    intro: "When you are moving in Boulder City, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Boulder City isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Boulder City because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "sunrise-manor": {
    slug: "sunrise-manor",
    name: "Sunrise Manor",
    fullName: "Sunrise Manor, NV",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    metaTitle: "Movers Sunrise Manor, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Sunrise Manor trusted movers. Woman-owned, WBENC certified. Same team handles your entire move. Residential & commercial. Free quotes!",
    intro: "When you are moving in Sunrise Manor, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Sunrise Manor isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Sunrise Manor because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "whitney": {
    slug: "whitney",
    name: "Whitney",
    fullName: "Whitney, NV",
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    metaTitle: "Movers Whitney, NV | Professional Moving Services | Umbrella Movers",
    metaDescription: "Whitney trusted moving company. Woman-owned, fully licensed & insured. Same team from start to finish. Get your free quote today!",
    intro: "When you are moving in Whitney, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Whitney isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Whitney because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "spring-mountain-ranch": {
    slug: "spring-mountain-ranch",
    name: "Spring Mountain Ranch",
    fullName: "Spring Mountain Ranch, NV",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    metaTitle: "Movers Spring Mountain Ranch, NV | Professional Moving | Umbrella Movers",
    metaDescription: "Spring Mountain Ranch trusted movers. Woman-owned, WBENC certified. Same team loads & unloads. Get your free quote today!",
    intro: "When you are moving in Spring Mountain Ranch, there are many stressful aspects to worry about. Luckily, finding top-quality movers in Spring Mountain Ranch isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in Spring Mountain Ranch because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  },
  "the-ridges": {
    slug: "the-ridges",
    name: "The Ridges",
    fullName: "The Ridges, NV",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    metaTitle: "Movers The Ridges, NV | Luxury Moving Services | Umbrella Movers",
    metaDescription: "The Ridges luxury moving specialists. Woman-owned, WBENC certified. White-glove service for exclusive homes. Same team. Free quotes!",
    intro: "When you are moving in The Ridges, there are many stressful aspects to worry about. Luckily, finding top-quality movers in The Ridges isn't one of those. By moving with Umbrella Movers, you are choosing a stress-free move that will let you enjoy the process and feel the excitement of a fresh start. Contact us today, and let our professional team carry that weight for you.",
    fullServiceContent: [
      "A full-service move is when we sweep in and take care of every aspect of your move. You won't have to lift a single finger.",
      "We are known for our exceptional quality full-service moving. Umbrella Movers partners with you every step of the journey, from planning to packing to getting everything set up on the other end.",
      "Our full-service package includes packing services where we come into your home or place of work and get everything packed into boxes.",
      "We bring all our supplies and use only high-quality material to ensure that all of your belongings stay safe while being moved.",
      "This packing service is an excellent option for those simply too busy to set aside the days it would take to pack up a house.",
      "With our fully trained teams, however, you get the convenience of your house being packed up in a matter of hours without having to lift a finger.",
      "This drastically shapes the whole of your move and can be an absolute lifesaver for many people.",
      "You also have the assurance that your belongings have been packed in the best possible way to ensure they will remain safe and sound while in transit.",
      "Our full-service package includes optional unpacking services if you like them. This means that once you get to the other end, you don't need to stress about getting everything set up.",
      "You can sit back and relax as your new house takes shape right before your eyes. So, contact us today, and let our full-service movers do the hard work for you."
    ],
    whyHireContent: [
      "You want to hire movers in The Ridges because we know the area and have facilitated many moves in and around Nevada.",
      "Here at Umbrella Movers, your satisfaction is our primary concern. Working with a local moving company allows your move to get the attention it deserves.",
      "With mainstream moving companies, you are just another job. But with us, you become a part of the team. We care just as much about the success of your move as you do.",
      "You don't get the same level of personal attention with a non-local moving company. With us, you get movers who care about what we do and about you.",
      "Another excellent service that we offer is our labor-only moving package. This service lets us load and unload the truck, doing the very literal heavy lifting.",
      "Labor-only can be an excellent option for people who want greater control over the packing process or are on a tighter budget.",
      "However, we know that every move is unique, which is why you can pick and choose from our services to make sure that you only pay for the services you want. You can have the move of your dreams on your budget. So, contact us today, and let's lift that troublesome load for you."
    ],
    reviews: defaultReviews,
    faqs: defaultFaqs
  }
};

export const areasList = Object.values(areasData);

export const servicesOffered = [
  { name: "Residential Moving", slug: "residential-moving" },
  { name: "Local Moving", slug: "residential-moving" },
  { name: "Long Distance Moving", slug: "long-distance-moving" },
  { name: "Packing Services", slug: "packing-services" },
  { name: "Commercial Moving", slug: "commercial-moving" },
  { name: "Storage Solutions", slug: "storage-solutions" },
  { name: "Specialty Moving", slug: "specialty-moving" }
];
