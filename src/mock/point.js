const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const types = [
  `taxi`,
  `bus`,
  `train`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const cities = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Saint Petersburg`
];

const OFFERS = [
  {
    title: `Add luggage`,
    price: 50,
  },
  {
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    title: `Add meal`,
    price: 15,
  },

  {
    title: `Choose seats`,
    price: 5,
  },
  {
    title: `Travel by train`,
    price: 40,
  },
  {
    title: `Order Uber`,
    price: 20,
  }
];

const generateType = (descriptions) => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateRandomDate = () => {
  const start = new Date();
  start.setHours(start.getHours() + getRandomInteger(0, 12));
  start.setMinutes(start.getMinutes() + getRandomInteger(0, 30));
  start.setDate(start.getDate() + getRandomInteger(0, 5));
  const end = new Date(start);
  end.setHours(end.getHours() + getRandomInteger(0, 12));
  end.setMinutes(end.getMinutes() + getRandomInteger(0, 30));
  end.setDate(end.getDate() + getRandomInteger(0, 0));
  return {
    start,
    end
  };
};


export const generateRoutePoints = () => {
  return {
    type: generateType(types),
    city: generateType(cities),
    date: generateRandomDate(),
    price: getRandomInteger(14, 400),
    offers: generateType(OFFERS)
  };
};
