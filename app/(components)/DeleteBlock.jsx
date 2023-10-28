"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import {useRouter} from "next/navigation";


// code approach for deleting ticket
const DeleteBlock = ({id}) => {
  const router = useRouter();
  const deleteTicket = async () => {
    const response = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE"
    });
if (response.ok){
  router.refresh()
}

  }
  return (
    <>
    <FontAwesomeIcon
    icon={faX}
    className="text-red-400 hover:cursor-pointer hover:text-red-200"
    onClick={deleteTicket}
    />
    </>
  )
}

export default DeleteBlock