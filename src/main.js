import {createSiteRouteTemplate} from "./view/route.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDayTemplate} from "./view/day.js";
import {createRoutePointTemplate} from "./view/point.js";
import {createOfferTemplate} from "./view/point-edit.js";
import {createDestinationTemplate} from "./view/destination.js";
import {generateRoutePoints} from "./mock/point.js";

const ROUT_POINT_COUNT = 25;

const points = new Array(ROUT_POINT_COUNT).fill().map(generateRoutePoints);
console.log(points)

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderListEvents = (listEvents) => {
    const sorted = listEvents.slice().sort((event1, event2) => {
      if (event1.date.start.getDate() > event2.date.start.getDate()) return 1;
      if (event1.date.start.getDate() < event2.date.start.getDate()) return -1;
      return 0;
    });
    console.log(sorted)

    let dayCounter = 1;
    let dayDate = null;
    let dayView = 0;

    for (let event of sorted) {
      const eventDayDate = event.date.start.getDate();
      if (dayDate === eventDayDate) {
        const siteTripListElement = siteTripElement.querySelectorAll(`.trip-events__list`)[dayView-1];
        render(siteTripListElement, createRoutePointTemplate(event), `beforeend`);
      } else {
        render(siteDaysContainerElement, createDayTemplate(event, dayCounter), `beforeend`);
        const siteTripListElement = siteTripElement.querySelectorAll(`.trip-events__list`)[dayView];
        render(siteTripListElement, createRoutePointTemplate(event), `beforeend`);

        dayCounter++;
        dayView++;
        dayDate = eventDayDate;
      }
    }
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsHeaderElement = siteMainElement.querySelector(`.trip-controls > h2`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

render(siteMainElement, createSiteRouteTemplate(), `afterbegin`);
render(siteControlsHeaderElement, createMenuTemplate(), `afterend`);
render(siteControlsElement, createFilterTemplate(), `beforeend`);

const siteTripElement = document.querySelector(`.trip-events`);
const siteEventsHeaderElement = siteTripElement.querySelector(`h2`);

render(siteEventsHeaderElement, createSortTemplate(), `afterend`);

const siteDaysContainerElement = siteTripElement.querySelector(`.trip-days`);
render(siteDaysContainerElement, createOfferTemplate(), `beforebegin`);

renderListEvents(points)

const siteoffersElement = siteTripElement.querySelector(`.event__section--offers`);

render(siteoffersElement, createDestinationTemplate(), `afterend`);