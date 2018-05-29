# Devsmeetup Freiburg

[![Build Status](https://travis-ci.org/devsmeetup/devsmeetup.github.io.svg?branch=development)](https://travis-ci.org/devsmeetup/devsmeetup.github.io)

Welcome to the Devsmeetup Freiburg, a monthly hangout for technology and development enthusiasts.

We cover a range of topics related to (software/hardware) development, project management and design. Exchange with like-minded people or just listen to the talk. We're looking forward to hearing from you and to see you at an upcomingevent.

### Location

[Grünhof](http://gruenhof.org/) ([Map](https://goo.gl/maps/bwvEm4nmor42))


### Sponsors

Thanks to our sponsors (drinks and location):

[Grünhof](https://www.gruenhof.org/) Co-Working, Gründungskultur, Café Pow!

[Haufe](https://work.haufegroup.io/) Cloud and Desktop Solutions for Taxation, Legal, Bookkeeping, Learning, and Talent Management

[inxmail](http://www.inxmail.de/) E-Mail Marketing

[Patronas](https://www.patronas.com/) Front und Middle Office Lösungen für die internationalen Wertpapiermärkte

[Reservix](https://www.reservix.net/) Ticketingsoftware für Veranstalter


### Team

| [![twitter/t3ndh](https://pbs.twimg.com/profile_images/453293347830890496/874xyLml_400x400.jpeg)](https://twitter.com/t3ndh "Folge @t3ndh auf Twitter") | [![twitter/sebastiansebald](https://pbs.twimg.com/profile_images/767610123246329856/OEvlgPCO_400x400.jpg)](https://twitter.com/sebastiansebald "Folge @sebastiansebald auf Twitter") | [![twitter/stmllr](https://pbs.twimg.com/profile_images/378800000731009111/2b5856aaa91e9356b0d27155ed30e9ca_400x400.png)](https://twitter.com/stmllr "Folge @stmllr auf Twitter") |
|---------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Nico de Haen](http://www.ndh-websolutions.de/)                                                                                                         | Sebastian Sebald                                                                                                                                                                     | [Steffen Müller](http://stmllr.net/)                                                                                                                                              |

### Develop

- Make sure you have installed Node (version 10+).
- Install [`yarn`](https://yarnpkg.com/lang/en/)

- Available scripts:
  - `yarn start`: Build + start development server + opens the browser
  - `yarn build`: Build site

#### Some more context

- We use [parcel](https://parceljs.org/) to create a static page.
- We use [pug](https://pugjs.org/) to create HTML.
- We use [Sass](https://sass-lang.com/) to create the styles.
- We use the [Meetup API](https://www.meetup.com/meetup_api/) to fetch the upcoming meetup. The result will be passed to `parcel` via ENV (so visitors of the site do not need to call the API and we do not have to add more stuff to our privacy page 😉).