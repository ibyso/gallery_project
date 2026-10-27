import { useState } from "react";
import { useCalendarFestivals } from "../hooks/useCalendarFestivals";

const festivalColors = [
  "bg-[#58654f]",
  "bg-[#b98055]",
  "bg-[#7186b5]",
  "bg-[#9472a3]",
  "bg-[#c36c78]",
  "bg-[#529a96]",
  "bg-[#a18b45]",
  "bg-[#777d91]",
];

type FestivalCalendarProps = {
  onFestivalClick?: (festivalId: number) => void;
};

const FestivalCalendar = ({ onFestivalClick }: FestivalCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { calendarFestivals, loading, errorMessage } = useCalendarFestivals();

  const events = calendarFestivals.map((festival) => ({
    id: festival.id,
    title: festival.title,
    startDate: festival.startdate!,
    endDate: festival.enddate!,
    color: festivalColors[festival.id % festivalColors.length],
  }));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 날짜를 일요일~토요일 단위로 나누기
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: lastDate }, (_, index) => index + 1),
  ];

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  const weeks: (number | null)[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  if (loading) {
    return <p className="mt-10 text-gray-500">축제 일정을 불러오는 중...</p>;
  }

  if (errorMessage) {
    return <p className="mt-10 text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* 달력 상단 */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          ◀
        </button>

        <h3 className="text-xl font-bold">
          {year}년 {month + 1}월
        </h3>

        <button
          type="button"
          onClick={nextMonth}
          className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          ▶
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekdays.map((day) => (
          <div key={day} className="py-3 text-center text-sm font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* 주 단위 달력 */}
      <div>
        {weeks.map((week, weekIndex) => {
          // 해당 주의 첫 날짜와 마지막 날짜
          const validDays = week.filter((day): day is number => day !== null);

          const weekStart = validDays[0];
          const weekEnd = validDays[validDays.length - 1];

          // 이번 주와 겹치는 축제

          const weekEvents = events
            .filter((event) => {
              // 축제의 시작일과 종료일
              const eventStart = event.startDate.replace(/-/g, "").slice(0, 8);
              const eventEnd = event.endDate.replace(/-/g, "").slice(0, 8);

              // 현재 달력에서 보고 있는 주의 시작일과 종료일
              const startDate = `${year}${String(month + 1).padStart(2, "0")}${String(weekStart).padStart(2, "0")}`;

              const endDate = `${year}${String(month + 1).padStart(2, "0")}${String(weekEnd).padStart(2, "0")}`;

              return eventStart <= endDate && eventEnd >= startDate;
            })
            .sort((a, b) => a.startDate.localeCompare(b.startDate));

          return (
            <div key={weekIndex} className="border-b border-gray-200 py-2">
              {/* 날짜 7칸 */}
              <div className="grid grid-cols-7">
                {week.map((day, index) => (
                  <div key={index} className="min-h-10 border-r border-gray-100 px-2 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* 축제 일정 Bar */}
              <div className="mt-2 space-y-1">
                {weekEvents.map((event) => {
                  const eventStart = new Date(
                    `${event.startDate.replace(/-/g, "").slice(0, 4)}-${event.startDate.replace(/-/g, "").slice(4, 6)}-${event.startDate.replace(/-/g, "").slice(6, 8)}T00:00:00`,
                  );

                  const eventEnd = new Date(
                    `${event.endDate.replace(/-/g, "").slice(0, 4)}-${event.endDate.replace(/-/g, "").slice(4, 6)}-${event.endDate.replace(/-/g, "").slice(6, 8)}T00:00:00`,
                  );

                  // 현재 달력의 해당 주 시작일과 종료일
                  const calendarWeekStart = new Date(year, month, weekStart);
                  const calendarWeekEnd = new Date(year, month, weekEnd);

                  // 실제로 Bar가 보여야 하는 시작일과 종료일
                  const visibleStartDate = new Date(
                    Math.max(eventStart.getTime(), calendarWeekStart.getTime()),
                  );

                  const visibleEndDate = new Date(
                    Math.min(eventEnd.getTime(), calendarWeekEnd.getTime()),
                  );

                  const visibleStart = visibleStartDate.getDate();
                  const visibleEnd = visibleEndDate.getDate();

                  // 해당 주에서 Bar가 시작하는 위치
                  const startColumn = week.findIndex((day) => day === visibleStart) + 1;

                  // Bar가 차지하는 날짜 수
                  const span = visibleEnd - visibleStart + 1;

                  return (
                    <div key={event.id} className="grid grid-cols-7">
                      <button
                        type="button"
                        onClick={() => onFestivalClick?.(event.id)}
                        className={`${event.color} cursor-pointer truncate rounded-md px-2 py-1 text-left text-xs font-medium text-white hover:opacity-80`}
                        style={{
                          gridColumn: `${startColumn} / span ${span}`,
                        }}
                        title={event.title}
                      >
                        {event.title}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FestivalCalendar;
