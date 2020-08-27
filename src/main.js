import {createSiteRouteTemplate} from "./view/route.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDayTemplate} from "./view/day.js";
import {createRoutePointTemplate} from "./view/point.js";
import {createOfferTemplate} from "./view/point-edit.js";
import {createDestinationTemplate} from "./view/destination.js";
import {generateRoutePoints} from "./mock/point.js";

const ROUT_POINT_COUNT = 12;

const points = new Array(ROUT_POINT_COUNT).fill().map(generateRoutePoints);
console.log(points)

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
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

render(siteDaysContainerElement, createDayTemplate(), `beforeend`);

const siteTripListElement = siteTripElement.querySelector(`.trip-events__list`);

for (let i = 0; i < ROUT_POINT_COUNT; i++) {
  render(siteTripListElement, createRoutePointTemplate(points[i]), `beforeend`);
}

render(siteDaysContainerElement, createOfferTemplate(), `beforebegin`);

const siteoffersElement = siteTripElement.querySelector(`.event__section--offers`);

render(siteoffersElement, createDestinationTemplate(), `afterend`);
