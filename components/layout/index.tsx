import React from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>Konverse</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Convergence&family=Josefin+Sans&family=Mukta&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>{children}</main>
    </React.Fragment>
  )
}

export default Layout
