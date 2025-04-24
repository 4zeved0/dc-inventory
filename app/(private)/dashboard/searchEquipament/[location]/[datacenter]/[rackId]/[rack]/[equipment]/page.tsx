'use client'

import Equipament from "@/app/components/Equipament";

function Page() {

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>Detalhes do Equipamento</h1>
        <Equipament />
      </div>
    </div>
  );
}

export default Page;
