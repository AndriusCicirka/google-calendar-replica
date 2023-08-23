import React from 'react';
import styles from './App.module.css';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Placeholder from 'components/Placeholder';
import CalendarHeader from 'components/CalendarHeader';
import CalendarTable from 'components/CalendarTable';
import EventModal from 'components/EventModal';
import { getToday } from 'utils';
import { useState } from 'react';

function App() {
	const [currentWeeklyView, setCurrentWeeklyView] = useState(getToday());
	const [showEventModal, setShowEventModal] = useState(false);

	return (
		<div className={styles.container}>
			<Header />
			{showEventModal && (
				<EventModal closeModal={() => setShowEventModal(false)} />
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
					onTableClick={(newState) => setShowEventModal(newState)}
				/>
				<Placeholder gridArea="asideRight" />
				<Placeholder gridArea="asideRight" />
			</Layout>
		</div>
	);
}

export default App;
