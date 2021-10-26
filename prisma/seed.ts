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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
