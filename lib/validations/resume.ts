import { z } from 'zod';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  location: z.string().min(2, 'Location is required'),
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url().optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(2, 'Institution name is required'),
  degree: z.string().min(2, 'Degree is required'),
  field: z.string().min(2, 'Field of study is required'),
  startDate: z.string(),
  endDate: z.string(),
  gpa: z.number().min(0).max(4).optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  location: z.string().min(2, 'Location is required'),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  description: z.array(z.string().min(10, 'Description must be at least 10 characters')),
});

export const skillSchema = z.object({
  name: z.string().min(2, 'Skill name is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
});

export const languageSchema = z.object({
  name: z.string().min(2, 'Language name is required'),
  proficiency: z.enum(['Basic', 'Conversational', 'Fluent', 'Native']),
});

export const certificationSchema = z.object({
  name: z.string().min(2, 'Certification name is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().min(50, 'Summary must be at least 50 characters'),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
});