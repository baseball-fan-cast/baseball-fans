import http from '../http-common';

const getPlayer = (id: string) => {
  return http.get<never>(`/people/${id}`);
};

const DataService = {
  getPlayer
};

export default DataService;
