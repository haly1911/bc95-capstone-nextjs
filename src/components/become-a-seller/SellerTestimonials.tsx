import Image from "next/image";

const SellerTestimonials = () => {
  const testimonials = [
    {
      quote:
        "Joining Skillora was a turning point for my design career. I now work with international clients on my own schedule.",
      author: "Sarah Jenkins",
      role: "UI/UX Designer",
      earnings: "Earned $15k+",
      avatar: "/seller-testimonial-1.jpg",
    },
    {
      quote:
        "The platform makes it super easy to showcase my writing skills and get consistent orders without chasing clients.",
      author: "David Miller",
      role: "Content Writer",
      earnings: "Earned $10k+",
      avatar: "/seller-testimonial-2.jpg",
    },
  ];
  return (
    <section className="py-20 wrapper max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Success stories from our community</h2>
        <p className="text-muted-foreground">See how everyday creators built profitable freelance careers.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between space-y-6"
          >
            <p className="text-base italic text-muted-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-4 pt-4 border-t border-border/60">
              <Image
                src={t.avatar}
                alt={t.author}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-sm">{t.author}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                {t.earnings}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellerTestimonials;
