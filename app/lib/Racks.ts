'use server'

import { prisma } from "./prisma/prisma";

export default async function Racks(id: number) {
  try {
    const datacenters = await prisma.rack.findMany(
      {
        where: {
          datacenterId: id
        }
      }
    );
    return datacenters
  } catch (err) {
    console.error("Erro ao buscar localizações:", err);
    return [];
  }
}
