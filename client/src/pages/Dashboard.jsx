import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <h1>Dashboard will go here</h1>
        <p>Click button to continue to accounts for now</p>
        <button className="border-2 border-black rounded px-6 py-2" onClick={() => navigate('/accounts')}>See Accounts</button>
    </div>
  )
}

export default Dashboard