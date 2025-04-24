'use server'

import { prisma } from "./prisma/prisma";

export default async function Datacenters(id: number) {
  try {
    const datacenters = await prisma.datacenter.findMany(
      {
        where: {
          localizationId: id
        }
      }
    );
    return datacenters
  } catch (err) {
    console.error("Erro ao buscar localizações:", err);
    return [];
  }
}
