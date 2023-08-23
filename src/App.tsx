import React from 'react';
import Header from 'components/Layout/Header';
import Layout from 'components/Layout/Layout';
import Placeholder from 'components/Layout/Placeholder';
import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarTable from 'components/Calendar/CalendarTable';
import EventModal from 'components/Event/EventModal';
import { getToday } from 'utils/utils';
import { useState } from 'react';

function App() {
	const [currentWeeklyView, setCurrentWeeklyView] = useState(getToday());
	const [showEventModal, setShowEventModal] = useState(false);

	return (
		<>
			<Header />
			{showEventModal && (
				<EventModal closeModal={() => setShowEventModal(false)} />
			)}
			<Layout>
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
			</Layout>
		</>
	);
}

export default App;
