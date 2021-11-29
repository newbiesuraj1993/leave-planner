import React,{useEffect, useReducer, useState} from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';



function deleteAction(state, payload){
    return state.filter(event => event.id !== payload.id)
}


function savedEventsReducer(state, {type, payload}){
    switch (type) {
        case "push":
            console.log(payload.todate)
            console.log(Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)))
            
           
            if(Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)) >= 2){
                let j = Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)) - 1
                console.log(j) 
                for(var k=1;k<=j;k++){
                    var checkdate = new Date(payload.fromday)
                    checkdate.setDate(checkdate.getDate()+k)
                    var incrementer = {
                        empid: payload.empid,description:payload.description,label:payload.label,id:payload.id,fromday:checkdate, todate:checkdate
                    }
                    if(checkdate.getDay() !==0 && checkdate.getDay() !==6){
                        state = [...state,incrementer]
                    }
                    console.log(incrementer)
                    
                }
            }
            return [...state, payload];
        case "update":
            state=deleteAction(state,payload)
            console.log(payload)
            console.log(payload.todate)
            console.log(Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)))
            if(Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)) >= 2){
                let newj = Math.abs((payload.fromday-payload.todate)/(1000*60*60*24)) - 1
                console.log(newj) 
                for(var newk=1;newk<=newj;newk++){
                    var newcheckdate = new Date(payload.fromday)
                    newcheckdate.setDate(newcheckdate.getDate()+newk)
                    var newincrementer = {
                        empid: payload.empid,description:payload.description,label:payload.label,id:payload.id,fromday:newcheckdate, todate:newcheckdate
                    }
                    if(newcheckdate.getDay() !==0 && newcheckdate.getDay() !==6){
                        state = [...state,newincrementer]
                    }
                    console.log(newincrementer)
                    
                }
            }
            return  [...state, payload];
        case "delete":
            return state.filter(event => event.id !== payload.id)
        default:
            throw new Error();
    }
}

function initEvents(){
    const storageEvents = localStorage.getItem('savedEvents')
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents;
}

export default function ContextWrapper(props) {
    const [monthIdx, setMonthIdx] = useState(dayjs().month())
    const [sideCalendarMonth,setSideCalendarMonth]=useState(null)
    const [daySelected,setDaySelected] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(false)
    const [savedEvents, dispatchEvents] = useReducer(savedEventsReducer,[], initEvents)
    const [selectedEvent, setSelectedEvent] = useState(null)

    useEffect(()=>{
        localStorage.setItem("savedEvents",JSON.stringify(savedEvents))
    },[savedEvents])



    useEffect(()=>{
        if(sideCalendarMonth !== null){
            setMonthIdx(sideCalendarMonth);
        }   
    },[sideCalendarMonth])
    return (
       <GlobalContext.Provider value={{
            monthIdx, 
            setMonthIdx,
            sideCalendarMonth,
            setSideCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchEvents,
            savedEvents,
            selectedEvent,
            setSelectedEvent
            }}>
           {props.children}
       </GlobalContext.Provider>
    )
}
