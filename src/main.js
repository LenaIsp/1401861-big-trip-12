import SiteRouteView from "./view/site-route.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DayView from "./view/day.js";
import {createPointEditTemplate} from "./view/point-edit.js";
import {createDestinationTemplate} from "./view/destination.js";
import PointView from "./view/point.js";
import {generateRoutePoints} from "./mock/point.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const ROUT_POINT_COUNT = 9;

const points = new Array(ROUT_POINT_COUNT).fill().map(generateRoutePoints);

const renderListEvents = (listEvents) => {
    const sorted = listEvents.slice().sort((event1, event2) => {
      if (event1.date.start.getDate() > event2.date.start.getDate()) return 1;
      if (event1.date.start.getDate() < event2.date.start.getDate()) return -1;
      return 0;
    });

    let dayCounter = 1;
    let dayDate = null;
    let dayView = 0;

    for (let event of sorted) {
      const eventDayDate = event.date.start.getDate();
      if (dayDate === eventDayDate) {
        const siteTripListElement = siteTripElement.querySelectorAll(`.trip-events__list`)[dayView-1];
        renderElement(siteTripListElement, new PointView(event).getElement(), RenderPosition.BEFOREEND);
      } else {
        renderElement(siteDaysContainerElement, new DayView(event, dayCounter).getElement(), RenderPosition.BEFOREEND);
        const siteTripListElement = siteTripElement.querySelectorAll(`.trip-events__list`)[dayView];
        renderElement(siteTripListElement, new PointView(event).getElement(), RenderPosition.BEFOREEND);

        dayCounter++;
        dayView++;
        dayDate = eventDayDate;
      }
    }
};

//Шапка
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);
renderElement(siteMainElement, new SiteRouteView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);


//Сортировка(event, time....)
const siteTripElement = document.querySelector(`.trip-events`);
renderElement(siteTripElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);


//Редактирование точки маршрута
const siteDaysContainerElement = siteTripElement.querySelector(`.trip-days`);
renderTemplate(siteDaysContainerElement, createPointEditTemplate(), `beforebegin`);
const siteoffersElement = siteTripElement.querySelector(`.event__section--offers`);
renderTemplate(siteoffersElement, createDestinationTemplate(), `afterend`);


//Генерирует точки маршрута
renderListEvents(points)