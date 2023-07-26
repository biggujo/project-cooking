import axios from 'axios';

export const fetchEvents = async () => {
  const response = await axios.get(
    'https://tasty-treats-backend.p.goit.global/api/events'
  );

  return response.data;
};
