import { ApiCategory } from "@/types/category";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaStackExchange, FaXTwitter } from "react-icons/fa6";
import FooterCategoryList from "./FooterCategoryList";

interface FooterProps {
  categories: ApiCategory[];
}

const Footer = ({ categories }: FooterProps) => {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="wrapper py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="logo-icon">
                <FaStackExchange />
              </span>
              <span className="text-lg font-extrabold">
                Skill<span className="text-accent">ora</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The freelance marketplace built for makers, teams, and everything in between.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Categories</h4>
            <FooterCategoryList categories={categories} />
          </div>
          <div>
            <h4 className="text-sm font-semibold">About</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Press & News
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/become-seller" className="hover:text-accent">
                  Selling on Skillora
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-accent">
                  Buying on Skillora
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Podcast
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Skillora Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl hover:text-accent">
              <FaXTwitter />
            </Link>
            <Link href="/" className="text-xl hover:text-accent">
              <FaInstagram />
            </Link>
            <Link href="/" className="text-xl hover:text-accent">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
