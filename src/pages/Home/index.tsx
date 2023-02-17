import { gql, useMutation, useQuery } from '@apollo/client';
import { ArrowClockwise, Copy } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Inbox } from '../../components/Inbox';
import { emails } from '../../mock/emails';

interface HomeProps {

}

export interface Email {
  id: number
  title: string
  contact: string
  to: string
  content: string
}


export const Home: React.FC<HomeProps> = () => {
  const [myEmail, setMyEmail] = useState('matheus@teste.com')
  const [filteredEmail, setFilteredEmail] = useState<Email>(emails[0])
  const [count, setCount] = useState(15)


  const handleClick = (email: number) => {
    let filter = emails.filter((item) => item.id === email)
    setFilteredEmail(...filter)
    return filteredEmail
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => { setCount(count - 1) }, 1000)
    }

    if (count === 0) handleRefresh()
  }, [count])

  return (
    <div className='flex flex-col gap-10 flex-1 h-screen'>
      <Header />

      <main className="flex flex-col flex-1 border-2 border-gray-200 lg:mx-2 lg:my-2">
        <div className='flex flex-col lg:w-1/4 sm:w-full mx-auto h-fit my-4 sm:my-1'>
          <label className=''>Your temporary email address</label>
          <div className='flex border-2 rounded border-gray-200'>
            <input className='flex-1' type="text" onChange={(e) => setMyEmail(e.target.value)} value={myEmail} />
            <button className="flex items-center gap-1 px-2 w-20 border-l-2 border-gray-200 bg-white"><Copy size={20} /> Copy</button>
          </div>
          <div className='flex items-center justify-center mt-3'>
            Auto-refresh in {count} <button onClick={handleRefresh} className="flex gap-1 ml-2"><ArrowClockwise size={20} /> Refresh</button>
          </div>
        </div>

        <section className="flex sm:flex-col lg:flex-row flex-1 border-t-2 mt-8 border-gray-200">
          <aside className='border-r-2 border-gray-200'>
            <div className='flex h-12 w-96 px-3 items-center border-b-2 border-gray-200'>
              <h2>Inbox</h2>
            </div>
            <div className='divide-y border-b-2'>

              {myEmail !== '' && <Inbox emails={emails} myEmail={myEmail} handleClick={handleClick} />}
            </div>
          </aside>
          <div className='flex flex-col flex-1'>
            <div className='h-12 border-b-2 border-gray-200 bg-gray-100' />
            <div className='flex flex-col flex-1 bg-gray-100'>
              <h3 className='mx-5 mt-3 font-bold'>{filteredEmail.to === myEmail && filteredEmail.title}</h3>
              <div className='flex-1 m-3 p-2 bg-white'>
                {filteredEmail.to === myEmail && filteredEmail.content}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};