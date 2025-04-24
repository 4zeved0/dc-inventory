type Rack = {
  id: number;
  rackNumber: number;
};

interface Props {
  racks: Rack[];
  onSelect: (rackId: number | null) => void
}

export default function RackSelect({ racks, onSelect }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? parseInt(event.target.value, 10) : null;
    onSelect(selectedId);
  };

  return (
    <div className="relative flex flex-col">
      <select
        className="noarrow rounded-md p-3 border-2 active:outline-none focus:outline-none bg-[#D9D9D9] pr-10"
        id="racksSelect"
        onChange={handleChange}
      >
        <option value="">Selecione um rack</option>
        {racks.map((rack) => (
          <option key={`${rack.id}-${rack.rackNumber}`} value={rack.id}>
            Rack {rack.rackNumber}
          </option>
        ))}
      </select>

      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 17V7L15 12L10 17Z" fill="#1D1B20" />
      </svg>
    </div>
  );
}
