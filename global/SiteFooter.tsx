import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const SOCIAL_LINKS = [
  { href: "https://github.com/AaryanBairagi", Icon: FaGithub, label: "GitHub", iconClass: "text-zinc-700" },
  { href: "https://www.linkedin.com/in/aaryan-bairagi-183249249/", Icon: FaLinkedin, label: "LinkedIn", iconClass: "text-blue-500" },
  { href: "https://x.com/aaryanb4real", Icon: FaTwitter, label: "X", iconClass: "text-gray-700" },
  { href: "https://www.instagram.com/aaryanb4real/", Icon: FaInstagram, label: "Instagram", iconClass: "text-pink-600" },
] as const;

export default function SiteFooter() {
  return (
    <>
      <section className="pt-5 w-full bg-black text-white backdrop-blur-md">

        <div className="flex items-center justify-center gap-6 pb-8">
          <span className="text-white/70">Follow:</span>
          {SOCIAL_LINKS.map(({ href, Icon, label, iconClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full bg-white p-3 shadow-sm transition hover:bg-cyan-100 hover:shadow-md"
            >
              <Icon className={`h-5 w-5 ${iconClass}`} />
            </a>
          ))}
        </div>
      </section>

      <footer className="py-10 text-center text-sm bg-black text-white hover:text-white/90">
        <div>© {new Date().getFullYear()} Social v3.0 · All Rights Reserved</div>
        <div className="mt-1">
          Made with <span className="text-cyan-500">🩵</span> by{" "}
          <span className="font-medium text-cyan-400">Aaryan Bairagi</span>
        </div>
      </footer>
      </>
  );
}
