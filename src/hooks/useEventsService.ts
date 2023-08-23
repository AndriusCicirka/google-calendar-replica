import { useContext } from 'react';
import { EventService } from 'types';
import { EventServiceContext } from 'index';

const useEventsService = (): { eventsService: EventService } => {
	const eventsService = useContext(EventServiceContext);

	return { eventsService };
};

export default useEventsService;
