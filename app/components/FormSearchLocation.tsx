'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Locations from "../lib/Locations";
import Datacenters from "../lib/Datacenters";
import Racks from "../lib/Racks";
import DatacenterSelect from "./DatacenterSelect";
import LocationSelect from "./LocationSelect";
import RackSelect from "./RackSelect";
import { useRouter, usePathname } from "next/navigation";

type Location = { id: number; name: string };
type Datacenter = { id: number; name: string };
type Rack = { id: number; rackNumber: number; datacenterId: number };

function FormSearchLocation() {
  const router = useRouter();
  const pathname = usePathname();

  const [locationId, setLocationId] = useState<number | null>(null);
  const [datacenterId, setDatacenterId] = useState<number | null>(null);
  const [rackId, setRackId] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<null | string>(null);

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: Locations,
    staleTime: 300000,
  });

  const { data: datacenters = [] } = useQuery({
    queryKey: ["datacenters", locationId],
    queryFn: () => (locationId ? Datacenters(locationId) : Promise.resolve([])),
    enabled: !!locationId,
    staleTime: 300000,
  });

  const { data: racks = [] } = useQuery({
    queryKey: ["racks", datacenterId],
    queryFn: () => (datacenterId ? Racks(datacenterId) : Promise.resolve([])),
    enabled: !!datacenterId,
    staleTime: 300000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const action = button?.name;

    setActiveButton(action);

    const selectedData = {
      location: locations.find((loc) => loc.id === locationId) || null,
      datacenter: datacenters.find((dc) => dc.id === datacenterId) || null,
      rack: racks.find((r) => r.id === rackId) || null,
    };

    switch (action) {
      case "showDatacenter":
        if (selectedData.location && selectedData.datacenter) {
          router.push(
            `${pathname}/${selectedData.location.name}/${selectedData.datacenter.name}?id=${datacenterId}`
          );
        }
        break;
      case "searchEquipment":
        if (selectedData.location && selectedData.datacenter && selectedData.rack) {
          router.push(
            `${pathname}/${selectedData.location.name}/${selectedData.datacenter.name}/${selectedData.rack.id}/${selectedData.rack.rackNumber}`
          );
        }
        break;
      default:
        console.log("Ação não reconhecida.");
    }
  };

  return (
    <form className="flex flex-col gap-5 sm:w-[400px] py-3" onSubmit={handleSubmit}>
      {/* Location Select - Sempre habilitado */}
      <LocationSelect
        locations={locations}
        onSelect={(id) => {
          setLocationId(id || null);
          setDatacenterId(null);
          setRackId(null);
        }}
      />

      {/* Datacenter Select - Desativado se location não selecionado */}
      <DatacenterSelect
        datacenters={datacenters}
        onSelect={(id) => {
          setDatacenterId(id || null);
          setRackId(null);
        }}
        disabled={!locationId}
      />

      {/* Rack Select - Desativado se datacenter não selecionado */}
      <RackSelect
        racks={racks}
        onSelect={setRackId}
        disabled={!datacenterId}
      />

      {/* Botões aparecem se rack selecionado */}
      {rackId !== null && racks.length > 0 && (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <button
            name="showDatacenter"
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!activeButton}
          >
            {activeButton === "showDatacenter" ? "Carregando..." : "Ver Datacenter"}
          </button>
          <button
            name="searchEquipment"
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!activeButton}
          >
            {activeButton === "searchEquipment" ? "Carregando..." : "Pesquisar Equipamento"}
          </button>
        </div>
      )}
    </form>
  );

}

export default FormSearchLocation;
