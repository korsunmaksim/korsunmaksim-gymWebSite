import { createContext, useContext } from "react";

const TrainingContext = createContext();

function useTrainingContext() {
  return useContext(TrainingContext);
}

export { TrainingContext, useTrainingContext };
