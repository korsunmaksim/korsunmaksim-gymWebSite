import { useCallback, useEffect, useState } from "react";
import useHttp from "./useHttp.hook";

const TRAININGS_URL = "http://localhost:5000/trainings/";

function useTrainings() {
  const { request } = useHttp();
  const [trainings, setTrainings] = useState([]);
  const getTrainings = useCallback(async function getTrainings() {
    try {
      const data = await request(TRAININGS_URL, "Cannot get trainings", "GET");
      setTrainings(data);
    } catch (e) {}
  }, []);

  const deleteTraining = useCallback(async function (id) {
    try {
      await request(TRAININGS_URL + String(id), "Delete error!", "DELETE");
    } catch (e) {}
  }, []);

  useEffect(() => {
    getTrainings();
  }, [getTrainings, deleteTraining]);

  return { trainings };
}

export default useTrainings;
