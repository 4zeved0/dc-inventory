import FormSearchEquipment from '@/app/components/FormSearchEquipment';

export default async function RackSearchPage({
  params,
}: {
  params: Promise<{ rackId: number }>
}) {
  const { rackId } = await params;

  const rackIdNumber = Number(rackId);

  if (isNaN(rackIdNumber)) {
    throw new Error('rackId inválido');
  }

  return <FormSearchEquipment rackInformations={rackIdNumber} />
}
