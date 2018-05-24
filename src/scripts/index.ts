import { createTeaser } from './dom';
import { RequestStatus, request } from './request';
import { MeetupEvent } from './types';

const eventElement = document.getElementById('teaser')!;

request<[MeetupEvent]>(
  'https://api.meetup.com/Devsmeetup-Freiburg/events?&photo-host=public&page=1&status=upcoming',
  ev => {
    let content = '';

    switch (ev.status) {
      case RequestStatus.Fetching:
        content = 'Loading ...';
        break;
      case RequestStatus.Success:
        content = createTeaser(ev.data[0]);
        break;
      case RequestStatus.Error:
        content = ev.error.message;
        break;
      default:
        break;
    }

    eventElement.innerHTML = content;
  }
);
