import React from 'react'
// import { AnimatedTestimonialsDemo } from './textonomials.jsx'
import { TextGenerateEffect } from './ui/text-generated-effect'

function Home() {
  const words = `Welcome to Stock Manegement Systme
`
  return (
    <>
      <TextGenerateEffect words={words} />;
    </>
  )
}

export default Home
