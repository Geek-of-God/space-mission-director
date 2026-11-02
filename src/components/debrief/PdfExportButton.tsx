'use client';

import React from 'react';
import { FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PdfExportButton: React.FC = () => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handlePrint}
      className="flex items-center gap-2 border-slate-700 hover:border-[#22D3EE] text-slate-200"
    >
      <FileText className="w-5 h-5 text-[#22D3EE]" />
      <span>📄 Exporter le Rapport Officiel (PDF)</span>
    </Button>
  );
};
