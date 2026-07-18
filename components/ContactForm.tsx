"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "mt-2 w-full border-b border-line bg-transparent pb-2.5 pt-1 text-[15px] text-paper outline-none transition-colors duration-200 placeholder:text-muted/50 focus:border-crimson";

const labelClasses = "font-mono text-[11px] uppercase tracking-[0.2em] text-gold";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.status === 503) {
        // SMTP not configured yet — fall back to the visitor's mail client.
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:sdilrangi58@gmail.com?subject=${subject}&body=${body}`;
        setStatus("idle");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[560px]">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex flex-col gap-8">
        <label className="block">
          <span className={labelClasses}>Name</span>
          <input name="name" type="text" required placeholder="Your name" className={fieldClasses} />
        </label>
        <label className="block">
          <span className={labelClasses}>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </label>
        <label className="block">
          <span className={labelClasses}>Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are we building?"
            className={`${fieldClasses} resize-y`}
          />
        </label>
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === "sending"}
            className="border border-line px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:border-crimson hover:text-crimson disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p aria-live="polite" className="font-mono text-[11px] tracking-[0.1em]">
            {status === "sent" && (
              <span className="text-gold">Message sent — I&rsquo;ll get back to you soon.</span>
            )}
            {status === "error" && (
              <span className="text-crimson">
                Something went wrong — email me directly instead.
              </span>
            )}
          </p>
        </div>
      </div>
    </form>
  );
}
