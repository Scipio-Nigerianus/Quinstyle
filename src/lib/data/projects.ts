// Quinstyle Portfolio Projects Data
// Placeholder content - to be replaced with actual client content

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  services: string[];
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'banana-island',
    name: 'Banana Island Estate',
    location: 'Lagos, Nigeria',
    description: 'A comprehensive built environment management project for a luxury residential estate, demonstrating our full-lifecycle approach to property management.',
    challenge: 'The Banana Island estate required seamless coordination across multiple service areas, from initial construction consultation through ongoing facility management. The client needed a single partner capable of managing both the development phase and long-term operational excellence.',
    solution: 'Quinstyle provided integrated project management, architectural consultation, and ongoing facility management services. We established standardized operational procedures, trained local staff, and implemented sustainable maintenance protocols.',
    results: 'The estate now operates with 40% improved efficiency in maintenance operations, zero unplanned downtime in critical systems, and consistent 5-star resident satisfaction ratings.',
    services: ['Consultancy', 'Project Management & Construction', 'Property & Facility Management'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: 'yolo-island-resort',
    name: 'Yolo Island Resort',
    location: 'Lagos, Nigeria',
    description: 'Premium hospitality management for a boutique resort, showcasing our expertise in creating exceptional guest experiences.',
    challenge: 'Yolo Island Resort needed to establish itself as a premier destination while maintaining operational efficiency. The challenge was balancing luxury guest expectations with sustainable operational practices.',
    solution: 'Quinstyle delivered comprehensive hospitality management including guest experience design, facility maintenance, and staff training. We implemented quality assurance protocols and integrated sustainable practices throughout operations.',
    results: 'Guest satisfaction scores increased by 60%, with notable improvements in facility presentation and service consistency. The resort achieved recognition as a preferred venue for corporate retreats and destination weddings.',
    services: ['Hospitality Management', 'Property & Facility Management'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: 'lobster-beach',
    name: 'Lobster Beach Retreat',
    location: 'Coastal Nigeria',
    description: 'Operational excellence for a coastal retreat, demonstrating our ability to manage diverse hospitality environments.',
    challenge: 'Lobster Beach faced challenges with equipment maintenance, kitchen operations, and cleanliness standards. The remote location made consistent service delivery difficult without specialized expertise.',
    solution: 'We deployed our facility management expertise to establish regular maintenance schedules, train kitchen and cleaning staff, and implement quality control systems. Our team coordinated equipment servicing and ensured compliance with hospitality standards.',
    results: 'The retreat now maintains consistent 4.5-star guest ratings, with significant improvements in food quality, facility cleanliness, and equipment reliability. Repeat guest bookings increased by 35%.',
    services: ['Property & Facility Management', 'Hospitality Management'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop',
    featured: false
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}