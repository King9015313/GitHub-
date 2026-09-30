import React, { useState } from 'react';
import { X, Send, Copy, Check, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface PitchFrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrive: () => void;
}

export const PitchFrameworkModal: React.FC<PitchFrameworkModalProps> = ({
  isOpen,
  onClose,
  onOpenDrive,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'template'>('breakdown');

  if (!isOpen) return null;

  const hrpaSteps = [
    {
      letter: 'H',
      name: 'Hook',
      subtitle: 'The Pattern Interrupt',
      rule: 'Never say "Hope you are doing well" or "My name is X". Reference a specific public initiative, recent launch, or concrete detail about their company.',
      example: '"Saw your team recently migrated the checkout funnel over to Next.js—noticed a quick UX friction point on mobile cart drawers."',
    },
    {
      letter: 'R',
      name: 'Relate',
      subtitle: 'Empathy & Context',
      rule: 'Demonstrate you understand their high-stakes business priority (conversion rate, retaining users, brand trust) rather than just pushing services.',
      example: '"With high-AOV consumer brands, that specific step usually causes up to 14% silent drop-off during peak traffic campaigns."',
    },
    {
      letter: 'P',
      name: 'Proof',
      subtitle: 'Quantified Evidence',
      rule: 'State 1 tangible result or share a 60-second video teardown with zero fluff. No 20-page portfolio attachments.',
      example: '"We solved this exact layout friction for [Client Name] last month, recovering ~$28,000 in monthly abandoned cart revenue."',
    },
    {
      letter: 'A',
      name: 'Ask',
      subtitle: 'Low-Friction Invitation',
      rule: 'Never ask for a 30-minute calendar call immediately. Offer a zero-commitment asset (a 2-min Loom or 1-page wireframe mockup).',
      example: '"Mind if I send over a quick 90-second video breakdown showing the exact 2 tweaks we made? Either way, keep crushing it!"',
    },
  ];

  const fullPitchScript = `Hey [First Name],

Saw your team recently updated the [Specific Feature/Page]—noticed a slight layout bottleneck on mobile screens that might be affecting checkout completion.

With high-velocity teams, that exact transition often causes a 10-15% conversion leak without showing up in basic crash logs. We recently redesigned this exact interaction for [Similar Client/Industry], lifting direct conversions by +24%.

Mind if I send over a 90-second Loom teardown with the wireframe tweaks? No pitch, just wanted to share the idea.

Best,
[Your Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPitchScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#121417] border border-white/[0.1] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                The HRPA Cold Pitch Framework
              </h3>
              <p className="text-xs text-neutral-400">
                Hook · Relate · Proof · Ask · 42% Average Reply Rate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close pitch modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-white/[0.06] bg-[#14161a]">
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'breakdown'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            HRPA Pillars Breakdown
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'template'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Ready-to-Send Template
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'breakdown' ? (
            <div className="space-y-3">
              {hrpaSteps.map((step) => (
                <div
                  key={step.letter}
                  className="p-4 rounded-xl bg-[#16181d] border border-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500 text-black font-bold text-xs flex items-center justify-center font-mono">
                      {step.letter}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {step.name} — <span className="text-neutral-400 font-normal">{step.subtitle}</span>
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 mb-2.5">
                    {step.rule}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#0e1013] border border-white/[0.04] text-xs font-mono text-emerald-300/90 italic">
                    {step.example}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Plug-and-play outbound email / LinkedIn message
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative p-4 rounded-xl bg-[#0e1013] border border-white/[0.08] font-mono text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500 selection:text-black">
                {fullPitchScript}
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-neutral-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Pro Tip:</strong> 11 more industry-specific scripts (Web Design, Copywriting, Full-stack, Video Production) are inside your Notion system in Google Drive.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#16181d]">
          <div className="text-xs text-neutral-500">
            Included in Module 02 of Client Ready
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenDrive();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]"
          >
            <span>Open Notion Pitch Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
