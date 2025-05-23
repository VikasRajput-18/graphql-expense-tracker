import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import GridBackground from './components/ui/GridBackground.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_NODE_ENV === "development" ? 'http://localhost:8080/graphql' : "/graphql",
  cache: new InMemoryCache(),
  credentials: "include"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <GridBackground>
          <App />
        </GridBackground>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
