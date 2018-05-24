export interface MeetupVenue {
  id: number;
  name: string;
  lat: number;
  lon: number;
  repinned: boolean;
  address_1: string;
  city: string;
  country: string;
  localized_country_name: string;
}

export interface MeetupGroup {
  created: number;
  name: string;
  id: number;
  join_mode: string;
  lat: number;
  lon: number;
  urlname: string;
  who: string;
  localized_location: string;
  region: string;
}

export interface MeetupEvent {
  created: number;
  duration: number;
  id: string;
  name: string;
  rsvp_limit: number;
  status: string;
  time: number;
  local_date: string;
  local_time: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: MeetupVenue;
  group: MeetupGroup;
  link: string;
  description: string;
  visibility: string;
}
