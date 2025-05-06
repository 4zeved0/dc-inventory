'use client';

import { useRouter } from 'next/navigation';
import registerItens from '../lib/registerItens';

type Props = {
  locale: string;
  datacenter: string;
  rackId: string;
  id: string;
};

type ItensType = {
  model: string;
  hostname?: string;
  client?: string;
  serialNumber?: string;
  status: boolean;
  spaceQuantity: number;
  equipamentType: string;
  assetNumber: number;
  equipamentBrand: string;
  positionInRack: number;  // Agora é obrigatório
  observations?: string;
  rackId: number;
  rackRackNumber: number;  // Agora é obrigatório
};

function RegisterItemForm({ locale, datacenter, rackId, id }: Props) {

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const itemData: ItensType = {
      model: data.model as string,
      hostname: data.hostname as string,
      client: data.client as string,
      serialNumber: data.serialNumber as string,
      status: data.status === 'on',
      spaceQuantity: Number(data.spaceQuantity),
      equipamentType: data.equipamentType as string,
      assetNumber: Number(data.assetNumber),
      equipamentBrand: data.equipamentBrand as string,
      observations: data.observations as string,
      rackId: Number(id), // Usando rackId como número do rack
      positionInRack: 1,  // Definindo um valor fixo ou você pode calcular isso dinamicamente
      rackRackNumber: Number(rackId),  // Agora passando rackId como rackRackNumber
    };

    try {
      await registerItens(itemData);
      alert('Equipamento registrado com sucesso!');
      router.push(`/dashboard`);
    } catch (error) {
      console.error('Erro ao registrar o equipamento:', error);
      alert('Ocorreu um erro ao registrar o equipamento.');
    }
  };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-6xl p-6 rounded-lg">
        {/* Informações fixas */}
        <div className="flex flex-col">
          <label htmlFor="locale">Localidade</label>
          <input id="locale" name="locale" className="p-2 border border-slate-300 rounded bg-gray-100" type="text" value={locale} disabled />
        </div>

        <div className="flex flex-col">
          <label htmlFor="datacenter">Datacenter</label>
          <input id="datacenter" name="datacenter" className="p-2 border border-slate-300 rounded bg-gray-100" type="text" value={datacenter} disabled />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rackId">Número do Rack</label>
          <input id="rackId" name="rackId" className="p-2 border border-slate-300 rounded bg-gray-100" type="number" value={rackId} disabled />
        </div>

        {/* Campos editáveis */}
        <div className="flex flex-col">
          <label htmlFor="equipamentBrand">Marca</label>
          <input id="equipamentBrand" name="equipamentBrand" className="p-2 border border-slate-300 rounded" type="text" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="model">Modelo</label>
          <input id="model" name="model" className="p-2 border border-slate-300 rounded" type="text" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="serialNumber">Serial</label>
          <input id="serialNumber" name="serialNumber" className="p-2 border border-slate-300 rounded" type="text" />
        </div>

        <div className="flex flex-col">
          <label>Status</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="on" defaultChecked className="accent-slate-800" /> Ligado
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="status" value="off" className="accent-slate-800" /> Desligado
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="client">Cliente</label>
          <input id="client" name="client" className="p-2 border border-slate-300 rounded" type="text" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="assetNumber">Patrimônio</label>
          <input id="assetNumber" name="assetNumber" className="p-2 border border-slate-300 rounded" type="number" min={0} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hostname">Hostname</label>
          <input id="hostname" name="hostname" className="p-2 border border-slate-300 rounded" type="text" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="spaceQuantity">Quantidade de Espaços</label>
          <input id="spaceQuantity" name="spaceQuantity" className="p-2 border border-slate-300 rounded" type="number" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="equipamentType">Tipo de Equipamento</label>
          <input id="equipamentType" name="equipamentType" className="p-2 border border-slate-300 rounded" type="text" />
        </div>

        <div className="flex flex-col col-span-full">
          <label htmlFor="observations">Observações</label>
          <textarea id="observations" name="observations" className="p-2 border border-slate-300 rounded" />
        </div>

        <button
          type="submit"
          className="bg-slate-800 text-white p-3 rounded col-span-full cursor-pointer hover:bg-slate-900"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default RegisterItemForm;
