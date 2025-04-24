// lib/searchEquipament.ts
import { prisma } from "./prisma/prisma";

async function searchEquipament(id: number) {
  const res = await prisma.equipament.findMany({
    where: { id },
  });

  return res ?? []; // garante que nunca será null
}

export default searchEquipament;
