// Quinstyle Survey Logic
// Decision tree for generating personalized service packages

export interface SurveyAnswers {
  serviceType: string[];
  propertyType: string;
  propertySize: string;
  currentStatus: string;
  location: string;
  budgetRange: string;
  timeline: string;
}

export interface SurveyOption {
  id: string;
  label: string;
  description?: string;
}

export const serviceTypeOptions: SurveyOption[] = [
  { id: 'consultancy', label: 'Consultancy', description: 'I need expert guidance on my project' },
  { id: 'project-management', label: 'Project Management & Construction', description: 'I\'m planning a development or construction project' },
  { id: 'facility-management', label: 'Property & Facility Management', description: 'I need ongoing management for my property' },
  { id: 'hospitality', label: 'Hospitality Management', description: 'I run a hospitality business and need support' },
  { id: 'unsure', label: 'Not Sure: Help Me Decide', description: 'I need guidance on what\'s right for me' }
];

export const propertyTypeOptions: SurveyOption[] = [
  { id: 'residential', label: 'Residential Property', description: 'Homes, apartments, estates' },
  { id: 'commercial', label: 'Commercial Property', description: 'Offices, retail spaces, warehouses' },
  { id: 'hospitality', label: 'Hospitality Venue', description: 'Hotels, resorts, restaurants, retreats' },
  { id: 'mixed-use', label: 'Mixed-Use Development', description: 'Combined residential and commercial' },
  { id: 'industrial', label: 'Industrial Facility', description: 'Manufacturing, logistics, storage' }
];

export const propertySizeOptions: SurveyOption[] = [
  { id: 'small', label: 'Small', description: 'Under 1,000 sqm' },
  { id: 'medium', label: 'Medium', description: '1,000 - 5,000 sqm' },
  { id: 'large', label: 'Large', description: '5,000 - 20,000 sqm' },
  { id: 'enterprise', label: 'Enterprise', description: 'Over 20,000 sqm' }
];

export const currentStatusOptions: SurveyOption[] = [
  { id: 'planning', label: 'Planning Phase', description: 'Just starting to think about the project' },
  { id: 'design', label: 'Design & Approvals', description: 'In the design or permitting stage' },
  { id: 'ready', label: 'Ready to Start', description: 'Approvals complete, ready to begin' },
  { id: 'ongoing', label: 'Ongoing Operations', description: 'Already operational, need management support' }
];

export const budgetRangeOptions: SurveyOption[] = [
  { id: 'starter', label: '₦10,000,000 - ₦50,000,000', description: 'Standard project scope' },
  { id: 'mid', label: '₦50,000,000 - ₦200,000,000', description: 'Significant investment' },
  { id: 'premium', label: '₦200,000,000 - ₦500,000,000', description: 'Large-scale project' },
  { id: 'enterprise', label: '₦500,000,000+', description: 'Major development or portfolio' }
];

export const timelineOptions: SurveyOption[] = [
  { id: 'urgent', label: 'Urgent', description: 'Need to start within 4 weeks' },
  { id: 'standard', label: 'Standard', description: '3-6 month timeline' },
  { id: 'flexible', label: 'Flexible', description: '6-12 month timeline' },
  { id: 'planning', label: 'Long-term', description: 'Planning for future, no rush' }
];

// Service package recommendations based on answers
export function generatePackageRecommendation(answers: SurveyAnswers): {
  recommended: string[];
  alternatives: string[];
  estimatedInvestment: string;
  nextSteps: string[];
} {
  const recommended: string[] = [];
  const alternatives: string[] = [];

  // Base recommendation on primary service type
  if (answers.serviceType.includes('consultancy')) {
    recommended.push('Feasibility Assessment & Strategic Planning');
  }
  if (answers.serviceType.includes('project-management')) {
    recommended.push('Full Project Management Package');
    if (answers.propertySize === 'large' || answers.propertySize === 'enterprise') {
      recommended.push('Architectural Design Services');
    }
  }
  if (answers.serviceType.includes('facility-management')) {
    recommended.push('Complete Facility Management Plan');
    if (answers.propertySize === 'large' || answers.propertySize === 'enterprise') {
      recommended.push('Dedicated Operations Manager');
    }
  }
  if (answers.serviceType.includes('hospitality')) {
    recommended.push('Hospitality Operations Package');
    recommended.push('Guest Experience Enhancement Program');
  }
  if (answers.serviceType.includes('unsure')) {
    // Suggest comprehensive assessment
    recommended.push('Comprehensive Built Environment Assessment');
    alternatives.push('Initial Consultation Call');
  }

  // Adjust based on timeline
  if (answers.timeline === 'urgent') {
    recommended.unshift('Rapid Response Assessment');
  }

  // Estimate investment range
  let estimatedInvestment = 'Contact for Quote';
  if (answers.budgetRange === 'starter') {
    estimatedInvestment = '₦10,000,000 - ₦25,000,000';
  } else if (answers.budgetRange === 'mid') {
    estimatedInvestment = '₦50,000,000 - ₦100,000,000';
  } else if (answers.budgetRange === 'premium') {
    estimatedInvestment = '₦200,000,000 - ₦350,000,000';
  } else if (answers.budgetRange === 'enterprise') {
    estimatedInvestment = '₦500,000,000+ (Custom Quote)';
  }

  const nextSteps = [
    'Schedule a consultation call with our team',
    'Receive detailed proposal within 48 hours',
    'Begin with initial assessment or onboarding'
  ];

  return { recommended, alternatives, estimatedInvestment, nextSteps };
}