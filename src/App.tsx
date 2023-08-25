import React from 'react';
import styles from './App.module.css';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Placeholder from 'components/Placeholder';
import CalendarHeader from 'components/CalendarHeader';
import CalendarTable from 'components/CalendarTable';
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

	const createNewEvent = useMutation((newData: CalendarEvent[]) =>
		eventsService.createEvent(newData, 'events')
	);

	const handleSubmit = (newData) => {
		const combinedData = [
			...(eventData as CalendarEvent[]),
			newData as CalendarEvent,
		];
		setEventData(combinedData);
		createNewEvent.mutateAsync(combinedData);
	};

	useEffect(() => {
		if (isSuccess) {
			setEventData(data);
		}
	}, [data]);

	const currentViewEvents = processEventDataByWeek(
		currentWeeklyView,
		eventData
	);

	return (
		<div className={styles.container}>
			<Header />
			{showEventModal && (
				<EventModal
					currentEventData={eventData as CalendarEvent[]}
					closeModal={() => setShowEventModal(false)}
					onSubmit={(newData) => handleSubmit(newData)}
				/>
			)}
			<Layout>
				<Placeholder gridArea="asideLeft" />
				<Placeholder gridArea="asideLeft" />
				<CalendarHeader
					gridArea="calendarHeader"
					currentWeeklyView={currentWeeklyView}
					onViewChange={(newDate) => setCurrentWeeklyView(newDate)}
				/>
				<CalendarTable
					gridArea="calendarWrap"
					currentWeeklyView={currentWeeklyView}
					showEventModal={showEventModal}
					eventList={currentViewEvents as CalendarEventWithStyles[]}
					onTableClick={(newState) => setShowEventModal(newState)}
				/>
				<Placeholder gridArea="asideRight" />
				<Placeholder gridArea="asideRight" />
			</Layout>
		</div>
	);
}

export default App;
