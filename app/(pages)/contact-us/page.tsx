"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  LifeBuoy,
  Send,
  Clock3,
  Sparkles,
} from "lucide-react";
import SiteFooter from "@/global/SiteFooter";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message, please try again later.");
      }
    } catch {
      setError("Network error, please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassNames =
    "w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-cyan-500/40";

  return (
    <>
      <main className="min-h-screen bg-[#040b12] px-6 pb-20 pt-10 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-cyan-400"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* HERO */}
          <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#060b16] p-10 md:p-14">
            <div className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />

            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                {/* <Sparkles className="h-4 w-4" /> */}
                Social Support Center
              </div>

              <div className="max-w-3xl">
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                  Need a hand? We&apos;re here to help.
                </h1>
                <p className="text-lg leading-8 text-zinc-400">
                  Questions about your account, connections, messaging, or
                  anything else on Social — reach out and we&apos;ll get back
                  to you.
                </p>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* INFO */}
            <div className="rounded-[32px] border border-white/10 bg-[#070c16] p-8 md:p-10">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
                Support Information
              </p>
              <h2 className="mb-10 text-3xl font-bold">Get in touch.</h2>

              <div className="space-y-9">
                <InfoRow icon={MapPin} title="Location">
                  1186/A, Off J.M. Road, Shivajinagar, Pune, Maharashtra – 411005
                </InfoRow>

                <InfoRow icon={Mail} title="Email Support">
                  <a
                    href="mailto:aaryan_bairagi_it@mcoe.edu.in"
                    className="text-cyan-300 hover:underline"
                  >
                    aaryan_bairagi_it@mcoe.edu.in
                  </a>
                </InfoRow>

                <InfoRow icon={Clock3} title="Response Time">
                  Usually within 24 hours for all support requests.
                </InfoRow>

                <InfoRow icon={LifeBuoy} title="What we help with">
                  <ul className="space-y-2">
                    <li>• Account & login issues</li>
                    <li>• Connections & messaging problems</li>
                    <li>• Notes, files, and uploads</li>
                    <li>• Bug reports & feedback</li>
                  </ul>
                </InfoRow>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[32px] border border-white/10 bg-[#0a0f1a] p-8 md:p-10">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-400">
                Support Form
              </p>
              <h2 className="mb-10 text-3xl font-bold">Send a message.</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-zinc-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClassNames}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-zinc-400">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassNames}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm text-zinc-400">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Brief summary"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClassNames}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-zinc-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Describe your issue or request..."
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClassNames + " resize-none"}
                    required
                    disabled={submitting}
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
                {success && (
                  <p className="text-sm text-emerald-400">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-cyan-600 text-lg font-medium text-white transition hover:bg-cyan-500 disabled:opacity-60"
                >
                  {submitting ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
        <Icon className="text-cyan-300" size={22} />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <div className="leading-7 text-zinc-400">{children}</div>
      </div>
    </div>
  );
}


