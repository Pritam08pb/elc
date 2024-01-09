import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Resource from '@/components/resourse'
import Navigation from '../components/navigation'
import Admin from '../components/admin'
import Forum from '../components/forum'
import Assignment from '../components/assignment'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const inter = Inter({ subsets: ['latin'] })

export default function Main() {
  const router = useRouter()
  const [val, setVal] = useState('Resource')
  const [decodedToken, setDecodedToken] = useState(null);

  const clickHandler = (componentName) => {
    setVal(componentName)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      const decodedToken = jwt.decode(storedToken)
      const expirationTime = decodedToken.exp * 1000 // Convert seconds to milliseconds

      if (Date.now() > expirationTime) {
        // Token has expired, remove it from storage
        localStorage.removeItem('token')
        router.push('/')
      } else {
        // Token is still valid, proceed with using it
        // Access user information from the decoded token
        setDecodedToken(decodedToken);
        // Use the decoded user information as needed
      }
    } else {
      // No token found, redirect to the login page
      router.push('/')
    }
  }, [router])

  return (
    <>
      <div className={styles.parent}>
        <Navigation onNavigationClick={clickHandler} activeComponent={val} decodedToken={decodedToken} />
        {val === 'Admin' && <Admin />}
        {val === 'Home' && <Admin />}
        {val === 'Resource' && <Resource />}
        {val === 'Assn' && <Assignment />}
        {val === 'Forum' && <Forum />}
      </div>
    </>
  )   
}
