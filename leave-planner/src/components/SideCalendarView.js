import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import {getMonth} from '../util'
export default function SideCalendarView() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    },[currentMonthIdx])
    const {monthIdx, setSideCalendarMonth, daySelected, setDaySelected} =useContext(GlobalContext)
    function navPrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1)
    }

    function navNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    function styleDay(day){
        const format = "DD-MM-YY"
        const presentDay = dayjs().format(format)
        const today = day.format(format)
        const selectedDate = daySelected && daySelected.format(format)
        if(presentDay === today) {
            return 'bg-blue-500 rounded-full text-white'
        }
        else if (today === selectedDate) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold";
        }    
        else{
            return "";
        }
    }

    

    useEffect (()=>{
        setCurrentMonthIdx(monthIdx)
    },[monthIdx])

    return (
        <div className="mt-9">
            <header className="flex justify-between">
                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(),currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <div>
                    <button onClick={navPrevMonth}>
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_left
                        </span>
                    </button>
                    <button onClick ={navNextMonth}>
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                            chevron_right
                        </span>
                    </button>
                </div>
               
            </header>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day,idx)=>(
                    <span key={idx} className="text-sm py-1 text-center">
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row,idx)=>(
                    <React.Fragment key={idx}>
                        {row.map((day,i)=>(
                            <button key={i} onClick={()=>{
                                setSideCalendarMonth(currentMonthIdx)
                                setDaySelected(day)
                            }} className={`py-1 w-full ${styleDay(day)}`}>
                                <span className="text-sm">
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
