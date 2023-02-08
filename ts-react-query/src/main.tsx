import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppWithReactQeury from './AppWithReactQeury'

// Create a client and provide it to the app
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Fragment>
    {/* Provide the client to your App tree */}
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      {/* Using the app with react-query */}
      <AppWithReactQeury/>
    </QueryClientProvider>
  </Fragment>,
)
