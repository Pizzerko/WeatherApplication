import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Perform your action here
      navigate(`/weather/?location=${inputValue}`)
    }
  }

  const handleWeatherChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='bg-cyan-200'>
        <div className="flex justify-end">
                <input type="text" value={inputValue} onChange={handleWeatherChange} onKeyDown={handleKeyDown} placeholder="Search Location" className='border-2 border-gray-275 p-2 rounded-xl m-3'></input>
        </div>
    </div>
  )
}

export default Navbar