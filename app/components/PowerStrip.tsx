import { useQuery } from "@tanstack/react-query";
import searchPowerStrip from "../lib/searchPowerStrip";
import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function PowerStrip({ id, localizacao, dc, rack }: { id: number, localizacao: string, dc: string, rack: string }) {  // Agora recebendo localizacao e dc
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: powerStrips = [], isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => searchPowerStrip(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showPowerStrips, setShowPowerStrips] = useState(false);

  if (isLoading) return <div className="text-gray-600 text-sm">Carregando réguas...</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setShowPowerStrips(!showPowerStrips)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          {showPowerStrips ? <div className="flex items-center gap-2"><ArrowDown width={15} />Ocultar réguas</div> : <div className="flex items-center gap-2"><ArrowRight width={15} />Ver réguas</div>}
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition disabled:opacity-60"
          onClick={() => {
            setLoading(true);
            router.push(`/register-itens?locale=${localizacao}&datacenter=${dc}&rackId=${rack}&id=${id}`);
          }}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Adicionar Equipamento"}
        </button>
      </div>
      {showPowerStrips && (
        <>
          {powerStrips.length === 0 ? (
            <div className="text-sm text-gray-500">Nenhuma régua encontrada.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-4">
              {powerStrips.map((e, index) => {
                const color = e.powerStripColor.toLowerCase();
                const translatedColor = e.powerStripColor === "RED" ? "Vermelho" : "Azul";

                return (
                  <div
                    key={index}
                    className="relative bg-white p-4 rounded border-2 hover:border-gray-400 transition duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`bg-${color}-600 w-6 h-6 rounded-full border border-gray-300 cursor-pointer`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                      <span className="text-gray-700 texet-sm font-medium">{translatedColor}</span>
                    </div>

                    {hoveredIndex === index && (
                      <div className="absolute top-[-10px] left-16 bg-white border border-gray-300 shadow-md rounded-md p-2 z-10 text-sm w-40">
                        <div><strong>Cor:</strong> {translatedColor}</div>
                        <div><strong>Número:</strong> {e.powerStripNumber}</div>
                        <div><strong>KVA:</strong> {e.numberKva}</div>
                        <div><strong>Uso:</strong> {e.powerStripUsage}%</div>
                      </div>
                    )}

                    <div className="text-gray-600 text-sm">Número: <span className="font-semibold">{e.powerStripNumber}</span></div>
                    <div className="text-gray-600 text-sm">KVA: <span className="font-semibold">{e.numberKva}</span></div>
                    <div className="text-gray-600 text-sm">Uso: <span className="font-semibold">{e.powerStripUsage}%</span></div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PowerStrip;
