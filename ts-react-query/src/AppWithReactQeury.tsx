import React, { useEffect, useState } from 'react'
import './App.css'
// Importing the useQuery hook from react-query to fetch the data from the API
import { useQuery } from 'react-query'

// Creating an interface to handle the data from the API
export interface IUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

// Creating a function to fetch the data from the API 
async function fetchUsers(id: number) {
  const request = await fetch(`https://reqres.in/api/users/${id}`)
  const response = await request.json()
  if(!request.ok) {
    throw new Error(response)
  }
  return response.data as IUser
}

function AppWithReactQeury() {
  const [currentUserId, setCurrentUserId] = useState(1)
  /*
    Using the useQuery hook to fetch the data from the API
    The useQuery hook returns an object with the data, isLoading and isError properties to handle the data fetching status and the data itself
  */ 
  const { data, isLoading, isError } = useQuery(['user', currentUserId], () => fetchUsers(currentUserId))

  if(isError) {
    return <p>Erro ao carregar os dados...</p>
  }

  if(!data || isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">

      <img src={data.avatar} alt="avatar" style={{ width: 150, height: 150, borderRadius: 100 }} />

      <p>
        Nome: {data.first_name} {data.last_name} ({data.id})
      </p>

      <p>
        E-mail: {data.email}
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

export default AppWithReactQeury
