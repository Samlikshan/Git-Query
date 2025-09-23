import { PrismaClient } from "../../generated/prisma/client"; // Correct import

const prisma = new PrismaClient(); // Instantiate PrismaClient once

export { prisma }; // Export the instance as a named export
