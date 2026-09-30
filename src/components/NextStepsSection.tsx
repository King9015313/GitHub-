import React from 'react';
import { Download, BookOpen, Send, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NextStepsSectionProps {
  onOpenDriveModal: () => void;
  onOpenGuideModal: () => void;
  onOpenPitchModal: () => void;
  downloadedState: boolean;
}

export const NextStepsSection: React.FC<NextStepsSectionProps> = ({
  onOpenDriveModal,
  onOpenGuideModal,
  onOpenPitchModal,
  downloadedState,
}) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Step 1: Download Assets',
      description: 'Save the Google Drive folder to your local device for instant offline access and template synchronization.',
      badgeText: downloadedState ? 'Assets Ready' : 'Direct Sync',
      actionLabel: 'Browse Drive Folder',
      icon: Download,
      action: onOpenDriveModal,
      isCompleted: downloadedState,
      accentGlow: 'hover:border-emerald-500/40',
      meta: '4.2 GB · 18 Templates & Assets',
    },
    {
      stepNumber: '02',
      title: 'Step 2: Read the 30-Day Guide',
      description: 'Start with the comprehensive PDF guide before customizing templates to understand the client acquisition system.',
      badgeText: 'Foundation',
      actionLabel: 'Preview 30-Day Blueprint',
      icon: BookOpen,
      action: onOpenGuideModal,
      isCompleted: false,
      accentGlow: 'hover:border-emerald-500/40',
      meta: '78 Pages · PDF & Notion Format',
    },
    {
      stepNumber: '03',
      title: 'Step 3: Send Your First Pitch',
      description: 'Use the proven HRPA framework (Hook, Relate, Proof, Ask) to reach out to high-ticket prospects and land clients.',
      badgeText: 'Execution',
      actionLabel: 'Explore HRPA Framework',
      icon: Send,
      action: onOpenPitchModal,
      isCompleted: false,
      accentGlow: 'hover:border-emerald-500/40',
      meta: '12 Pitch Scripts · 4 Follow-up Sequences',
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 md:mt-16 px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <span className="text-xs font-medium tracking-wider text-emerald-400 uppercase">
            Onboarding Roadmap
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Next Steps to Client Readiness
          </h2>
        </div>
        <p className="text-xs md:text-sm text-neutral-400 max-w-md">
          Follow this 3-step sequence to configure your freelance operating system and secure your first high-ticket retainer.
        </p>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.stepNumber}
              onClick={step.action}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#14161a] border border-white/[0.08] ${step.accentGlow} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  step.action();
                }
              }}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Step header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-emerald-400/90 tracking-wider">
                      {step.stepNumber}
                    </span>
                    <span className="text-neutral-500 text-xs">/ 03</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-neutral-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-200">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-emerald-300 transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Card Footer & Meta */}
              <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-col gap-2.5">
                <div className="text-[11px] text-neutral-500 font-mono tracking-tight flex items-center justify-between">
                  <span>{step.meta}</span>
                  {step.isCompleted && (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Downloaded
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
