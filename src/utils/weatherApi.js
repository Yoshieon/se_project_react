import { handleServerResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return fetch(url).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data?.name || "";
  const tempF = data?.main?.temp ?? null;
  result.temp = {
    F: tempF != null ? Math.round(tempF) : 999,
    C: tempF != null ? Math.round(((tempF - 32) * 5) / 9) : 999,
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data?.weather?.[0]?.main?.toLowerCase() || "";
  result.isDay = isDay(data?.sys, Date.now());
  return result;
};

const isDay = (sys, now) => {
  if (!sys || sys.sunrise == null || sys.sunset == null) return true;
  return sys.sunrise * 1000 < now && now < sys.sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
