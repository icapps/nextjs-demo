import { ToDo } from '.prisma/client'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Head from 'next/head'
import prisma from '../helpers/prisma'
import { TrashIcon, PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/dist/client/router'
import { FormEvent, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const toDos = await prisma.toDo.findMany({ orderBy: { createdAt: 'asc' } })

  return {
    props: { toDos },
  }
}

const Home: NextPage = ({
  toDos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [newToDo, setNewToDo] = useState('')

  const refresh = () => {
    router.replace(router.asPath)
  }

  const addToDo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await fetch(`/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: newToDo,
      }),
    })

    setNewToDo('')

    refresh()
  }

  const updateToDo = async (id: number, isDone: boolean) => {
    await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDone,
      }),
    })

    refresh()
  }

  const deleteToDo = async (id: number) => {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    })

    refresh()
  }

  return (
    <div className="dark">
      <Head>
        <title>To-Do&apos;s</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen bg-gray-800 flex items-center justify-center">
        <div className="overflow-hidden transition-colors duration-200 transform rounded-lg w-96 bg-gray-700">
          <p className="py-2 text-sm text-center text-white uppercase bg-blue-500">
            To-Do&apos;s
          </p>
          <div className="px-6 py-4">
            <div className="space-y-8">
              {toDos.map((toDo: ToDo) => (
                <div key={toDo.id} className="flex justify-between">
                  <div className="flex">
                    <input
                      className="text-blue-500 w-6 h-6 rounded-full focus:ring-0 focus:ring-offset-0"
                      type="checkbox"
                      checked={toDo.isDone}
                      onChange={(e) => updateToDo(toDo.id, e.target.checked)}
                    />

                    <span className="mx-4 text-white">{toDo.description}</span>
                  </div>
                  <div className="flex">
                    <button onClick={(e) => deleteToDo(toDo.id)}>
                      <TrashIcon className="text-white h-6" />
                    </button>
                  </div>
                </div>
              ))}
              <form className="flex space-x-8" onSubmit={(e) => addToDo(e)}>
                <input
                  type="text"
                  className="bg-transparent outline-none w-full text-white border-0 focus:ring-0 border-b-2 border-gray-600"
                  value={newToDo}
                  onChange={(e) => setNewToDo(e.target.value)}
                  placeholder="Create a project in Next.js"
                />
                <button>
                  <PlusIcon className="text-white h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
