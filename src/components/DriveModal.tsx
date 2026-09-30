import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Download,
  Copy,
  Check,
  FolderArchive,
  FileText,
  FileSpreadsheet,
  Layers,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface DriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadStarted?: () => void;
}

export const DriveModal: React.FC<DriveModalProps> = ({
  isOpen,
  onClose,
  onDownloadStarted,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  if (!isOpen) return null;

  const driveLink = 'https://drive.google.com/drive/folders/1BgUIa--gbPlmq1pZmPSE7d3wC_ssHHds';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(driveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSimulateDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(0);
    if (onDownloadStarted) onDownloadStarted();

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadCompleted(true);
          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };

  const files = [
    {
      name: '00_START_HERE_Client_Ready_Manifest.pdf',
      type: 'Guide',
      size: '1.4 MB',
      icon: FileText,
      tag: 'Required First Read',
    },
    {
      name: '01_The_30_Day_Freelance_Playbook.pdf',
      type: 'PDF Book',
      size: '18.6 MB',
      icon: FileText,
      tag: 'Core System',
    },
    {
      name: '02_HRPA_Client_Pitch_Scripts_&_Sequences.notion',
      type: 'Notion Template',
      size: 'Cloud Link',
      icon: Layers,
      tag: 'Duplicate to Workspace',
    },
    {
      name: '03_High_Ticket_Proposal_&_Pitch_Deck_Kit.fig',
      type: 'Figma File',
      size: '142 MB',
      icon: Layers,
      tag: 'Editable UI/UX Kit',
    },
    {
      name: '04_Standard_Freelance_Service_Agreement_V4.docx',
      type: 'Legal Contract',
      size: '850 KB',
      icon: ShieldCheck,
      tag: 'Lawyer Vetted',
    },
    {
      name: '05_Dynamic_Pricing_&_Retainer_Calculator.xlsx',
      type: 'Spreadsheet',
      size: '2.1 MB',
      icon: FileSpreadsheet,
      tag: 'Financial Model',
    },
    {
      name: '06_Client_Portal_&_Asana_ClickUp_Workspaces.zip',
      type: 'Archive',
      size: '89 MB',
      icon: FolderArchive,
      tag: 'Project Management',
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
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Client Ready Master Drive
              </h3>
              <p className="text-xs text-neutral-400">
                Shared Folder · Full Commercial Freelance License
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / File List */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Drive URL Box */}
          <div className="p-3.5 rounded-xl bg-[#181a1f] border border-white/[0.06] flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                Direct Google Drive Link
              </div>
              <p className="text-xs font-mono text-emerald-400 truncate">
                {driveLink}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-neutral-200 hover:bg-white/[0.1] hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <a
                href={driveLink}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Download Simulator Box */}
          {downloadProgress !== null && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-300 font-medium flex items-center gap-2">
                  {downloadCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Client-Ready-Master-Toolkit-2026.zip Ready
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-emerald-400 animate-bounce" />
                      Packaging and downloading asset bundle...
                    </>
                  )}
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {downloadProgress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              {downloadCompleted && (
                <p className="text-[11px] text-neutral-400 mt-2">
                  All templates and guides have been successfully initiated for offline access.
                </p>
              )}
            </div>
          )}

          {/* Included Files Inventory */}
          <div>
            <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2.5">
              Included In This Package ({files.length} Modules)
            </div>
            <div className="space-y-2">
              {files.map((file, idx) => {
                const Icon = file.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-neutral-200 truncate">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                          <span>{file.type}</span>
                          <span>·</span>
                          <span className="font-mono">{file.size}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded text-neutral-400 bg-white/[0.04] border border-white/[0.06] whitespace-nowrap shrink-0">
                      {file.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#16181d]">
          <div className="text-xs text-neutral-500">
            Trouble syncing? Contact <span className="text-neutral-300">support@clientready.co</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_18px_-3px_rgba(34,197,94,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>{downloadCompleted ? 'Re-Download ZIP' : 'Download All (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
