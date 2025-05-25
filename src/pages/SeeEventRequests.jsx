// import React, { useEffect, useState } from "react";
// import supabase from "../supabase";
// import "../style/seeeventrequest.css";
// import { useNavigate } from "react-router-dom";

// const SeeEventRequest = () => {
//     const [requests, setRequests] = useState([]);
//     const [role, setRole] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [editId, setEditId] = useState(null);
//     const [editData, setEditData] = useState({});
//     const [viewData, setViewData] = useState(null);
//     const [activeApprovalId, setActiveApprovalId] = useState(null);

//     const [showParticipantForm, setShowParticipantForm] = useState(false);
//     const [participantData, setParticipantData] = useState({
//         name: "",
//         email: "",
//         contact_no: ""
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const activeRole = localStorage.getItem("active_role");
//         const token = localStorage.getItem(`${activeRole}_token`);

//         if ((activeRole === "user" || activeRole === "admin") && token) {
//             setRole(activeRole);
//             fetchUserAndRequests(activeRole);
//         } else {
//             alert("Unauthorized access");
//             navigate("/");
//         }
//     }, []);

//     const fetchUserAndRequests = async (activeRole) => {
//         const { data: { user }, error: userError } = await supabase.auth.getUser();
//         if (userError || !user) {
//             alert("Unable to fetch user data");
//             navigate("/");
//             return;
//         }
//         setUserId(user.id);

//         let query = supabase.from("events").select("*");
//         const { data, error } = await query.order("id", { ascending: true });

//         if (error) {
//             alert("Error fetching event requests: " + error.message);
//         } else {
//             setRequests(data);
//         }
//     };

//     const updateStatus = async (id, newStatus) => {
//         setActiveApprovalId(id);
//         const { error } = await supabase
//             .from("events")
//             .update({ status: newStatus })
//             .eq("id", id);

//         if (error) {
//             alert("Error updating status: " + error.message);
//         } else {
//             setRequests((prev) =>
//                 prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
//             );
//             setActiveApprovalId(null);
//             if (editId === id) setEditData((prev) => ({ ...prev, status: newStatus }));
//             if (viewData?.id === id) setViewData((prev) => ({ ...prev, status: newStatus }));
//         }
//     };

//     const deleteRequest = async (id) => {
//         if (window.confirm("Are you sure you want to delete this request?")) {
//             const { error } = await supabase.from("events").delete().eq("id", id);
//             if (error) {
//                 alert("Error deleting request: " + error.message);
//             } else {
//                 setRequests((prev) => prev.filter((r) => r.id !== id));
//                 if (editId === id) {
//                     setEditId(null);
//                     setEditData({});
//                 }
//                 if (viewData?.id === id) {
//                     setViewData(null);
//                 }
//             }
//         }
//     };

//     const handleEdit = (req) => {
//         setEditId(req.id);
//         setEditData(req);
//     };

//     const submitEdit = async () => {
//         if (!editId) return;
//         const { error } = await supabase
//             .from("events")
//             .update(editData)
//             .eq("id", editId);

//         if (error) {
//             alert("Error updating request: " + error.message);
//         } else {
//             setRequests((prev) =>
//                 prev.map((r) => (r.id === editId ? { ...editData } : r))
//             );
//             setEditId(null);
//             setEditData({});
//             if (viewData?.id === editId) {
//                 setViewData(editData);
//             }
//         }
//     };

//     const handleView = (req) => {
//         setViewData(req);
//         setShowParticipantForm(false);
//     };



//     const handleAddParticipant = () => {
//         setShowParticipantForm(true);
//         setParticipantData({
//             name: "",
//             email: "",
//             contact_no: ""
//         });
//     };

//     const submitParticipant = async () => {
//         if (!viewData?.id) return;
//         const { name, email, contact_no } = participantData;

//         if (!name || !email || !contact_no) {
//             alert("Please fill all fields");
//             return;
//         }

//         const { data: existing, error: checkError } = await supabase
//             .from("participants")
//             .select("*")
//             .eq("id", viewData.id)
//             .eq("email", email);

//         if (checkError) {
//             alert("Error checking existing participants: " + checkError.message);
//             return;
//         }

//         if (existing.length > 0) {
//             alert("This email is already registered for this event.");
//             return;
//         }

//         const { error: insertError } = await supabase.from("participants").insert([{
//             id: viewData.id,
//             name,
//             email,
//             contact_no
//         }]);

//         if (insertError) {
//             alert("Error adding participant: " + insertError.message);
//         } else {
//             alert("Participant added successfully!");
//             setShowParticipantForm(false);
//         }
//     };

//     return (
//         <div className="request-container">
//             <h2>{role === "admin" ? "All Event Requests" : "My Event Requests"}</h2>

//             {viewData && (
//                 <div className="view-card">
//                     <button className="close-card" onClick={() => setViewData(null)}>X</button>
//                     <img src={viewData.image_url} alt={viewData.title} />
//                     <div className="view-content">
//                         <h3>{viewData.title}</h3>
//                         <p><strong>ID:</strong> {viewData.id}</p>
//                         <p><strong>Description:</strong> {viewData.description}</p>
//                         <p><strong>Location:</strong> {viewData.location}</p>
//                         <p><strong>Category:</strong> {viewData.category}</p>
//                         <p><strong>Date & Time:</strong> {viewData.date_time}</p>
//                         <p><strong>Status:</strong> {viewData.status}</p>
//                     </div>

//                     {viewData.status === "Approved" && (
//                         <button className="btn-add-participant" onClick={handleAddParticipant}>
//                             Add Participants to this event
//                         </button>
//                     )}

//                     {showParticipantForm && (
//                         <div className="participant-form">
//                             <h4>Add Participant</h4>
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 value={participantData.name}
//                                 onChange={(e) => setParticipantData({ ...participantData, name: e.target.value })}
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={participantData.email}
//                                 onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Contact No"
//                                 value={participantData.contact_no}
//                                 onChange={(e) => setParticipantData({ ...participantData, contact_no: e.target.value })}
//                             />
//                             <button className="btn-submit-participant" onClick={submitParticipant}>
//                                 Submit
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {requests.length === 0 ? (
//                 <p>No event requests found.</p>
//             ) : (
//                 <table className="request-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>ID</th>
//                             <th>Title</th>
//                             <th>Location</th>
//                             <th>Category</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {requests.map((req) => (
//                             <React.Fragment key={req.id}>
//                                 <tr>
//                                     <td><img src={req.image_url} alt={req.title} className="request-img" /></td>
//                                     <td>{req.id}</td>
//                                     <td>{req.title}</td>
//                                     <td>{req.location}</td>
//                                     <td>{req.category}</td>
//                                     <td className={`status-${req.status.toLowerCase()}`}>{req.status}</td>
//                                     <td>
//                                         <div className="action-buttons">
//                                             <button className="btn-view" onClick={() => handleView(req)}>View</button>
//                                             {(role === "admin" || (role === "user" && req.status === "Pending")) && (
//                                                 <button className="btn-edit" onClick={() => handleEdit(req)}>Edit</button>
//                                             )}
//                                             {role === "admin" && req.status === "Pending" && (
//                                                 <>
//                                                     {(activeApprovalId === null || activeApprovalId === req.id) && (
//                                                         <>
//                                                             <button
//                                                                 className="btn-approve"
//                                                                 onClick={() => updateStatus(req.id, "Approved")}
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn-reject"
//                                                                 onClick={() => updateStatus(req.id, "Rejected")}
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </>
//                                                     )}
//                                                 </>
//                                             )}
//                                             {role === "admin" || (role === "user" && req.status === "Pending") ? (
//                                                 <button className="btn-delete" onClick={() => deleteRequest(req.id)}>Delete</button>
//                                             ) : null}
//                                         </div>
//                                     </td>
//                                 </tr>

//                                 {editId === req.id && (
//                                     <tr className="edit-row">
//                                         <td colSpan={7}>
//                                             <div className="edit-form">
//                                                 <input
//                                                     value={editData.title || ""}
//                                                     onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                                                     placeholder="Title"
//                                                 />
//                                                 <input
//                                                     value={editData.description || ""}
//                                                     onChange={(e) => setEditData({ ...editData, description: e.target.value })}
//                                                     placeholder="Description"
//                                                 />
//                                                 <input
//                                                     value={editData.location || ""}
//                                                     onChange={(e) => setEditData({ ...editData, location: e.target.value })}
//                                                     placeholder="Location"
//                                                 />
//                                                 <input
//                                                     value={editData.category || ""}
//                                                     onChange={(e) => setEditData({ ...editData, category: e.target.value })}
//                                                     placeholder="Category"
//                                                 />
//                                                 <input
//                                                     value={editData.date_time || ""}
//                                                     onChange={(e) => setEditData({ ...editData, date_time: e.target.value })}
//                                                     placeholder="Date & Time"
//                                                 />
//                                                 <input
//                                                     value={editData.image_url || ""}
//                                                     onChange={(e) => setEditData({ ...editData, image_url: e.target.value })}
//                                                     placeholder="Image URL"
//                                                 />
//                                                 <div className="edit-buttons">
//                                                     <button className="btn-update" onClick={submitEdit}>Update</button>
//                                                     <button className="btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default SeeEventRequest;













// import React, { useEffect, useState } from "react";
// import supabase from "../supabase";
// import "../style/SeeRequest.css";
// import EditEventForm from "./editEvent";

// const SeeRequests = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingEvent, setEditingEvent] = useState(null);

//   const fetchEvents = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching events:", error.message);
//     } else {
//       setEvents(data);
//     }
//     setLoading(false);
//   };

//   const handleEditClick = (event) => {
//     setEditingEvent(event);
//   };

//   const handleEditComplete = () => {
//     setEditingEvent(null);
//     fetchEvents();
//   };

//  const handleDeleteEvent = async (eventId) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this event?");
//   if (!confirmDelete) return;

//   const { error } = await supabase.from("events").delete().eq("id", eventId);

//   if (error) {
//     console.error("Error deleting event:", error.message);
//     alert("Failed to delete the event.");
//   } else {
//     alert("Event deleted successfully.");
//     fetchEvents(); // Refresh list
//   }
// };


//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   return (
//     <div className="container">
//       <h2>Event Requests</h2>

//       {loading ? (
//         <p>Loading events...</p>
//       ) : events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <table className="event-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Date</th>
//               <th>Location</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {events.map((event) => (
//               <tr key={event.id}>
//                 <td>
//                   {event.event_img ? (
//                     <img src={event.event_img} alt={event.title} className="event-img" />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </td>
//                 <td>{event.title}</td>
//                 <td>{event.date}</td>
//                 <td>{event.location}</td>
//                 <td>{event.category}</td>
//                 <td>
//                   <span className={status-badge ${event.status.toLowerCase()}}>
//                     {event.status}
//                   </span>
//                 </td>
//                 <td>
//   <div className="action-buttons">
//     {event.status === "Pending" ? (
//       <>
//         <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
//         <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//       </>
//     ) : (
//       <button className="btn-view" onClick={() => alert("View page or modal")}>View</button>
//     )}
//   </div>
// </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {editingEvent && (
//         <EditEventForm event={editingEvent} onClose={handleEditComplete} />
//       )}
//     </div>
//   );
// };

// export default SeeRequests;








































// import React, { useEffect, useState } from "react";
// import supabase from "../supabase";
// import "../style/SeeRequest.css";
// import EditEventForm from "./editEvent";

// const SeeRequests = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingEvent, setEditingEvent] = useState(null);
//     const [viewingEvent, setViewingEvent] = useState(null);
//     const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
//     const [participantsList, setParticipantsList] = useState([]);
//     const [participantsModal, setParticipantsModal] = useState(false);
//     const role = localStorage.getItem("active_role");

//     const fetchEvents = async () => {
//         setLoading(true);
//         const { data, error } = await supabase
//             .from("events")
//             .select("*")
//             .order("created_at", { ascending: false });
//         if (!error) setEvents(data);
//         else console.error("Fetch error:", error.message);
//         setLoading(false);
//     };

//     const fetchParticipants = async (eventId) => {
//         const { data, error } = await supabase
//             .from("participants")
//             .select("*")
//             .eq("event_id", eventId);

//         if (!error) {
//             setParticipantsList(data);
//             setParticipantsModal(true);
//         } else {
//             alert("Error fetching participants: " + error.message);
//         }
//     };

//     const handleAddParticipant = async () => {
//         const { name, email, age } = participant;
//         if (!name || !email || !age) return alert("All fields required.");

//         const { error } = await supabase.from("participants").insert([
//             {
//                 name,
//                 email,
//                 age,
//                 event_id: viewingEvent.id,
//             },
//         ]);
//         if (!error) {
//             alert("Participant added.");
//             setParticipant({ name: "", email: "", age: "" });
//         } else {
//             alert("Error: " + error.message);
//         }
//     };

//     const handleEditClick = (event) => setEditingEvent(event);
//     const handleEditComplete = () => {
//         setEditingEvent(null);
//         fetchEvents();
//     };

//     const handleDeleteEvent = async (eventId) => {
//         if (!window.confirm("Delete this event?")) return;
//         const { error } = await supabase.from("events").delete().eq("id", eventId);
//         if (!error) {
//             alert("Deleted successfully.");
//             fetchEvents();
//         } else {
//             alert("Error: " + error.message);
//         }
//     };

//     const updateStatus = async (id, newStatus) => {
//         const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
//         if (!error) {
//             setEvents((prev) =>
//                 prev.map((event) =>
//                     event.id === id ? { ...event, status: newStatus } : event
//                 )
//             );
//         } else {
//             alert("Error: " + error.message);
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="container">
//             <h2>Event Requests</h2>

//             {loading ? (
//                 <p>Loading events...</p>
//             ) : events.length === 0 ? (
//                 <p>No events found.</p>
//             ) : (
//                 <table className="event-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Date</th>
//                             <th>Location</th>
//                             <th>Category</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {events.map((event) => (
//               <tr key={event.id}>
//                 <td>
//                   {event.event_img ? (
//                     <img src={event.event_img} alt={event.title} className="event-img" />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </td>
//                 <td>{event.title}</td>
//                 <td>{event.date}</td>
//                 <td>{event.location}</td>
//                 <td>{event.category}</td>
//                 <td>
//                   <span className={status-badge ${event.status.toLowerCase()}}>
//                     {event.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="action-buttons">
//                     {role === "admin" ? (
//                       <>
//                         {event.status === "Pending" && (
//                           <>
//                             <button className="btn-approve" onClick={() => updateStatus(event.id, "Approved")}>Approve</button>
//                             <button className="btn-reject" onClick={() => updateStatus(event.id, "Rejected")}>Reject</button>
//                           </>
//                         )}
//                         <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
//                         <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                         <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
//                       </>
//                     ) : (
//                       <>
//                         {event.status === "Pending" ? (
//                           <>
//                             <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
//                             <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                           </>
//                         ) : (
//                           <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//                 </tbody>
//         </table>
//     )
// }

// {
//     editingEvent && (
//         <EditEventForm event={editingEvent} onClose={handleEditComplete} />
//     )
// }

// {/* View Event Modal */ }
// {
//     viewingEvent && (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>{viewingEvent.title}</h2>
//                 <img src={viewingEvent.event_img} alt={viewingEvent.title} className="modal-img" />
//                 <p><strong>Date:</strong> {viewingEvent.date}</p>
//                 <p><strong>Location:</strong> {viewingEvent.location}</p>
//                 <p><strong>Category:</strong> {viewingEvent.category}</p>
//                 <p><strong>Status:</strong> {viewingEvent.status}</p>
//                 <p><strong>Description:</strong> {viewingEvent.description}</p>

//                 {viewingEvent.status === "Approved" && (
//                     <>
//                         <div className="participant-form">
//                             <h3>Add Participant</h3>
//                             <input type="text" placeholder="Name" value={participant.name} onChange={(e) => setParticipant({ ...participant, name: e.target.value })} />
//                             <input type="email" placeholder="Email" value={participant.email} onChange={(e) => setParticipant({ ...participant, email: e.target.value })} />
//                             <input type="number" placeholder="Age" value={participant.age} onChange={(e) => setParticipant({ ...participant, age: e.target.value })} />
//                             <button className="btn-add-participant" onClick={handleAddParticipant}>Add Participant</button>
//                         </div>

//                         <button className="btn-view-participants" onClick={() => fetchParticipants(viewingEvent.id)}>
//                             View Participants
//                         </button>
//                     </>
//                 )}

//                 <button className="btn-close-modal" onClick={() => {
//                     setViewingEvent(null);
//                     setParticipantsList([]);
//                     setParticipantsModal(false);
//                 }}>Close</button>
//             </div>
//         </div>
//     )
// }

// {/* Participants Modal */ }
// {
//     participantsModal && (
//         <div className="modal-overlay">
//             <div className="modal-content participants-modal">
//                 <h3>Participants</h3>
//                 {participantsList.length === 0 ? (
//                     <p>No participants added yet.</p>
//                 ) : (
//                     <table className="participants-table">
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Age</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {participantsList.map((p) => (
//                                 <tr key={p.id}>
//                                     <td>{p.name}</td>
//                                     <td>{p.email}</td>
//                                     <td>{p.age}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 <button className="btn-close-modal" onClick={() => setParticipantsModal(false)}>
//                     Close
//                 </button>
//             </div>
//         </div>
//     )
// }
//     </div >
//   );
// };

// export default SeeRequests;


























import React, { useEffect, useState } from "react";
import supabase from "../supabase"; // apna supabase client
import "../style/SeeEventRequest.css";

const EventRequests = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [viewingEvent, setViewingEvent] = useState(null);
    const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
    const [participantsList, setParticipantsList] = useState([]);
    const [participantsModal, setParticipantsModal] = useState(false);
    const role = localStorage.getItem("active_role");

    // Fetch all events
    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
        if (!error) setEvents(data)
        else alert("Error fetching events: " + error.message);
        setLoading(false);

    };

    // Fetch participants for selected event
    const fetchParticipants = async (eventId) => {
        const { data, error } = await supabase.from("participants").select("*");
        if (!error) {
            setParticipantsList(data);
            setParticipantsModal(true);
        } else alert("Error fetching participants: " + error.message);
    };

    // Add participant to currently viewed event
    const handleAddParticipant = async () => {
        if (!participant.name || !participant.email || !participant.age) return alert("All participant fields are required");

        // Check for duplicate email in this event
        const { data: existing, error: fetchError } = await supabase
            .from("participants")
            .select("*")
            .eq("event_id", viewingEvent.id)
            .eq("email", participant.email);

        if (fetchError) return alert("Error checking existing participants: " + fetchError.message);
        if (existing.length > 0) return alert("This email is already registered for the event");

        const { error } = await supabase.from("participants").insert([
            {
                name: participant.name,
                email: participant.email,
                age: participant.age,
                event_id: viewingEvent.id,
            },
        ]);

        if (!error) {
            alert("Participant added successfully");
            setParticipant({ name: "", email: "", age: "" });
            fetchParticipants(viewingEvent.id); // Refresh participants list
        } else alert("Error adding participant: " + error.message);
    };

    const handleDeleteParticipant = async (participantId) => {
        if (!window.confirm("Are you sure you want to delete this participant?")) return;
        const { error } = await supabase.from("participants").delete().eq("id", participantId);
        if (!error) {
            alert("Participant deleted");
            fetchParticipants(viewingEvent.id); // Refresh list
        } else {
            alert("Error deleting participant: " + error.message);
        }
    };

    // Update event status (approve/reject)
    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
        if (!error) {
            setEvents((prev) =>
                prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
            );
        } else alert("Error updating status: " + error.message);
    };

    // Delete event
    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        const { error } = await supabase.from("events").delete().eq("id", eventId);
        if (!error) {
            alert("Event deleted");
            fetchEvents();
        } else alert("Error deleting event: " + error.message);
    };

    const handleEditClick = (event) => setEditingEvent(event);
    const handleEditComplete = () => {
        setEditingEvent(null);
        fetchEvents();
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="container">
            <h2>Event Requests</h2>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    {event.image_url ? (
                                        <img src={event.image_url} alt={event.title} className="event-img" />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td>{event.category}</td>
                                <td>
                                    <span className={`status-badge ${event.status.toLowerCase()}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        {role === "admin" ? (
                                            <>
                                                {event.status === "Pending" && (
                                                    <>
                                                        <button className="btn-approve" onClick={() => updateStatus(event.id, "Approved")}>
                                                            Approve
                                                        </button>
                                                        <button className="btn-reject" onClick={() => updateStatus(event.id, "Rejected")}>
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
                                                <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                                <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
                                            </>
                                        ) : (
                                            <>
                                                {event.status === "Pending" ? (
                                                    <>
                                                        <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
                                                        <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                                    </>
                                                ) : (
                                                    <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit event form popup */}
            {editingEvent && <EditEventForm event={editingEvent} onClose={handleEditComplete} />}

            {/* View event modal popup */}
            {viewingEvent && (
                <div className="modal-overlay" onClick={() => setViewingEvent(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{viewingEvent.title}</h2>
                        {viewingEvent.image_url && (
                            <img src={viewingEvent.image_url} alt={viewingEvent.title} className="modal-img" />
                        )}
                        <p><strong>Date:</strong> {viewingEvent.date}</p>
                        <p><strong>Location:</strong> {viewingEvent.location}</p>
                        <p><strong>Category:</strong> {viewingEvent.category}</p>
                        <p><strong>Status:</strong> {viewingEvent.status}</p>
                        <p><strong>Description:</strong> {viewingEvent.description}</p>

                        {viewingEvent.status === "Approved" && (
                            <>
                                <div className="participant-form">
                                    <h3>Add Participant</h3>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={participant.name}
                                        onChange={(e) => setParticipant({ ...participant, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={participant.email}
                                        onChange={(e) => setParticipant({ ...participant, email: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={participant.age}
                                        onChange={(e) => setParticipant({ ...participant, age: e.target.value })}
                                    />
                                    <button className="btn-add-participant" onClick={handleAddParticipant}>Add Participant</button>
                                </div>

                                <button className="btn-view-participants" onClick={() => fetchParticipants(viewingEvent.id)}>
                                    View Participants
                                </button>
                            </>
                        )}

                        <button className="btn-close-modal" onClick={() => {
                            setViewingEvent(null);
                            setParticipantsModal(false);
                            setParticipantsList([]);
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Participants modal popup */}
            {participantsModal && (
                <div className="modal-overlay" onClick={() => setParticipantsModal(false)}>
                    <div className="modal-content participants-modal" onClick={e => e.stopPropagation()}>
                        <h3>Participants</h3>
                        {participantsList.length === 0 ? (
                            <p>No participants added yet.</p>
                        ) : (
                            <table className="participants-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Age</th>
                                        <th>Actions</th> {/* new */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {participantsList.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.name}</td>
                                            <td>{p.email}</td>
                                            <td>{p.age}</td>
                                            <td>
                                                <button className="btn-delete" onClick={() => handleDeleteParticipant(p.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        )}
                        <button className="btn-close-modal" onClick={() => setParticipantsModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventRequests;
