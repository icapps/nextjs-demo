import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.toDo.deleteMany()

  await prisma.toDo.create({
    data: {
      description: 'Prepare a demo',
      isDone: true,
    },
  })

  await prisma.toDo.create({
    data: {
      description:
        'Surprise everyone with the fact that this project has no backend',
    },
  })

  await prisma.toDo.create({
    data: {
      description: 'Show the advantages of static site generation',
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
