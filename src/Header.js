import React from 'react'
import {FaLaptop,FaTabletAlt,FaMobile} from 'react-icons/fa'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Header = ({title}) => {
  const {width} = useContext(DataContext)
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width < 768 ? <FaMobile/>
      :width < 992 ? <FaTabletAlt/>
      :<FaLaptop/>}
    </header>
  )
}

export default Header
