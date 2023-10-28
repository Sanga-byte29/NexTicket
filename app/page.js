import React from 'react';
import TicketPage from './TicketPage/[id]/page';
import TicketCard from './(components)/TicketCard';

const getTickets = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/Tickets",{
      cache: "no-store",
    });
    return response.json();
  }
  catch(error){
    console.log("Failed to get tickets", error);
  }
}


//time to fetch tickets card
const Dashboard = async () => {
  const {tickets} = await getTickets();
//getting unique categories mapping over tickets and everytime we get we will pass to category and remove duplicates
  const uniqueCategories = [
    ...new Set(tickets?.map(({category}) => category))
  ]



  return (
    <div className="p-5">
      <div>
        {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h2 className=''>{uniqueCategory}</h2>
          <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets.filter((ticket) => ticket.category === uniqueCategory)
              .map((filteredTicket, _index) => (
                <TicketCard key={_index} id={_index} ticket={filteredTicket} />
              ))}
          </div>

      </div>
      ))}

       <div className="lg:grid grid-cols-2 xl:grid-cols-4">

        </div>
       </div>

    </div>
  )
}

export default Dashboard