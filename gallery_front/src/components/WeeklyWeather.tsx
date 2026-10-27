import { useEffect, useState } from "react";
import {
  getWeeklyWeather,
  WEATHER_REGIONS,
  type WeatherRegion,
  type WeatherResponse,
} from "../apis/weatherApi";

function WeeklyWeather() {
  // 선택된 지역 (기본값: 서울)
  const [selectedRegion, setSelectedRegion] = useState<WeatherRegion>("서울");

  // 지역 선택 메뉴 열림 여부
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  // 날씨 데이터
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 지역이 변경되면 해당 지역의 날씨 다시 조회
  useEffect(() => {
    let ignore = false;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const data = await getWeeklyWeather(selectedRegion);

        if (!ignore) {
          setWeather(data);
        }
      } catch (err) {
        console.error("날씨 조회 실패:", err);

        if (!ignore) {
          setError("날씨 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      ignore = true;
    };
  }, [selectedRegion]);

  return (
    <section className="mb-12">
      {/* 지역 선택 버튼 */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setIsRegionOpen(!isRegionOpen)}
          className="flex cursor-pointer items-center gap-2 text-xl font-semibold"
        >
          {selectedRegion} 주간 날씨
          <span className="text-sm text-gray-500">{isRegionOpen ? "▲" : "▼"}</span>
        </button>

        {/* 지역 선택 목록 */}
        {isRegionOpen && (
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-4 md:grid-cols-6">
            {(Object.keys(WEATHER_REGIONS) as WeatherRegion[]).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => {
                  setSelectedRegion(region);
                  setIsRegionOpen(false);
                }}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
                  selectedRegion === region
                    ? "bg-[#58654f] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 날씨 조회 상태 */}
      {loading ? (
        <p className="text-sm text-gray-500">{selectedRegion} 날씨를 불러오는 중...</p>
      ) : error || !weather ? (
        <p className="text-sm text-red-500">{error || "날씨 정보가 없습니다."}</p>
      ) : (
        /* 기존 7일 날씨 카드 */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {weather.daily.time.map((date, index) => (
            <div key={date} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
              <p className="mb-2 text-sm font-medium">{index === 0 ? "오늘" : date.slice(5)}</p>

              <p className="mb-2 text-2xl">
                {weather.daily.weather_code[index] <= 3 ? "☀️" : "☁️"}
              </p>

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
      )}
    </section>
  );
}

export default WeeklyWeather;
