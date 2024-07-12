import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';

import { Header, Layout } from 'components/ui';
import {CalendarHeader, CalendarTable, CalendarAside, EventModal} from 'components';
import { getToday, processEventDataByWeek } from 'utils';
import { useEventsService } from 'hooks';
import { CalendarEvent, CalendarEventWithStyles } from 'types';

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
          currentWeeklyView={currentWeeklyView}
          onViewChange={(newDate) => setCurrentWeeklyView(newDate)}
        />
        <CalendarAside currentWeeklyView={currentWeeklyView} onViewChange={(newDate) => setCurrentWeeklyView(newDate)}/>
        <CalendarTable

          showEventModal={showEventModal}
          eventList={currentViewEvents as CalendarEventWithStyles[]}
          onTableClick={(newState) => setShowEventModal(newState)}
        />
      </Layout>
    </>
  );
}

export default App;
