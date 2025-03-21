import axios, { AxiosError } from 'axios';
import { navAxios, navTrackAxios } from '../config/axios/nav.config';
import { NavItemType, TrackPayload } from '../types/nav.types';
/**
 * Fetches the nav data
 * @returns {Promise<NavItemType[]>} - A promise that resolves to the nav data
 * @throws {Error} - Throws an error if the request fails
 */

export const getNavApi = async (): Promise<NavItemType[]> => {
  try {
    const response = await navAxios.get<NavItemType[]>('/');
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err.response?.data as AxiosError;

      throw new Error(axiosError.message);
    }
    throw new Error('Error fetching nav data!');
  }
};

/**
 * Posts the nav data
 * @param {string} url - The url to post the data to
 * @param {any} data - The data to post
 * @returns {Promise<any>} - A promise that resolves to the nav data
 * @throws {Error} - Throws an error if the request fails
 */

export const postNavApi = async (
  url: string,
  data: NavItemType[],
): Promise<NavItemType[]> => {
  try {
    const response = await navAxios.post(url, data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err.response?.data as AxiosError;

      throw new Error(axiosError.message);
    }
    throw new Error('Error posting nav data!');
  }
};

export const updateNavApi = async (data: TrackPayload) => {
  try {
    const response = await navTrackAxios.post('/', data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const axiosError = err.response?.data as AxiosError;

      throw new Error(axiosError.message);
    }
    throw new Error('Error updating nav data!');
  }
};
