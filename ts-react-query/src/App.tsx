import React, { useEffect } from 'react'
import './App.css'

export interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

async function fetchUsers(id: number) {
  const request = await fetch(`https://reqres.in/api/users/${id}`)
  const response = await request.json()
  if(!request.ok) {
    throw new Error(response)
  }
  return response.data as IUser
}

function App() {

  const [currentUserId, setCurrentUserId] = React.useState(1)
  const [user, setUser] = React.useState<IUser>({} as IUser)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  useEffect(() => {
    setLoading(true)
    fetchUsers(currentUserId)
      .then((response) => {
        setUser(response)
        setLoading(false)
      }).catch((error) => {
        setError(true)
        setLoading(false)
      }
    )
  }, [currentUserId])

  if(error) {
    return <p>Erro ao carregar os dados...</p>
  }

  if(!user || loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">

      <img src={user.avatar} alt="avatar" style={{ width: 150, height: 150, borderRadius: 100 }} />

      <p>
        Nome: {user.first_name} {user.last_name} ({user.id})
      </p>

      <p>
        E-mail: {user.email}
      </p>

      <button type="button" style={{ marginTop: 20, marginRight: 10 }} onClick={() => {setCurrentUserId(prev => prev - 1)}}>
        Prev
      </button>

      <button type="button" onClick={() => {setCurrentUserId(prev => prev + 1)}}>
        Next
      </button>
    </div>
  )
}

export default App
