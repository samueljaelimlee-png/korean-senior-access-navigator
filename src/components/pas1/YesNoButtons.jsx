import React from 'react';
import { Check, X } from 'lucide-react';

export default function YesNoButtons({ value, onChange }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 py-2.5 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all
          ${value === true 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}
      >
        <Check className="w-4 h-4" /> 예 (Yes)
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex-1 py-2.5 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all
          ${value === false 
            ? 'bg-red-50 border-red-400 text-red-700' 
            : 'bg-card border-border text-muted-foreground hover:bg-muted'}`}
      >
        <X className="w-4 h-4" /> 아니요 (No)
      </button>
    </div>
  );
}