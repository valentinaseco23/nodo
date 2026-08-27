import { useEffect } from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  text: string;
}

interface NotificationToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export function NotificationToast({ toast, onDismiss }: NotificationToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div 
      id="notification-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white text-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] border-2 border-slate-900 animate-in slide-in-from-bottom-5 duration-200"
    >
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
      ) : (
        <Info className="w-5 h-5 text-indigo-600 shrink-0 stroke-[2.5]" />
      )}
      <p className="text-xs font-black text-slate-900">{toast.text}</p>
    </div>
  );
}
