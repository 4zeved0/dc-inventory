'use client';

import { useRef, useState } from 'react';

export default function SendImage({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Estado para a pré-visualização

  const handleFileChange = () => {
    setError(null);
    if (!inputFileRef.current?.files) return;

    const file = inputFileRef.current.files[0];
    setFileName(file.name);

    // Verifica formato (PNG, JPG)
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      setError('A imagem deve ser PNG ou JPG.');
      setPreviewUrl(null);
      onFileSelect(null);
      return;
    }

    // Atualiza a imagem de pré-visualização
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Input oculto */}
      <input
        className="hidden"
        name="file"
        ref={inputFileRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleFileChange}
        required
      />

      {/* Botão estilizado com pré-visualização da imagem */}
      <button
        type="button"
        className="w-20 h-20 rounded-full bg-slate-900 text-white hover:text-slate-200 font-bold hover:bg-slate-950 transition flex items-center justify-center overflow-hidden"
        onClick={() => inputFileRef.current?.click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-full" />
        ) : (
          <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Nome do arquivo selecionado */}
      {fileName && <p className="text-sm text-gray-700">Arquivo: <span className="font-semibold">{fileName}</span></p>}

      {/* Mensagem de erro */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
