import React from 'react'
import { FaEnvelope, FaIdBadge, FaPhone } from 'react-icons/fa'

const ClientInfo = ({client}) => {
  return (
    <div>
        <p>Client Information</p>
        <ul>
            <li>
                <FaIdBadge /> {client.name}
            </li>
            <li>
                <FaEnvelope /> {client.email}
            </li>
            <li>
                <FaPhone /> {client.phone}
            </li>
        </ul>
    </div>
  )
}

export default ClientInfo