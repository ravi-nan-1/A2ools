'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  { title: 'Advanced AI Analysis', description: 'Our tool uses sophisticated AI to detect not just direct copies, but also paraphrased content.' },
  { title: 'Side-by-Side Comparison', description: 'Easily compare the two texts with highlighted sections showing the similarities.' },
  { title: 'Similarity Score', description: 'Get a clear percentage score that indicates the level of similarity between the two texts.' },
  { title: 'Privacy-Focused', description: 'We don\'t store your text. Your privacy is our top priority.' },
];

export default function FeaturesOverview() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
