import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { eventServiceLocalStorage } from 'services/eventServiceLocalStorage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

export const EventServiceContext = React.createContext(
	eventServiceLocalStorage
);

root.render(
	<React.StrictMode>
		<EventServiceContext.Provider value={eventServiceLocalStorage}>
			<App />
		</EventServiceContext.Provider>
	</React.StrictMode>
);
