import axios from "axios";
import axiosInstance from "./axios";
import type { FestivalListItem } from "../types/post";

const url = "http://127.0.0.1:8000/festivals";

export const getFestivals = async (): Promise<FestivalListItem[]> => {
  const response = await axios.get<FestivalListItem[]>(url);

  return response.data;
};

export const getFestival = async (content_id: number) => {
  const response = await axios.get(`${url}/${content_id}`);
  return response.data;
};

export const postFestivalView = async (festivalId: number) => {
  const response = await axiosInstance.post<{
    festival_id: number;
    views: number;
  }>(`/festivals/${festivalId}/views`);

  return response.data;
};
