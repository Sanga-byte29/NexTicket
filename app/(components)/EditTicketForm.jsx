"use client";
import { useRouter } from 'next/navigation';
import React,{useState} from 'react';


const EditTicketForm = ({ticket}) => {

    const EDIT_MODE = ticket._id === "new" ? false : true
    const startingTicketData = {
        title: " ",
        description: " ",
        priority: 1,
        status: "not started",
        category: "Bug Problem"

    };
// IF WE ARE IN EDITING MODE THEN IT WILL UPDATE THE VALUES PROVIDED IN THE MODEL
    if (EDIT_MODE) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["progress"] = ticket.progress;
        startingTicketData["status"] = ticket.status;
        startingTicketData["category"] = ticket.category;
      }
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const router = useRouter();

    // code approach to fetch data
    const handleSubmit = async (e) => {
        console.log("Submitted");
        e.preventDefault();

        if(EDIT_MODE){
            const response = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({formData}),
                "content-type": "application/json"
            });
            if(!response.ok){
                console.log("Failed");
                throw new Error("Failed to Update Ticket.")
            }
        }
        else{

            const response = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({formData}),
                "content-type": "application/json"
            });
            if(!response.ok){
                throw new Error("Failed to create Ticket.")
            }
        }

        
        router.refresh()
        router.push('/')
    };

const [formData, setFormData] = useState(startingTicketData);
  return (
     <div className="flex justify-center">
        <form className="flex flex-col gap-3 w-1/2" 
        method="post" 
        onSubmit={handleSubmit}>
            <h3>{EDIT_MODE ? "Update your Ticket!" : "Create Your Ticket!"}</h3>
            <label>Title</label>
            <input 
            id="title" 
            name="title" 
            type="text" 
            onChange={handleChange} 
            required={true} 
            value={formData.title}
            />
            <label>Description</label>
            <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="5"
            />
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Bug Problem" >Bug Problem</option>
                <option value="Software Problem" >Software Problem</option>
                <option value="Testing Problem" >Testing Problem</option>

            </select>
            <div>
                <input 
                id="priority-1" 
                name="priority" 
                type="radio" 
                onChange={handleChange}  
                value={1}
                checked={formData.priority == 1}
                />
                <label>1</label>
                {/*  */}
                <input 
                id="priority-2" 
                name="priority" 
                type="radio" 
                onChange={handleChange}  
                value={2}
                checked={formData.priority == 2}
                />
                <label>2</label>
                {/*  */}
                <input 
                id="priority-3" 
                name="priority" 
                type="radio" 
                onChange={handleChange}  
                value={3}
                checked={formData.priority == 3}
                />
                <label>3</label>
                {/*  */}
                <input 
                id="priority-4" 
                name="priority" 
                type="radio" 
                onChange={handleChange}  
                value={4}
                checked={formData.priority == 4}
                />
                <label>4</label>
                <input 
                id="priority-5" 
                name="priority" 
                type="radio" 
                onChange={handleChange}  
                value={5}
                checked={formData.priority == 5}
                />
                <label>5</label>
            </div>
            <label>Progress</label>
            <input type="range" 
            id="progress"
            name="progress"
            defaultValue={formData.progress} 
            min="0"
            max="100"
            onChange={handleChange}
            />
            <label>Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
                <option value="not started">Not Started</option>
                <option value="started">Started</option>
                <option value="done">Done</option>


            </select>
            <input type="submit" className="btn" value={EDIT_MODE ? "Update Ticket" : "Create Ticket"} />
        </form>
     </div>
  )
}

export default EditTicketForm;