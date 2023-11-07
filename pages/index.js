import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Resource from '@/components/resourse'
import Navigation from '../components/navigation'
import Admin from'../components/admin'
import Forum from '../components/forum'
import Assignment from '../components/assignment'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [val,setVal]=useState('Resource')
  const clickHandler = (componentName) => {
    setVal(componentName);
  };
  return (
    <>
    <div className={styles.parent}>
       <Navigation onNavigationClick={clickHandler} activeComponent={val}/>
       
        {val === 'Home' && <Admin />}
        {val === 'Resource' && <Resource />}
        {val === 'Admin' && <Assignment />}
        {val === 'Forum' && <Forum />}
      
   </div> 
    </>
  )
}
