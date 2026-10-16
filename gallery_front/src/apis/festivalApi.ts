import axios from "axios";

const url = "http://127.0.0.1:8000/festivals";

export const getFestivals = async () => {
  const params = new URLSearchParams({
    MobileOS: "ETC",
    MobileApp: "FestivalProject",
    eventStartDate: "20261001",
    numOfRows: "12",
    pageNo: "1",
    _type: "json",
  });

  const response = await fetch(`/api/festivals?${params.toString()}`);

  if (!response.ok) {
    throw new Error("축제 정보를 불러오지 못했습니다.");
  }

  const data = await response.json();

  return data;
};

export const getFestival = async (content_id: number) => {
  const response = await axios.get(`${url}/${content_id}`);
  return response.data;
};
