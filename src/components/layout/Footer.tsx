import Link from "next/link";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-primary to-accent text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 14c3-6 13-6 16 0" strokeLinecap="round" />
                  <circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="text-lg font-extrabold">
                Skill<span className="text-accent">ora</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The freelance marketplace built for makers, teams, and everything in between.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent">
                  Graphics & Design
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Programming & Tech
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  Writing & Translation
                </Link>
              </li>
            </ul>
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
