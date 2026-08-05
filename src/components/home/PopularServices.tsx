import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const popular = [
  {
    id: "1",
    title: "I will design a modern minimal logo for your brand",
    seller: "elena.k",
    price: 45,
    rating: 4.9,
    reviews: 812,
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
  },
  {
    id: "2",
    title: "I will build a full-stack web app in React and Node",
    seller: "marc.dev",
    price: 320,
    rating: 5.0,
    reviews: 214,
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600",
  },
  {
    id: "3",
    title: "I will run a targeted TikTok and Instagram ads campaign",
    seller: "sofia.m",
    price: 180,
    rating: 4.8,
    reviews: 402,
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600",
  },
  {
    id: "4",
    title: "I will write SEO-optimized blog articles that convert",
    seller: "danielw",
    price: 60,
    rating: 4.9,
    reviews: 611,
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
  },
  {
    id: "5",
    title: "I will produce a cinematic promo video for your product",
    seller: "kai.studio",
    price: 500,
    rating: 5.0,
    reviews: 138,
    img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600",
  },
  {
    id: "6",
    title: "I will compose original background music for your video",
    seller: "loop.lab",
    price: 90,
    rating: 4.9,
    reviews: 305,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
  },
  {
    id: "7",
    title: "I will fine-tune a custom GPT for your business workflow",
    seller: "ai.nova",
    price: 250,
    rating: 4.9,
    reviews: 92,
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
  },
  {
    id: "8",
    title: "I will create a stunning Webflow website in 7 days",
    seller: "flowbyte",
    price: 400,
    rating: 5.0,
    reviews: 176,
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600",
  },
];

const PopularServices = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">Most popular services</h2>
        <Link href="/explore" className="text-sm font-medium text-accent hover:underline">
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((g) => (
          <Link
            key={g.id}
            href="/"
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img src={g.img} alt="" className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-linear-to-br from-primary to-accent" />
                <span className="text-xs font-medium">{g.seller}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-foreground group-hover:text-accent">{g.title}</p>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <span className="text-accent">
                  <FaStar />
                </span>
                <span className="font-semibold">{g.rating}</span>
                <span className="text-muted-foreground">({g.reviews})</span>
              </div>
              <div className="mt-3 border-t border-border/60 pt-3 text-right">
                <span className="text-xs text-muted-foreground">from </span>
                <span className="text-sm font-bold">${g.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularServices;
