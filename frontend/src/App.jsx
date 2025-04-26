import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import TransactionPage from "./pages/TransactionPage"
import NotFoundPage from "./pages/NotFoundPage"
import Header from './components/ui/Header'
import { useQuery } from '@apollo/client'
import { GET_AUTH_USER } from './graphql/query/user.query'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { data, loading } = useQuery(GET_AUTH_USER);
  const authUser = data?.authUser


  if (loading) return null

  return (
    <>
      {
        authUser && <Header />
      }
      <Routes>
        <Route path="/" element={authUser ? <HomePage user={authUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/transaction/:id" element={authUser ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App 