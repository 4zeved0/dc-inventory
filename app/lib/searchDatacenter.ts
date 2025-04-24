'use server'

import { prisma } from "./prisma/prisma";

export default async function searchDatacenter(id: number) {
  try {
    const datacenters = await prisma.datacenter.findUnique(
      {
        where: {
          id: id
        }
      }
    );
    return datacenters
  } catch (err) {
    console.error("Erro ao buscar localizações:", err);
    return [];
  }
}
