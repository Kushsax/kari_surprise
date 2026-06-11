import type { PhotoItem } from '../types';
import img1 from '../assets/IMG_1270.jpg';
import img2 from '../assets/0311F24A-4457-4B94-872B-C4C8764F336A.JPG';
import img3 from '../assets/79101802433__DD5A5955-E2B2-4636-8FEF-3EC432C8477C.JPG';
import img4 from '../assets/IMG_0994.JPG';
import img5 from '../assets/9baf4824-70ed-41d6-9f19-fee2ab043583 2.JPG';

export const galleryItems: PhotoItem[] = [
  {
    id: "1",
    url: img1,
    title: "Beautiful Memory One",
    date: "2025-07-15",
    description: "One of our favorite captured moments together.",
    category: "cozy"
  },
  {
    id: "2",
    url: img2,
    title: "Beautiful Memory Two",
    date: "2025-07-20",
    description: "Dressed up and celebrating life and love together.",
    category: "special"
  },
  {
    id: "3",
    url: img3,
    title: "Beautiful Memory Three",
    date: "2025-08-02",
    description: "Another beautiful page in our journey of adventure.",
    category: "special"
  },
  {
    id: "4",
    url: img4,
    title: "Beautiful Memory Four",
    date: "2025-08-10",
    description: "Explores and milestones captured forever.",
    category: "adventure"
  },
  {
    id: "5",
    url: img5,
    title: "Beautiful Memory Five",
    date: "2025-12-12",
    description: "Warm, cozy times that we spent together.",
    category: "cozy"
  }
];
