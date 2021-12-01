import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'
import Dropdown from './Dropdown'

export default function EventModal() {
    const {setShowEventModal, daySelected,dispatchEvents,selectedEvent,setSelectedEvent} = useContext(GlobalContext)
    const [empid, setEmpid] = useState(selectedEvent ? selectedEvent.empid : "")
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "")
    const [teamName, setTeamName] = useState(selectedEvent ? selectedEvent.teamName :"")
    const [rangeDate, setRangeDate] = useState(selectedEvent ? (selectedEvent.todate ? new Date(selectedEvent.todate) : new Date(daySelected)): new Date(daySelected))
    
    const [selected, setSelected] = useState(selectedEvent ? selectedEvent.label : "Leave Type");
    const options = ["Sick", "Casual", "Annual","Maternity/Paternity","Personal"];
    const empOptions = ["SI", "Permanent"]
  
    const [emptype, setEmptype] = useState(selectedEvent ? selectedEvent.emptype : "Employee Type");


    function handleClosure(){
        setShowEventModal(false);
        setSelectedEvent(false);
    }

    function handleSubmit(e){    
        e.preventDefault()
        const leaveEvent = {
            empid, 
            description,
            teamName, 
            label:selected, 
            emptype:emptype,
           
            fromday: daySelected.valueOf(), 
            todate: rangeDate.valueOf(),
            id: selectedEvent ?  selectedEvent.id : Date.now()
        }
        if(selectedEvent){
            dispatchEvents({type: 'update',payload: leaveEvent})
            setSelectedEvent(null)
        } else {
            dispatchEvents({type: 'push',payload: leaveEvent})
        }
        
        setShowEventModal(false)
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                    <span className="material-icons-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>  {selectedEvent && (
                        <span
                            onClick = {()=>{dispatchEvents({type:"delete",payload:selectedEvent});setShowEventModal(false);setSelectedEvent(null)}} 
                            className="material-icons-outlined text-gray-400 cursor-pointer">
                            delete
                        </span>
                    )} 
                        <button onClick={handleClosure}>
                            <span className="material-icons-outlined text-gray-400">
                                close
                            </span>
                        </button>
                    </div>
                    
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div>

                        </div>
                        <input 
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                            type="text" 
                            required 
                            name="empid" 
                            placeholder="BRID" 
                            value={empid} 
                            onChange={(e)=>setEmpid(e.target.value)}
                        />
                        <span className="material-icons-outlined text-gray-400">
                            event
                        </span>
                        <p>&nbsp;&nbsp;&nbsp;{daySelected.format("MMMM DD, YYYY")}</p>
                        <span className="material-icons-outlined text-gray-400">
                            event
                        </span>
                        <div>
                        <DatePicker
                            selected={rangeDate} 
                            onChange={date => {setRangeDate(date)}} 
                            dateFormat='MMMM dd, yyyy'
                            minDate={new Date()}
                            filterDate={date=>date.getDay() !== 0 && date.getDay() !== 6 }
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                        />
                        </div>
                          <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        <input 
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                            type="text" 
                            required 
                            name="description" 
                            placeholder="Leave Description" 
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        
                         <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <Dropdown selected={selected} setSelected={setSelected} options={options} />
                        <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <Dropdown selected={emptype} setSelected={setEmptype} options={empOptions} />
                        <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        
                        <input 
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                            type="text" 
                            required 
                            name="teamName" 
                            placeholder="Squad Name" 
                            value={teamName} 
                            onChange={(e)=>setTeamName(e.target.value)}
                        />
                        
                       
                    </div>
                </div>
                <footer className="flex justify-end w-100 border-t p-3 mt-5">
                        <button 
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                            onClick={handleSubmit}>
                            Save
                        </button> 
                </footer>
            </form>
        </div>
    )
}

