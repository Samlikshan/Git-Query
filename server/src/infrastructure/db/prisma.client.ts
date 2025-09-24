import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Instantiate PrismaClient once

export { prisma }; // Export the instance as a named export
