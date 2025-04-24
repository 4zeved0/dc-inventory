// lib/getDatacenterByName.ts
'use server'

import { prisma } from "./prisma/prisma";

export default async function getDatacenterByName(name: string) {
  try {
    const datacenter = await prisma.datacenter.findFirst({
      where: { name },
    });

    return datacenter;
  } catch (err) {
    console.error("Erro ao buscar datacenter:", err);
    return null;
  }
}
