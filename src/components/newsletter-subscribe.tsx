"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterSubscribe({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok || data.success) {
        setState("success");
      } else {
        setState("error");
        setErrorMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className={`rounded-xl bg-emerald-50 border border-emerald-200 ${compact ? "p-4" : "p-6"}`}>
        <p className="text-emerald-800 font-medium">
          Thanks for subscribing! Check your email to confirm.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-emerald-50 border border-emerald-200 ${compact ? "p-4" : "p-6"}`}>
      <h3 className={`font-semibold text-slate-700 ${compact ? "text-base mb-1" : "text-lg mb-2"}`}>
        Get notified about new book releases and Tutarium updates
      </h3>
      <p className={`text-slate-600 ${compact ? "text-sm mb-3" : "mb-4"}`}>
        No spam, just updates when something new is published.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "loading"}
          className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 bg-white text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-4 py-2 rounded-xl border border-emerald-500 bg-emerald-500 text-white font-medium transition transform shadow active:scale-95 hover:bg-emerald-400 disabled:opacity-50 disabled:active:scale-100"
        >
          {state === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {state === "error" && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
