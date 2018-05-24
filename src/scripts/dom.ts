import { MeetupEvent } from './types';

const createCalendarIcon = (size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
  </svg>`;

const createClockIcon = (size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <defs>
      <path id="a" d="M0 0h24v24H0z"/>
    </defs>
    <g>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12.5 7H11v6l5.2 3.2.8-1.3-4.5-2.7z"/>
    </g>
  </svg>`;

const createRSVPIcon = (size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-9 15l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z"/>
  </svg>`;

const formatTeaserDate = (value: string) =>
  new Date(value)
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    })
    .split(' ');

export const createTeaser = (meetup: MeetupEvent) => {
  const [month, day] = formatTeaserDate(meetup.local_date);
  return `
  <div class="teaser">
    <div class="teaser-caption">Upcoming Meetup</div>
    <h2 class="teaser-title">${meetup.name}</h2>
    <small class="teaser-meta">
      ${createCalendarIcon(12)}
      <span>${day} ${month}</span>
      ${createClockIcon(12)}
      <span>${meetup.local_time}</span>
    </small>
    <div class="teaser-description">${meetup.description}</div>
    <div class="teaser-footer">
      <a class="teaser-link" href="${
        meetup.link
      }" rel="nofollow">${createRSVPIcon(16)} RSVP</a>
    </div>
  </div>`;
};
