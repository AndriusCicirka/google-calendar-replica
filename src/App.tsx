import React from 'react';
import './App.css';

import Header from 'components/Calendar/UI/Header';
import Layout from 'components/Layout/Layout';
import Placeholder from 'components/Layout/Placeholder';
import CalendarHeader from 'components/Calendar/UI/CalendarHeader';
import CalendarTable from 'components/Calendar/UI/CalendarTable';
import EventModal from 'components/Calendar/UI/EventModal';

function App() {
	//<CalendarTable gridArea="calendar-main" />
	//<EventModal />

	return (
		<>
			<Header />
			<Layout>
				<Placeholder gridArea="aside-left" />
				<CalendarHeader gridArea="calendar-header" />
				<CalendarTable gridArea="calendar-wrap" />
				<Placeholder gridArea="aside-right" />
			</Layout>
		</>
	);
}

export default App;
