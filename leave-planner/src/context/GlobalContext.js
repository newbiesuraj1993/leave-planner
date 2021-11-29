import React from "react";

const GlobalContext = React.createContext({
    monthIdx: 0,
    setMonthIdx: (index) => {},
    sideCalendarMonth: null,
    setSideCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day)=>{},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchEvent: ({type,payload})=>{},
    savedEvents:[],
    selectedEvent: null,
    setSelectedEvent: ()=>{}

})

export default GlobalContext