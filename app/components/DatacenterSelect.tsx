type Datacenter = {
  id: number;
  name: string;
};

interface Props {
  datacenters: Datacenter[];
  onSelect: (id: number | null) => void;
  disabled?: boolean;
}

export default function DatacenterSelect({ datacenters, onSelect, disabled = false }: Props) {
  return (
    <div className="relative flex flex-col">
      <select
        id="datacenterSelect"
        disabled={disabled}
        className={`noarrow rounded-md p-3 border-2 pr-10 bg-[#D9D9D9] focus:ring-2 focus:ring-blue-500
          active:outline-none focus:outline-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Selecione um datacenter</option>
        {datacenters.map((dc) => (
          <option key={dc.id} value={dc.id}>
            {dc.name}
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
