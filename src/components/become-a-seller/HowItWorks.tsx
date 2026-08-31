const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Create your Gig",
      description: "Sign up for free, set up your profile, and offer your professional skills as a service (Gig).",
    },
    {
      step: "02",
      title: "Deliver great work",
      description: "Get notified when orders come in, communicate with clients, and deliver top-notch results.",
    },
    {
      step: "03",
      title: "Get paid safely",
      description: "Receive prompt payments securely through our trusted system as soon as the project is completed.",
    },
  ];
  return (
    <section className="py-20 wrapper">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <p className="text-muted-foreground">
          It's easy to get started and land your very first client in just 3 simple steps.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-8 space-y-4 relative shadow-sm hover:border-accent transition-colors"
          >
            <span className="text-4xl font-extrabold text-accent/40">{item.step}</span>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
