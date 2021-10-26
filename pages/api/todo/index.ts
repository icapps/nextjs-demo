// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../helpers/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ToDo } from '.prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[]>
) {
  switch (req.method) {
    case 'GET': {
      const toDos = await prisma.toDo.findMany()
      res.status(200).json(toDos)
      break
    }
    case 'POST': {
      const toDo = await prisma.toDo.create({ data: req.body })
      res.status(201).json(toDo)
    }
  }
}
