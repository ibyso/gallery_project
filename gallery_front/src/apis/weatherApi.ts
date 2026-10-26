export interface WeatherResponse {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

export const getWeeklyWeather = async (): Promise<WeatherResponse> => {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=37.5665" +
    "&longitude=126.9780" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
    "&timezone=Asia%2FSeoul" +
    "&forecast_days=7";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("날씨 정보를 불러오지 못했습니다.");
  }

  const data: WeatherResponse = await response.json();

  return data;
};
