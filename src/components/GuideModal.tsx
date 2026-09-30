import React from 'react';
import { X, BookOpen, CheckCircle, ArrowRight, Clock, FileText } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrive: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onOpenDrive,
}) => {
  if (!isOpen) return null;

  const curriculum = [
    {
      week: 'Week 1',
      title: 'Positioning & Irresistible Offer Architecture',
      focus: 'Narrowing down your core freelance offer from generalist to specific problem-solver. Eliminating low-value hourly billing.',
      deliverable: 'Your 1-Sentence High-Ticket Offer Matrix',
    },
    {
      week: 'Week 2',
      title: 'The Anti-Portfolio & Proof Engineering',
      focus: 'How to structure case studies that sell outcomes instead of pretty mockups. Using client metrics to justify $5k+ retainers.',
      deliverable: '3 Interactive Case Study Decks (Figma + Notion)',
    },
    {
      week: 'Week 3',
      title: 'Target Prospecting & The HRPA Outreach Engine',
      focus: 'Building your curated list of 50 dream clients. Deploying the 4-part Hook-Relate-Proof-Ask outreach messages without spamming.',
      deliverable: 'Automated Prospect Tracking Pipeline',
    },
    {
      week: 'Week 4',
      title: 'Closing Calls, Contracts & Smooth Onboarding',
      focus: 'Navigating discovery conversations without pitching too early. Sending bulletproof contracts and collecting 50% upfront deposits.',
      deliverable: 'Signed Retainer Agreement & Client Portal',
    },
  ];

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
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                The 30-Day Freelance Fast-Track Playbook
              </h3>
              <p className="text-xs text-neutral-400">
                PDF & Notion Master Edition · 78 Pages · Actionable Step-by-Step
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 flex-1">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Clock className="w-4 h-4" />
              <span>Recommended Study Sequence</span>
            </div>
            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              Before jumping into Figma files or sending emails, read Chapters 1 through 3. This establishes the mental model behind why top 1% freelancers charge 3x-5x market rates with zero bidding platforms.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Curriculum & Action Items
            </div>
            {curriculum.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#16181d] border border-white/[0.05] hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] font-semibold text-emerald-400">
                    {item.week}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Module 0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {item.focus}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-400/90 pt-2 border-t border-white/[0.04]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Deliverable: {item.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Included inside your Google Drive</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenDrive();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]"
          >
            <span>Open PDF in Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
