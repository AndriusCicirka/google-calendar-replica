import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { eventServiceLocalStorage } from 'services';

import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

export const EventServiceContext = React.createContext(
  eventServiceLocalStorage
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <EventServiceContext.Provider value={eventServiceLocalStorage}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </EventServiceContext.Provider>
  </React.StrictMode>
);
