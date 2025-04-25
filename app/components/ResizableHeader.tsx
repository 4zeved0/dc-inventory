type Props = {
  colWidths: { [key: string]: number };
  onResize: (e: React.MouseEvent, field: string) => void;
};

export default function ResizableHeader({ colWidths, onResize }: Props) {
  const headers = {
    model: 'Modelo',
    equipamentBrand: 'Marca',
    equipamentType: 'Tipo',
    serial: 'Serial',
    assetNumber: 'Patrimônio',
    client: 'Cliente',
    hostname: 'Hostname',
    spaceQuantity: 'U',
    status: 'Status',
    observations: 'Observações',
  };

  return (
    <div className="flex w-full bg-gray-300 text-gray-700 border-b text-sm">
      {Object.keys(headers).map((field) => (
        <div
          key={field}
          style={{
            flexBasis: colWidths[field] || 150, // Valor padrão
            flexGrow: 0,
            flexShrink: 0,
            minWidth: 80,
            maxWidth: colWidths[field] || 150, // Valor padrão
          }}
          className="relative px-4 py-3 flex items-center font-bold bg-gray-300 border-l border-gray-400"
        >
          <span className="truncate w-full overflow-hidden whitespace-nowrap">
            {headers[field as keyof typeof headers]}
          </span>
          <div
            onMouseDown={(e) => onResize(e, field)}
            className="absolute top-0 right-0 h-full w-[5px] cursor-col-resize z-10"
            style={{ transform: 'translateX(50%)' }}
          />
        </div>
      ))}
    </div>
  );
}
