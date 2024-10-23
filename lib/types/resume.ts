export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: number;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Resume {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages?: {
    name: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }[];
  certifications?: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
  }[];
}