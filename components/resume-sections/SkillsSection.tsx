'use client';

import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import type { Resume } from '@/lib/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

interface SkillsSectionProps {
  form: UseFormReturn<Resume>;
}

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export function SkillsSection({ form }: SkillsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills"
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-end gap-4">
          <FormField
            control={form.control}
            name={`skills.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`skills.${index}.level`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Proficiency Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: '', level: 'Intermediate' })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
}