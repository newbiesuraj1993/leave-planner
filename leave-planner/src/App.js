
import React ,{ useState ,useContext, useEffect}from 'react';
import './App.css';
import { getMonth } from './util'
import CalendarHeader from './components/Calendar.component';
import Month from './components/Month.component';
import Sidebar from './components/Sidebar.component';
import GlobalContext from './context/GlobalContext';
import EventModal from './components/EventModal';


function App() {

  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIdx , showEventModal} = useContext(GlobalContext);

  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIdx));
  },[monthIdx])


  return (
    <React.Fragment>
      {showEventModal &&   <EventModal />}
    
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className ="flex flex-1">
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
