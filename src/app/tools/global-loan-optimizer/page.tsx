
import { GlobalLoanOptimizer } from "./global-loan-optimizer";
import { tools } from "@/lib/tools";
import { ToolInfo } from "@/components/ToolInfo";

export default function Page() {
  const tool = tools.find(t => t.slug === 'global-loan-optimizer');

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div>
      <GlobalLoanOptimizer />
      <div className="p-4 md:p-8">
        <ToolInfo 
          features={tool.features} 
          howItWorks={tool.howItWorks} 
          useCases={tool.useCases} 
          faq={tool.faq || []} 
        />
      </div>
    </div>
  );
}
