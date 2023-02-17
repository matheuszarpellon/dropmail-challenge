import { ArrowClockwise, Copy } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
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
  const [myEmail, setMyEmail] = useState('')
  const [filteredEmail, setFilteredEmail] = useState<Email>(emails[0])
  const [count, setCount] = useState(15)

  //Função que captura a string no input e salva no localStorage
  const handleTemporaryEmail = (email: string) => {
    setMyEmail(email)
    localStorage.setItem('@dropmail-1.0.0', JSON.stringify(email))
  }

  //Função que mostra a mensagem à direita, filtrando a mensagem pelo email selecionado no click
  const handleClick = (email: number) => {
    let filter = emails.filter((item) => item.id === email)
    setFilteredEmail(...filter)
    return filteredEmail
  }

  //Função que atualiza a página a cada 15 segundos
  const handleRefresh = () => {
    window.location.reload()
  }

  //Faz a atualização a página a cada 15 segundos de acordo com o contador e puxa o email do localStorage
  useEffect(() => {
    const temporaryEmail = localStorage.getItem('@dropmail-1.0.0')
    if (count > 0) {
      setTimeout(() => { setCount(count - 1) }, 1000)
    }
    
    if (temporaryEmail) {
      setMyEmail(temporaryEmail)
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
            <input className='flex-1' type="text" onChange={(e) => handleTemporaryEmail(e.target.value)} value={myEmail} />
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

              {myEmail !== '' &&
                emails.map((email) => {
                  const contentSlice = email.content.slice(0, 30)
                  const titleSlice = email.title.slice(0, 30)

                  if (email.to === myEmail) {
                    return (
                      <div className='p-2' key={email.id}>
                        <button className='text-left' onClick={() => { handleClick(email.id) }}>
                          <h4 className='font-bold'>{email.contact}</h4>
                          <p className='font-bold text-blue-500'>Subject: {email.title && email.title.length >= 30 ? titleSlice + '...' : email.title}</p>
                          <span>{email.content && email.content.length >= 30 ? contentSlice + '...' : email.content}</span>
                        </button>
                      </div>
                    )
                  }
                })}
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