import SiteFooter from "@/components/SiteFooter";

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex-1">{children}</div>
      <SiteFooter showDemoDisclaimer={isDemoMode} />
    </>
  );
}
