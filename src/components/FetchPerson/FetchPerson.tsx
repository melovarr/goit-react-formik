import axios from "axios";

export default async function fetchPerson(id: number) {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
}
