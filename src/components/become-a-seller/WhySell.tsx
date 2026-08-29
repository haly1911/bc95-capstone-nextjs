import { FaDollarSign, FaHeadset, FaShieldHalved } from "react-icons/fa6";

const WhySell = () => {
  const benefits = [
    {
      icon: <FaDollarSign className="text-accent text-xl" />,
      title: "Freedom to set your terms",
      description: "You decide what you charge, when you work, and which clients you want to collaborate with.",
    },
    {
      icon: <FaShieldHalved className="text-accent text-xl" />,
      title: "Secure & reliable payments",
      description: "Our payment protection system ensures you always get paid for the work you successfully deliver.",
    },
    {
      icon: <FaHeadset className="text-accent text-xl" />,
      title: "24/7 Seller support",
      description:
        "Our dedicated support team is always ready to help you resolve issues and grow your freelance business.",
    },
  ];
  return (
    <section className="py-20 bg-card/50 border-y border-border/60">
      <div className="wrapper max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Why sell on Skillora?</h2>
          <p className="text-muted-foreground">
            Everything you need to grow your freelance career smoothly and securely.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {benefits.map((b, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-xl border border-border bg-background">
              <div className="h-12 w-12 rounded-lg bg-accent/10 grid place-items-center shrink-0">{b.icon}</div>
              <div className="space-y-1">
                <h4 className="font-bold">{b.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySell;
