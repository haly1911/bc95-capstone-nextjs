"use client";

import { FaPlay, FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import VideoPopupModal from "./VideoPopupModal";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    img: "/testimonial-1.png",
    videoSrc: "/testimonial-vid-1.mp4",
    name: "Kay Kim, Co-Founder",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png",
    quote:
      "It's extremely exciting that Skillora has freelancers from all over the world — it broadens the talent pool. One of the best things about it is that while we're sleeping, someone's working.",
  },
  {
    id: 2,
    img: "/testimonial-2.png",
    videoSrc: "/testimonial-vid-2.mp4",
    name: "Caitlin Tormey, Chief Commercial Officer",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png",
    quote:
      "We've used for Shopify web development, graphic design, and backend web development. Working with makes my job a little easier every day.",
  },
  {
    id: 3,
    img: "/testimonial-3.png",
    videoSrc: "/testimonial-vid-3.mp4",
    name: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png",
    quote:
      "We used for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.",
  },
  {
    id: 4,
    img: "/testimonial-4.png",
    videoSrc: "/testimonial-vid-4.mp4",
    name: "Tim and Dan Joo, Co-Founders",
    logo: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png",
    quote: "When you want to create a business bigger than yourself, you need a lot of help. That's what does.",
  },
];

const Testimonial = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  return (
    <section className="w-full wrapper pb-20">
      <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Trusted by the best</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="testimonial-swiper"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="w-full lg:w-200 xl:w-full max-w-250 h-auto lg:h-70 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center p-8 rounded-2xl bg-card border border-border">
              <div
                onClick={() => setActiveVideo(item.videoSrc)}
                className="group relative w-full h-64 lg:h-full flex items-center justify-center cursor-pointer"
              >
                <Image
                  src={item.img}
                  alt={`testimonial-pic-${item.id}`}
                  fill
                  className="absolute inset-0 rounded-2xl object-cover"
                />
                <span className="absolute p-6 bg-accent/70 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition" />
                <span className="relative p-4 bg-accent/70 rounded-full transition">
                  <FaPlay className="text-background text-xl" />
                </span>
              </div>
              <div>
                <p className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-sm">{item.name}</span>
                  <span>|</span>
                  <span className="relative inline-block w-24 h-8">
                    <Image src={item.logo} alt={`testimonial-logo-${item.id}`} fill className="object-contain" />
                  </span>
                </p>
                <p className="relative py-6 px-4">
                  <FaQuoteLeft className="absolute top-4 left-0" />
                  <span className="block text-base text-justify indent-4 italic">{item.quote}</span>
                  <FaQuoteRight className="absolute bottom-4 right-0" />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {activeVideo && <VideoPopupModal videoSrc={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
};

export default Testimonial;
