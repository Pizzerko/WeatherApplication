import React from 'react'
import Weather from './Weather'

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col text-xl jsutify-center items-center h-fit w-3/4 border-4 border-black m-4 p-20 bg-[url(/public/clouds.jpeg)]">
        <div className="text-6xl">Real Time Weather Reports!</div>
        <div className="text-6xl">☀️</div>
      </div>
      <div className="flex w-full justify-around my-10">
      <Weather name="New York" />
      <Weather name="Beijing" />
      <Weather name="Japan" />
      <Weather name="Germany" />
      </div>
    </div>
  )
}

export default Dashboard