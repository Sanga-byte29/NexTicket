import EditTicketForm from '@/app/(components)/EditTicketForm'
import React from 'react'


const getTicketById = async (id) => {
  console.log(getTicketById);
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`,{
      cache: "no-store"
    })
    if (!res.ok){
      throw new Error("Failed to get ticket!")
    }
    return res.json();

}



const TicketPage =  async ({params}) => {
  const EDIT_MODE = params.id === "new" ? false : true;
  let updateTicketData = {}

// code approach if the ticekt is edited and updated
  if (EDIT_MODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;

    console.log(updateTicketData);
  }
  else {
    updateTicketData = {
      _id: "new",
    };
  };
  console.log(EDIT_MODE, updateTicketData);
  return (
     <>
     <EditTicketForm ticket={updateTicketData}/>
     </>
  )
}

export default TicketPage