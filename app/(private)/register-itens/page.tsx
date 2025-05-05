'use client';

import { useSearchParams } from 'next/navigation';
import RegisterItemForm from "@/app/components/RegisterItemForm";

function CadastroItems() {
  const searchParams = useSearchParams();

  const locale = searchParams.get("locale") || "";
  const datacenter = searchParams.get("datacenter") || "";
  const rackId = searchParams.get("rackId") || "";
  const id = searchParams.get("id") || "";

  return (
    <div>
      <div className="max-w-[1100px] md:flex md:flex-col md:h-screen items-center justify-center m-auto">
        <h1 className="text-3xl mt-10 md:mt-0 font-bold text-center">Cadastro de Equipamento</h1>
        <RegisterItemForm
          locale={locale}
          datacenter={datacenter}
          rackId={rackId}
          id={id}
        />
      </div>
    </div>
  );
}

export default CadastroItems;
