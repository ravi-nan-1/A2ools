
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, HelpCircle } from "lucide-react";

interface ToolInfoProps {
  features: string[];
  howItWorks: string[];
  useCases: string[];
  faq: Array<{ question: string; answer: string }>;
}

export function ToolInfo({ features, howItWorks, useCases, faq }: ToolInfoProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <p>{feature}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {howItWorks.map((step, index) => (
            <p key={index}><strong>Step {index + 1}:</strong> {step}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {useCases.map((useCase, index) => (
            <p key={index}>- {useCase}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faq.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                <p className="font-semibold">{item.question}</p>
              </div>
              <p className="mt-1 text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
