import { useEffect, useState } from "react";
import { getWeeklyWeather, type WeatherResponse } from "../apis/weatherApi";

function WeeklyWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeeklyWeather();
        setWeather(data);
      } catch (err) {
        console.error("날씨 조회 실패:", err);
        setError("날씨 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">날씨를 불러오는 중...</p>;
  }

  if (error || !weather) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-semibold">서울 주간 날씨</h2>

      <div className="grid grid-cols-7 gap-3">
        {weather.daily.time.map((date, index) => (
          <div key={date} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
            <p className="mb-2 text-sm font-medium">{index === 0 ? "오늘" : date.slice(5)}</p>

            <p className="mb-2 text-2xl">{weather.daily.weather_code[index] <= 3 ? "☀️" : "☁️"}</p>

            <p className="text-sm font-semibold">
              {Math.round(weather.daily.temperature_2m_max[index])}°
            </p>

            <p className="text-xs text-gray-400">
              {Math.round(weather.daily.temperature_2m_min[index])}°
            </p>

            <p className="mt-2 text-xs text-blue-500">
              강수 {weather.daily.precipitation_probability_max[index]}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeeklyWeather;
