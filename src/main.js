import SiteRouteView from "./view/site-route.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DayView from "./view/day.js";
import PointView from "./view/point.js";
import PointEditView from "./view/point-edit.js";
import {generateRoutePoints} from "./mock/point.js";
import {renderTemplate, render, RenderPosition} from "./utils.js";

const ROUT_POINT_COUNT = 9;

const points = new Array(ROUT_POINT_COUNT).fill().map(generateRoutePoints);

const renderEvents = (element, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView();

  const replacePointToEdit = () => {
    element.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceEditToPoint = () => {
    element.replaceChild(pointComponent.getElement(), pointEditComponent.getElement(),);
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToEdit(element)
  });

  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
  });

  render(element, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

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
        renderEvents(siteTripListElement, event)
      } else {
        render(siteDaysContainerElement, new DayView(event, dayCounter).getElement(), RenderPosition.BEFOREEND);
        const siteTripListElement = siteTripElement.querySelectorAll(`.trip-events__list`)[dayView];
        renderEvents(siteTripListElement, event)

        dayCounter++;
        dayView++;
        dayDate = eventDayDate;
      }
    }
};

//Шапка
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);
render(siteMainElement, new SiteRouteView().getElement(), RenderPosition.AFTERBEGIN);
render(siteControlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
render(siteControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);


//Сортировка(event, time....)
const siteTripElement = document.querySelector(`.trip-events`);
render(siteTripElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);


//Редактирование точки маршрута
const siteDaysContainerElement = siteTripElement.querySelector(`.trip-days`);
render(siteDaysContainerElement, new PointEditView().getElement(), RenderPosition.BEFOREEND);


//очки маршрута
renderListEvents(points)
