import React from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CalendarHeader from 'components/CalendarHeader';
import CalendarTable from 'components/CalendarTable';
import CalendarAside from 'components/CalendarAside/CalendarAside';
import EventModal from 'components/EventModal';
import { getToday, processEventDataByWeek } from 'utils';
import { useState } from 'react';
import useEventsService from 'hooks/useEventsService';
import { useQuery, useMutation } from 'react-query';
import { CalendarEvent, CalendarEventWithStyles } from 'types';
import { useEffect } from 'react';

function App() {
	const [currentWeeklyView, setCurrentWeeklyView] = useState(getToday());
	const [showEventModal, setShowEventModal] = useState(false);
	const [eventData, setEventData] = useState<CalendarEvent[]>();

	const { eventsService } = useEventsService();
	const { data, isSuccess } = useQuery('events', () =>
		eventsService.getEvents('events')
	);

	const createNewEvent = useMutation((newEvent: CalendarEvent[]) =>
		eventsService.createEvent(newEvent, 'events')
	);

	const handleSubmit = (newEvent) => {
		const combinedData = [...(eventData as CalendarEvent[]), newEvent];
		setEventData(combinedData);
		createNewEvent.mutateAsync(combinedData);
	};

	useEffect(() => {
		if (isSuccess) {
			setEventData(data);
		}
	}, [isSuccess, data]);

	const currentViewEvents = processEventDataByWeek(
		currentWeeklyView,
		eventData
	);

	return (
		<>
			<Header currentWeeklyView={currentWeeklyView}/>
			{showEventModal && (
				<EventModal
					currentEventData={eventData as CalendarEvent[]}
					closeModal={() => setShowEventModal(false)}
					onSubmit={(newEvent) => handleSubmit(newEvent)}
				/>
			)}
			<Layout>
				<CalendarHeader
					gridArea="calendarHeader"
					currentWeeklyView={currentWeeklyView}
					onViewChange={(newDate) => setCurrentWeeklyView(newDate)}
				/>
				<CalendarAside gridArea="calendarAside" currentWeeklyView={currentWeeklyView} onViewChange={(newDate) => setCurrentWeeklyView(newDate)}/>
				<CalendarTable
					gridArea="calendarWrap"
					currentWeeklyView={currentWeeklyView}
					showEventModal={showEventModal}
					eventList={currentViewEvents as CalendarEventWithStyles[]}
					onTableClick={(newState) => setShowEventModal(newState)}
				/>
			</Layout>
		</>
	);
}

export default App;
