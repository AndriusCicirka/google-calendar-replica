import React from 'react';
import './App.css';

import Header from 'components/Calendar/UI/Header';
import Layout from 'components/Layout/Layout';
import Placeholder from 'components/Layout/Placeholder';
import CalendarHeader from 'components/Calendar/UI/CalendarHeader';
import CalendarTable from 'components/Calendar/UI/CalendarTable';

function App() {
	return (
		<div className="App">
			<Header />
			<Layout>
				<Placeholder gridArea="aside-left" />
				<Placeholder gridArea="aside-right" />
				<CalendarHeader gridArea="calendar-header" />
				<CalendarTable gridArea="calendar-table" />
			</Layout>
		</div>
	);
}

export default App;
