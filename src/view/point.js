export const createRoutePointTemplate = (event) => {  
  const {type, city, date, price, offers} = event;
  const texts = (type == `Check-in` || type == `Sightseeing` || type == `Restaurant`)
    ? `in`
    : `to`;

  const generateTime = (times) => {
    if (times < 10) {
      return `0` + times;
    }
    return times
  };

  const generateDateDuration = () => {
    const MS_IN_SEC = 1000;
    const MS_IN_MIN = MS_IN_SEC * 60;
    const MS_IN_HOUR = MS_IN_MIN * 60;
    const MS_IN_DAY = MS_IN_HOUR * 24;

    const formatDatePart = (value = 0, interval = `M`) => {
      if (value.toString().length > 1) {
        return `${value}${interval}`
      } if (value == 0) {
        return ``
      }
      return `0${value}${interval}`
    };
    const formatDateInterval = (days = 0, hours = 0, mins = 0) =>
    `${formatDatePart(days, `D`)} ${formatDatePart(hours, `H`)} ${formatDatePart(mins, `M`)}`

    const start = date.start;
    const end = date.end;
    const startMs = start.getTime();
    const endMs = end.getTime();

    const delta = endMs - startMs;
    const daysDiff = Math.trunc(delta / MS_IN_DAY);
    const hoursDiff = Math.trunc(delta / MS_IN_HOUR - daysDiff * 24);
    const minDiff = Math.trunc(delta / MS_IN_MIN - (daysDiff * 24 + hoursDiff) * 60);

    return formatDateInterval(daysDiff, hoursDiff, minDiff)
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${texts} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${date.start.getDate() + `.` + date.start.getMonth() + `.` + date.start.getFullYear() + `T` + date.start.getHours() + `:` + date.start.getMinutes()}">${generateTime(date.start.getHours()) + `:` + generateTime(date.start.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="${date.end.getDate() + `.` + date.end.getMonth() + `.` + date.end.getFullYear() + `T` + date.end.getHours() + `:` + date.end.getMinutes()}">${generateTime(date.end.getHours()) + `:` + generateTime(date.end.getMinutes())}</time>
          </p>
          <p class="event__duration">${generateDateDuration()}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${offers.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offers.price}</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
