'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  { title: 'Paste Your Texts', description: 'Copy and paste the two texts you want to compare into the designated fields.' },
  { title: 'Start the Check', description: 'Click the “Check for Plagiarism” button to initiate the analysis.' },
  { title: 'Get Your Results', description: 'Our AI will provide a similarity score and highlight matching text sections.' },
];

export default function HowItWorks() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Step {index + 1}: {step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
