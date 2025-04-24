'use server'

import { prisma } from "./prisma/prisma";

export default async function Locations() {
  try {
    const locations = await prisma.localization.findMany();
    return locations
  } catch (err) {
    console.error("Erro ao buscar localizações:", err);
    return [];
  }
}
