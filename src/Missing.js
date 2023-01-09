import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page not found</h2>
      <p>Well, that is disappointing.</p>
      <p>
        <Link to='/'>Visit our Homepage</Link>
      </p>
    </main>
  )
}

export default Missing
