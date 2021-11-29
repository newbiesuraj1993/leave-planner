import dayjs from 'dayjs'
import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext';

export default function Day({day,rowIdx}) {
    const {setDaySelected, setShowEventModal, savedEvents, setSelectedEvent} = useContext(GlobalContext)
    const [dayEvents, setDayEvents] = useState([])

    useEffect(()=>{
        const events = savedEvents.filter(
            (evt) => 
        (dayjs(evt.fromday).format("DD-MM-YY")===day.format("DD-MM-YY")) || (dayjs(evt.todate).format("DD-MM-YY")===day.format("DD-MM-YY")));
        setDayEvents(events)
    },[savedEvents,day])

    
    function colorPicker(leaveType){
        if(leaveType==="Casual"){
            return 'bg-green-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate';
        } else if(leaveType ==="Sick"){
            return 'bg-red-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate';
        } else if(leaveType === "Annual"){
            return 'bg-indigo-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate';
        } else {
            return 'bg-blue-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate';
        }
    }

    function isCurrentDay(){
        return day.format("DD-MM-YY")===dayjs().format("DD-MM-YY") ? "bg-blue-600 text-white rounded-full w-7":"";
    }
    
    return (
        <div className="border border-gray-100 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (<p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>)}
                <p className = {`text-sm p-1 my-1 text-center ${isCurrentDay()}`}> {day.format('DD')} </p>
            </header>
            <div className="flex-1 cursor-pointer" onClick={() => {
                setDaySelected(day)
                setShowEventModal(true)
            }}>
            {dayEvents.map((evt,idx)=>(
                <div 
                    key = {idx} 
                    className={`${colorPicker(evt.label)}`}
                    onClick={()=>setSelectedEvent(evt)}
                >
                    {evt.label} || {evt.empid}
                </div>
            ))}
            </div>
        </div>
    )
}
