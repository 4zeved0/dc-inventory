// app/(private)/register-itens/page.tsx

import RegisterItemForm from "@/app/components/RegisterItemForm";
export default async function CadastroItems({
  searchParams,
}: {
  searchParams: Promise<{
    locale?: string;
    datacenter?: string;
    rackId?: string;
    id?: string;
  }>;
}) {
  const params = await searchParams;
  const locale = params.locale ?? "";
  const datacenter = params.datacenter ?? "";
  const rackId = params.rackId ?? "";
  const id = params.id ?? "";

  return (
    <div className="max-w-[1100px] md:flex md:flex-col md:h-screen items-center justify-center m-auto">
      <h1 className="text-3xl mt-10 md:mt-0 font-bold text-center">Cadastro de Equipamento</h1>
      <RegisterItemForm
        locale={locale}
        datacenter={datacenter}
        rackId={rackId}
        id={id}
      />
    </div>
  );
}
