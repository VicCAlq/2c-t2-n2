import { Scroll, ShieldAlert, X, Sparkles } from 'lucide-react';

export default function ModalAvisoRGB({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
      <div 
        className="relative w-full max-w-lg bg-[#2a170e] border-8 border-[#54331d] p-6 text-[#e8cfa6] shadow-none rounded-none outline outline-4 outline-[#180c07]"
        style={{ fontFamily: "'Cinzel', Georgia, serif" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#e8cfa6] hover:bg-[#54331d] p-1 border-2 border-[#54331d] rounded-none bg-[#180c07]"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b-4 border-[#54331d] pb-3 mb-4 flex items-center gap-3">
          <div className="bg-[#180c07] p-2 border-2 border-[#54331d]">
            <Scroll className="w-8 h-8 text-[#d97706]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#b45309] uppercase block tracking-widest">
              DECRETO ANTIGO
            </span>
            <h3 className="text-lg font-black uppercase text-[#f59e0b] tracking-tighter">
              RITUAL DO MODO VITINHO
            </h3>
          </div>
        </div>

        <div className="bg-[#180c07] border-4 border-[#54331d] p-4 mb-5 text-xs text-[#d97706] leading-relaxed space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#f59e0b] text-sm uppercase">
            <ShieldAlert className="w-4 h-4" /> AVISO DO REINO
          </div>
          <p className="font-bold text-[#e8cfa6]">
            ATENÇÃO: VOCÊ ESTÁ PRESTES A INVOCAR O MODO VITINHO!
          </p>
          <p>
            ESTE ENCANTAMENTO ANCESTRAL VAI PREENCHER TODO O PORTAL COM LUZES RGB RELUZENTES E CORES PRISMÁTICAS.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-[#180c07] hover:bg-[#3d2315] text-[#e8cfa6] font-black text-xs uppercase border-2 border-[#54331d] rounded-none cursor-pointer"
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 bg-[#b45309] hover:bg-[#d97706] text-black font-black text-xs uppercase border-2 border-[#f59e0b] rounded-none cursor-pointer flex items-center justify-center gap-1"
          >
            <Sparkles className="w-4 h-4" /> ATIVAR MODO VITINHO
          </button>
        </div>
      </div>
    </div>
  );
}
