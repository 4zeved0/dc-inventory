"use server";

import { prisma } from "./prisma/prisma";


export default async function getEquipmentsByRack(id: number) {
  try {
    const equipments = await prisma.equipament.findMany({
      where: {
        rackId: id,
      },
    });

    return equipments;
  } catch (err) {
    console.error("Erro ao buscar equipamentos:", err);
    throw new Error("Erro ao buscar equipamentos");
  }
}
