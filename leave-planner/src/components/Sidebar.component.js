import React from "react";
import AddHoliday from './AddHolidayEvent'
import SideCalendarView from "./SideCalendarView";


export default function Sidebar () {
    return (<aside className="border p-5 w-64">
        <AddHoliday />
        <SideCalendarView />

    </aside>)
}