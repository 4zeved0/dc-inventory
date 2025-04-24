'use client'

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
  positionInRack: number;
  observations?: string;
  rackRackNumber: number;
};

function RegisterItemForm() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);


  };

  function convertLocalization() {

  }

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 w-full max-w-6xl p-6 rounded-lg">
        <div className="flex flex-col">
          <label>Id</label>
          <input disabled name="id" className="p-2 border border-slate-300 rounded" type="number" />
        </div>
        <div className="flex flex-col">
          <label>Marca</label>
          <input name="equipamentBrand" className="p-2 border border-slate-300 rounded" type="text" />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label>Nome</label>
          <input disabled name="nome" className="p-2 border border-slate-300 rounded" type="text" />
        </div>
        <div className="flex flex-col">
          <label>Modelo</label>
          <input name="model" className="p-2 border border-slate-300 rounded" type="text" />
        </div>
        <div className="flex flex-col col-span-1">
          <label>Serial</label>
          <input name="serialNumber" className="p-2 border border-slate-300 rounded" type="text" />
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
          <label>Cliente</label>
          <input name="client" className="p-2 border border-slate-300 rounded" type="text" />
        </div>
        <div className="flex flex-col">
          <label>Patrimonio</label>
          <input name="assetNumber" className="p-2 border border-slate-300 rounded" type="number" min={0} />
        </div>
        <div className="flex flex-col">
          <label>Hostname</label>
          <input name="hostname" className="p-2 border border-slate-300 rounded" type="text" />
        </div>
        <div className="flex flex-col">
          <label>Localização</label>
          <input name="localizacao" value="SP2" disabled className="p-2 border border-slate-300 rounded" type="text" min={0} />
        </div>
        <div className="flex flex-col">
          <label>Quantidade de U's</label>
          <input name="spaceQuantity" className="p-2 border border-slate-300 rounded" type="number" min={0} />
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