'use server'

import { prisma } from "./prisma/prisma";

export default async function searchPowerStrip(id: number) {
  try {
    const powerStrip = await prisma.powerStrip.findMany(
      {
        where: {
          rackId: id
        }
      }
    );
    return powerStrip
  } catch (err) {
    console.error("Erro ao buscar localizações:", err);
    return [];
  }
}
