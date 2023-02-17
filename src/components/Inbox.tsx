import { Email } from "../pages/Home"

interface InboxProps {
  emails: Email[]
  myEmail: string
  handleClick: (email: number) => void
}
export function Inbox({emails, myEmail, handleClick}: InboxProps) {
  
  return (
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
    })
  )
}