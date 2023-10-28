"use client"
import React, { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const {tickets} = await getTickets();
      if (tickets) {
        setTickets(tickets);
        const categories = [
          ...new Set(tickets?.map((ticket) => ticket.category)),
        ];
        setUniqueCategories(categories);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-5">
      <div>
        {tickets && uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard id={_index} key={_index} ticket={filteredTicket} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;