import FormAddPowerStrip from "@/app/components/FormAddPowerStrip"

function AddPowerStrip() {
  return (
    <div>
      <div className="max-w-[1100px] md:flex md:flex-col md:h-screen items-center justify-center m-auto">
        <h1 className="text-3xl mt-10 md:mt-0 font-bold text-center">Cadastrar nova régua</h1>
        <FormAddPowerStrip />
      </div>
    </div>
  )
}

export default AddPowerStrip