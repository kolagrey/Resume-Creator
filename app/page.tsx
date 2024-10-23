import ResumeForm from '@/components/ResumeForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Professional Resume Builder</CardTitle>
          <CardDescription>
            Create your professional resume with our structured form. Your data will be securely stored and formatted consistently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeForm />
        </CardContent>
      </Card>
    </main>
  );
}