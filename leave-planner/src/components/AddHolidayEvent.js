import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import plusImg from '../resources/plus.svg'

export default function AddHolidayEvent() {
    const {setShowEventModal} = useContext(GlobalContext)
    return (
        <div>
            <button onClick ={()=>setShowEventModal(true)} className ="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
                <img src={plusImg} alt="plus" className="w-7 h-7"/>
                <span className="pl-3 pr-7">Add Leave Plan</span>    
            </button>
        </div>
        
    )
}
