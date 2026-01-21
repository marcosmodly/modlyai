interface DemoDisclaimerProps {
  className?: string;
}

export default function DemoDisclaimer({ className = '' }: DemoDisclaimerProps) {
  return (
    <div className={className}>
      Products shown are for demonstration purposes only. No affiliation or partnership is implied.
    </div>
  );
}
