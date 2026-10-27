export interface WeatherResponse {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

// 지역별 대표 도시 좌표
export const WEATHER_REGIONS = {
  서울: { latitude: 37.5665, longitude: 126.978 },
  경기: { latitude: 37.2636, longitude: 127.0286 },
  인천: { latitude: 37.4563, longitude: 126.7052 },
  강원: { latitude: 37.8813, longitude: 127.7298 },
  충북: { latitude: 36.6424, longitude: 127.489 },
  충남: { latitude: 36.601, longitude: 126.6608 },
  대전: { latitude: 36.3504, longitude: 127.3845 },
  세종: { latitude: 36.48, longitude: 127.289 },
  전북: { latitude: 35.8242, longitude: 127.148 },
  전남: { latitude: 34.9904, longitude: 126.4817 },
  광주: { latitude: 35.1595, longitude: 126.8526 },
  경북: { latitude: 36.5684, longitude: 128.7294 },
  경남: { latitude: 35.2281, longitude: 128.6811 },
  대구: { latitude: 35.8714, longitude: 128.6014 },
  부산: { latitude: 35.1796, longitude: 129.0756 },
  울산: { latitude: 35.5384, longitude: 129.3114 },
  제주: { latitude: 33.4996, longitude: 126.5312 },
} as const;

export type WeatherRegion = keyof typeof WEATHER_REGIONS;

// 선택한 지역의 7일 날씨 조회
export const getWeeklyWeather = async (
  region: WeatherRegion = "서울",
): Promise<WeatherResponse> => {
  const { latitude, longitude } = WEATHER_REGIONS[region];

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
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
