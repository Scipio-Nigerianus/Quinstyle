// Quinstyle Services Data
// Placeholder content - to be replaced with actual client content

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  process: string[];
}

export const services: Service[] = [
  {
    id: 'consultancy',
    name: 'Consultancy',
    shortDescription: 'Expert guidance on project feasibility, profitability, and sustainability strategy for your built environment investments.',
    fullDescription: 'Our consultancy services provide comprehensive analysis and strategic planning for your built environment projects. From initial feasibility studies to long-term sustainability strategies, we help you make informed decisions that maximize value and minimize risk.',
    icon: 'consultancy',
    features: [
      'Feasibility Analysis & Assessment',
      'Profitability Forecasting',
      'Sustainability Strategy Development',
      'Risk Assessment & Mitigation',
      'Market Research & Positioning',
      'Regulatory Compliance Guidance'
    ],
    process: [
      'Initial Consultation & Needs Assessment',
      'Site Evaluation & Technical Analysis',
      'Strategic Planning & Recommendations',
      'Implementation Roadmap Development',
      'Ongoing Support & Review'
    ]
  },
  {
    id: 'project-management',
    name: 'Project Management & Construction',
    shortDescription: 'End-to-end project oversight from architectural design through construction completion, ensuring quality, timeline, and budget adherence.',
    fullDescription: 'Our integrated project management and construction services ensure your vision becomes reality. With architectural design capabilities and experienced construction management, we deliver projects that meet the highest standards of quality and sustainability.',
    icon: 'project',
    features: [
      'Architectural Design Services',
      'Construction Project Management',
      'Design & Build Solutions',
      'Quality Assurance & Control',
      'Timeline & Budget Management',
      'Sustainability Integration'
    ],
    process: [
      'Vision Definition & Design Brief',
      'Architectural Design Development',
      'Contractor Selection & Procurement',
      'Construction Phase Management',
      'Final Inspection & Handover'
    ]
  },
  {
    id: 'facility-management',
    name: 'Property & Facility Management',
    shortDescription: 'Comprehensive operational management ensuring your facilities run smoothly, efficiently, and sustainably day after day.',
    fullDescription: 'We provide complete facility and property management services that allow you to focus on your core business while we handle the day-to-day operations. Our comprehensive approach covers staffing, maintenance, and operational excellence.',
    icon: 'facility',
    features: [
      'Staff Training & Management',
      'Preventive Maintenance Programs',
      'Cleaning & Janitorial Services',
      'Equipment Maintenance (Generators, HVAC, Pool Systems)',
      'Operational Audits & Optimization',
      'Vendor & Supplier Management'
    ],
    process: [
      'Facility Assessment & Audit',
      'Customized Service Plan Development',
      'Staff Onboarding & Training',
      'Ongoing Operations Management',
      'Performance Reviews & Optimization'
    ]
  },
  {
    id: 'hospitality-management',
    name: 'Hospitality Management',
    shortDescription: 'Premium hospitality services for resorts, retreats, and hospitality properties, delivering exceptional guest experiences.',
    fullDescription: 'Our hospitality management services bring together the best of facility management and guest experience expertise. Whether for resorts, private retreats, or hospitality properties, we ensure exceptional experiences that keep guests returning.',
    icon: 'hospitality',
    features: [
      'Guest Experience Management',
      'Facility Maintenance & Aesthetics',
      'Hospitality Staff Training',
      'Amenity Quality Management',
      'Guest Satisfaction Monitoring',
      'Partnership with Premium Hospitality Resources'
    ],
    process: [
      'Property Assessment & Positioning',
      'Service Model Development',
      'Staff Recruitment & Training',
      'Operations Launch & Go-Live',
      'Continuous Guest Experience Optimization'
    ]
  }
];