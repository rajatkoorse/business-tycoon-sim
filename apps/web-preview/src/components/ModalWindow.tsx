import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  icon: Icon,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md transition-all animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl max-h-[85vh] game-panel rounded-3xl flex flex-col shadow-2xl overflow-hidden border border-[#f59e0b]/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="h-16 px-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-transparent border border-[#f59e0b]/40 text-[#f59e0b]">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-cyber font-bold text-lg text-white tracking-wide">{title}</h3>
                {badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-mono font-bold">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs text-slate-400 font-mono">{subtitle}</p>}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-950/60">
          {children}
        </div>
      </div>
    </div>
  );
};
