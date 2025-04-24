'use client'; // Adicione esta linha

type Location = {
  id: number;
  name: string;
};

interface Props {
  locations: Location[];
  onSelect: (id: number | null) => void;
}

export default function LocationSelect({ locations, onSelect }: Props) {
  return (
    <div className="relative flex flex-col">
      <select
        id="locationSelect"
        className="noarrow rounded-md p-3 border-1 active:outline-none focus:outline-none bg-[#D9D9D9] pr-8 focus:ring-2 focus:ring-blue-500 "
        onChange={(e) => onSelect(e.target.value ? Number(e.target.value) : null)}
      >
        <option>Selecione um local</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>
      <svg
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none rotate-90`}
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
