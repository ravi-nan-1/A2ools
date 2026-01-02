import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18a2.5 2.5 0 0 0 2.5-2.5c0-2.07-2.5-2.5-2.5-5 .02-1.38 1.12-2.5 2.5-2.5" />
      <path d="M12 18a2.5 2.5 0 0 1-2.5-2.5c0-2.07 2.5-2.5 2.5-5A2.5 2.5 0 0 1 9.5 8" />
      <path d="M8 12h8" />
    </svg>
  );
}
