import Training from "../models/training.models.js";

const createTraining = async (req, res) => {
  try {
    const newTraining = new Training({
      name: req.body.name,
      description: req.body.description,
      pdfUrl: req.body.pdfUrl,
    });
    await newTraining.save();
    res.json(newTraining);
  } catch (e) {
    res
      .status(400)
      .json({ message: e.message || "Cannot create new training" });
  }
};

const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (e) {
    res.status(400).json({ message: "Cannot get all trainings!" });
  }
};

const getOneTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const training = await Training.findById(trainingId);
    res.json(training);
  } catch (e) {
    res.status(400).json({ message: "Cannot get  training!" });
  }
};

const removeTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;
    await Training.findOneAndDelete({
      _id: trainingId,
    });
    res.status(200).json({ message: "Training was deleted!" });
  } catch (e) {
    res.status(400).json({ message: "Cannot delete training!" });
  }
};

const updateTraining = async (req, res) => {
  try {
    const trainingId = req.params.id;
    await Training.updateOne(
      {
        _id: trainingId,
      },
      {
        name: req.body.name,
        description: req.body.description,
        pdfUrl: req.body.pdfUrl,
      }
    );
    res.status(200).json({ message: "Training was updated!" });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export {
  createTraining,
  getAllTrainings,
  getOneTraining,
  removeTraining,
  updateTraining,
};
