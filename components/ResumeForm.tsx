'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/lib/validations/resume';
import type { Resume } from '@/lib/types/resume';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { PersonalInfoSection } from './resume-sections/PersonalInfoSection';
import { EducationSection } from './resume-sections/EducationSection';
import { ExperienceSection } from './resume-sections/ExperienceSection';
import { SkillsSection } from './resume-sections/SkillsSection';

export default function ResumeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
      },
      summary: '',
      education: [{
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      }],
      experience: [{
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
      }],
      skills: [{ name: '', level: 'Intermediate' }],
    },
  });

  async function onSubmit(data: Resume) {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }
      
      toast({
        title: 'Success!',
        description: 'Your resume has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoSection form={form} />
          </TabsContent>

          <TabsContent value="education">
            <EducationSection form={form} />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceSection form={form} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsSection form={form} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-32"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}