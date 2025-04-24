// app/actions/updateEquipmentPositions.ts
"use server";

import { prisma } from "./prisma/prisma";


type EquipmentPositionUpdate = {
  id: number;
  positionInRack: number;
};

export default async function updateEquipmentPositions(updates: EquipmentPositionUpdate[]) {
  try {
    const promises = updates.map(({ id, positionInRack }) =>
      prisma.equipament.update({
        where: { id },
        data: { positionInRack },
      })
    );

    await Promise.all(promises);

    return { success: true };
  } catch (err) {
    console.error("Erro ao atualizar posições:", err);
    return { success: false, message: "Erro ao atualizar posições dos equipamentos." };
  }
}
