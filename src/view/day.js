export const createDayTemplate = (event, day) => {
  const {type, city, date, price, offers} = event;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${date.start.getUTCMonth() + ` ` +  date.start.getDate()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};
