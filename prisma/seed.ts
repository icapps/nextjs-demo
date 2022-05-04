import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.toDo.deleteMany()

  await prisma.toDo.create({
    data: {
      description: 'Prepare a demo for Next.js',
      isDone: true,
    },
  })

  await prisma.toDo.create({
    data: {
      description: 'Prepare a demo for Prisma',
      isDone: true,
    },
  })

  await prisma.toDo.create({
    data: {
      description: 'Show everyone that Prisma is awesome',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
