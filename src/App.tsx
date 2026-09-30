import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { CelebrationCanvas } from './components/CelebrationCanvas';
import { SuccessCheckmark } from './components/SuccessCheckmark';
import { DriveModal } from './components/DriveModal';
import { GuideModal } from './components/GuideModal';
import { PitchFrameworkModal } from './components/PitchFrameworkModal';

export default function App() {
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [pitchModalOpen, setPitchModalOpen] = useState(false);
  const [downloadedState, setDownloadedState] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Trigger staggered animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleReplayCelebration = () => {
    setCelebrationKey((prev) => prev + 1);
    showToast('Celebration re-triggered! 🎉');
  };

  const handleOpenDrive = () => {
    setDriveModalOpen(true);
  };

  const handleDownloadSuccess = () => {
    setDownloadedState(true);
    showToast('Download started for Client-Ready-Master-Toolkit-2026.zip');
  };

  const faqs = [
    {
      q: 'Where do I find my Google Drive access link?',
      a: 'Click the large green "Access Your Files (Google Drive)" button above, or check your order confirmation email for your private permanent mirror link.',
    },
    {
      q: 'Can I use these templates with multiple freelance clients?',
      a: 'Yes! Your purchase comes with a full Commercial Freelance License. You are permitted to use all contracts, proposal decks, and pitch systems for unlimited client engagements.',
    },
    {
      q: 'How do I duplicate the Notion systems into my personal workspace?',
      a: 'Inside the Google Drive folder, click the Notion link and select the "Duplicate" button in the top right corner of your browser.',
    },
    {
      q: 'What if I need help or have questions about the templates?',
      a: 'Our priority freelance support team is available 7 days a week at support@clientready.co. All updates for 2026 are included for free.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-neutral-100 overflow-x-hidden flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Sleek Canvas Particles & Confetti Celebration Effect on load */}
      <CelebrationCanvas triggerKey={celebrationKey} intensity="high" />

      {/* Floating subtle ambient radial glow in background */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 Nav links) — Zone 3 (Action button) */}
      <header className="relative z-20 w-full border-b border-white/[0.06] bg-[#0c0d0e]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
            <span>Client Ready</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-400">
            <button
              onClick={handleOpenDrive}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Master Assets
            </button>
            <button
              onClick={() => setGuideModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              30-Day Guide
            </button>
            <button
              onClick={() => setPitchModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              HRPA Framework
            </button>
            <a
              href="#faqs"
              className="hover:text-emerald-400 transition-colors"
            >
              Help & FAQs
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReplayCelebration}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
              title="Replay success animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Celebrate</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Thank You / Payment Success Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-10 md:pt-14 pb-20 px-4">
        {/* Container for Centered Top Hero */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* 1. Animated Success Icon (Center top) */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-95'
            }`}
          >
            <SuccessCheckmark onReplay={handleReplayCelebration} />
          </div>

          {/* Staggered Element: Payment Reference Tag */}
          <div
            className={`mt-4 transition-all duration-700 delay-100 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-xs text-neutral-400 flex items-center justify-center gap-2 font-mono">
              <span className="text-emerald-400 font-medium">Order Confirmed</span>
              <span aria-hidden="true">·</span>
              <span>TXN #CR-88249</span>
              <span aria-hidden="true">·</span>
              <span>Lifetime License</span>
            </div>
          </div>

          {/* 2. Heading: "Payment Successful! You are now Client Ready." */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4 max-w-2xl text-balance transition-all duration-700 delay-150 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            Payment Successful! <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              You are now Client Ready.
            </span>
          </h1>

          {/* 3. Subtext: "Your transaction is complete. Your premium templates and guides are ready for download." */}
          <p
            className={`text-sm sm:text-base md:text-lg text-neutral-300 mt-4 max-w-xl leading-relaxed text-balance transition-all duration-700 delay-200 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            Your transaction is complete. Your premium templates and guides are ready for download.
          </p>

          {/* 4. Main CTA Button: Large neon green button saying "Access Your Files (Google Drive)" with download icon & hover scale/glow */}
          <div
            className={`mt-8 flex justify-center w-full sm:w-auto transition-all duration-700 delay-300 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="https://drive.google.com/drive/folders/1BgUIa--gbPlmq1pZmPSE7d3wC_ssHHds"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-neutral-950 bg-[#22c55e] hover:bg-[#16a34a] transition-all duration-200 ease-out transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_0px_rgba(34,197,94,0.45)] hover:shadow-[0_0_45px_10px_rgba(34,197,94,0.65)] cursor-pointer whitespace-nowrap"
            >
              <Download className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Access Your Files (Google Drive)</span>
            </a>
          </div>

          {/* Quick Trust Bar */}
          <div
            className={`mt-5 flex items-center justify-center gap-4 text-[12px] text-neutral-400 transition-all duration-700 delay-350 ease-out transform ${
              mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Google Drive Shared Folder
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Version 2026.4</span>
          </div>
        </div>

        {/* Assistance & FAQ Section */}
        <div
          id="faqs"
          className={`w-full max-w-3xl mx-auto mt-16 md:mt-24 px-4 transition-all duration-700 delay-500 ease-out transform ${
            mounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
              Assistance & FAQ
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Everything you need to know about accessing your download and onboarding.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#14161a] border border-white/[0.06] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-neutral-400 border-t border-white/[0.04] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Quiet, Minimalist Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-[#090a0b] py-8 px-4 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">Client Ready</span>
            <span aria-hidden="true">·</span>
            <span>The Premium Freelance Operating System</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://drive.google.com/drive/folders/1BgUIa--gbPlmq1pZmPSE7d3wC_ssHHds"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              Google Drive Mirror
            </a>
            <a
              href="mailto:support@clientready.co"
              className="hover:text-neutral-300 transition-colors"
            >
              Contact Support
            </a>
          </div>

          <div className="text-neutral-600">
            © {new Date().getFullYear()} Client Ready. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <DriveModal
        isOpen={driveModalOpen}
        onClose={() => setDriveModalOpen(false)}
        onDownloadStarted={handleDownloadSuccess}
      />

      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        onOpenDrive={handleOpenDrive}
      />

      <PitchFrameworkModal
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
        onOpenDrive={handleOpenDrive}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#16181d] border border-emerald-500/40 text-neutral-100 text-xs font-medium shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)] animate-scale-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
