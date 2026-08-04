import type { CSSProperties } from 'react';

interface DemoDisclaimerProps {
  className?: string;
  style?: CSSProperties;
}

export default function DemoDisclaimer({ className = '', style }: DemoDisclaimerProps) {
  return (
    <div className={className} style={style}>
      Products shown are for demonstration purposes only. No affiliation or partnership is implied.
    </div>
  );
}
