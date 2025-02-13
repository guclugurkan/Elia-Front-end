import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';


const Calendar = () => {
    const [events, setEvents] = useState([
        {title: 'A', start: '2025-02-10',},
        { title: 'B', start: '2025-02-14'}
    ])
    const handleDateClick = () => {
        console.log('Requete à mettre');  
    }
    return (
        <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        />
    )
}
export default Calendar;