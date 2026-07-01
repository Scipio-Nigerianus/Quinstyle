// Quinstyle Team Members Data
// Placeholder content - to be replaced with actual client content

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: 'samuel-martins',
    name: 'Samuel Martins',
    role: 'Founder & Principal Architect',
    bio: 'Samuel brings over a decade of experience in architectural design and built environment management. His vision of comprehensive, lifecycle-focused property solutions drives Quinstyle\'s unique market positioning.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'morris-john',
    name: 'Morris John',
    role: 'Operations Director',
    bio: 'Morris leads Quinstyle\'s operational excellence initiatives. With deep expertise in facility management and hospitality operations, he ensures every project delivers measurable value to clients.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'precious',
    name: 'Precious Adeyemi',
    role: 'Client Relations Manager',
    bio: 'Precious serves as the primary point of contact for client communications, ensuring seamless coordination between Quinstyle teams and our valued partners. Her attention to detail ensures every project runs smoothly.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  }
];