import {createElement} from "../utils.js";

export const createDayTemplate = (event, day) => {
  const {date} = event;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${date.start.getUTCMonth() + ` ` + date.start.getDate()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

const createDayTemplate2 = (event, day) => {
  const {date} = event;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${date.start.getUTCMonth() + ` ` + date.start.getDate()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day {
  constructor(point, day) {
    this._point = point;
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate2(this._point, this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}