import { FaCircleCheck } from "react-icons/fa6";

const SellerFaq = () => {
  const faqs = [
    {
      q: "What do I need to sell on Skillora?",
      a: "All you need is a marketable skill (like writing, design, programming, video editing), a computer, and a passion for delivering quality work.",
    },
    {
      q: "How much does it cost to join?",
      a: "It is 100% free to join Skillora and create your Gigs. We only take a small commission percentage when you successfully earn money.",
    },
    {
      q: "When and how do I get paid?",
      a: "Once an order is successfully completed and cleared, funds are made available in your account balance for withdrawal.",
    },
  ];
  return (
    <section className="py-20 bg-card/50 border-t border-border/60">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Got questions? We've got answers.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-border bg-background p-6 space-y-2">
              <h4 className="font-bold flex items-center gap-2">
                <FaCircleCheck className="text-accent text-sm" /> {faq.q}
              </h4>
              <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerFaq;
