const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const types = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const cities = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`, 
  `Saint Petersburg`
];

const generateType = (descriptions) => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const startTrip = new Date(2020, 8, 24);
const endTrip = new Date(2020, 8, 30);

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateRoutePoints = () => {
  const dateStart = generateRandomDate(startTrip, endTrip);
  const dateEnd = generateRandomDate(dateStart, endTrip);
  return {
    type: generateType(types),
    city: generateType(cities),
    dateStart,
    dateEnd,
    /*price: generateDate(),
    options: ,
    info: {
      discription: ,
      pictures: ,
    },*/
  };
};