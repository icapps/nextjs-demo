// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../helpers/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ToDo } from '.prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | null>
) {
  const { id } = req.query

  switch (req.method) {
    case 'PUT': {
      const toDo = await prisma.toDo.update({
        where: {
          id: parseInt(id as string),
        },
        data: req.body,
      })
      res.status(200).json(toDo)
      break
    }
    case 'DELETE': {
      const toDo = await prisma.toDo.delete({
        where: {
          id: parseInt(id as string),
        },
      })
      res.status(200).json(toDo)
    }
  }
}
