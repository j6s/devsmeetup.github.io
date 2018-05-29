const { resolve } = require('path');
const readConfig = require('read-config');

const { MEETUP } = process.env;
if (!MEETUP) {
  throw Error(
    'No env variable called "MEETUP" set. Please run the "getUpcomingMeetup" script first.'
  );
}

module.exports = {
  locals: {
    // Get meetup data from ENV
    meetup: JSON.parse(MEETUP),

    // Get site data from YAML
    ...readConfig(resolve(__dirname, 'src/data.yml')),
  },
};
