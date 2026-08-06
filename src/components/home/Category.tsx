import Link from "next/link";
import {
  FaBriefcase,
  FaChartLine,
  FaHeadphones,
  FaLaptopCode,
  FaPalette,
  FaPencil,
  FaRobot,
  FaVideo,
} from "react-icons/fa6";

const categories = [
  { name: "Graphics & Design", slug: "graphics-design", icon: <FaPalette /> },
  { name: "Programming & Tech", slug: "programming-tech", icon: <FaLaptopCode /> },
  { name: "Digital Marketing", slug: "digital-marketing", icon: <FaChartLine /> },
  { name: "Writing & Translation", slug: "writing-translation", icon: <FaPencil /> },
  { name: "Video & Animation", slug: "video-animation", icon: <FaVideo /> },
  { name: "Music & Audio", slug: "music-audio", icon: <FaHeadphones /> },
  { name: "AI Services", slug: "ai-services", icon: <FaRobot /> },
  { name: "Business", slug: "business", icon: <FaBriefcase /> },
];

const Category = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Browse categories</h2>
          <p className="mt-1 text-sm text-muted-foreground">Explore our most popular service categories.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href="/"
            className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="text-3xl group-hover:text-accent">{c.icon}</div>
            <h3 className="mt-4 text-sm font-semibold group-hover:text-accent">{c.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">120+ services</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
