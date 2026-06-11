import type { SiteConfig } from '../types';
import img1 from '../assets/Carousel main.jpeg';
import img2 from '../assets/carousel1.JPG';
import img3 from '../assets/carousel2.JPG';
import img4 from '../assets/carousel3.JPG';

export const siteConfig: SiteConfig = {
  coupleNames: {
    partner1: "Kush",
    partner2: "Kari"
  },
  anniversaryDate: "2025-03-02", // Anniversary date (e.g. YYYY-MM-DD)
  siteTitle: "Kush & Kari",
  siteSubtitle: "Our journey of love, laughter, and endless adventure",
  heroGreeting: "To My Favorite Person,",
  heroDescription: "This is a collection of our milestones, favorite moments, and all the reasons why you mean the absolute world to me. Scroll down to take a trip down memory lane.",
  theme: {
    fontSans: "font-sans",
    fontSerif: "font-serif",
    primaryColor: "rose", // controls color theme accents
    glassBlur: "backdrop-blur-xl"
  },
  heroCarouselImages: [
    img1,
    img2,
    img3,
    img4
  ]
};
