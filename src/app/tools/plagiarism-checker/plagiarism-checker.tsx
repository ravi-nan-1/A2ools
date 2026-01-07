"use client";

import React from "react";

interface PlagiarismCheckerProps {
  children?: React.ReactNode;
}

export function PlagiarismChecker({ children }: PlagiarismCheckerProps) {
  const toolUrl = "https://plagiarism.all2ools.com/";

  return (
    <div className="w-full">
      <iframe
        src={toolUrl}
        className="w-full h-screen border-0"
        title="Plagiarism Checker"
        allow="fullscreen"
      />

      {children && (
        <div className="mt-8">
          {children}
        </div>
      )}
    </div>
  );
}
