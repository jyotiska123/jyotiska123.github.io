import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideo from "../components/ExerciseVideo";
import SimilarExercises from "../components/SimilarExercises";
const ExcerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState([]);
  const [equipmentExercices, setEquipmentExercices] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);
      console.log(exerciseVideos);

      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      console.log(targetMuscleExercisesData);
      setTargetMuscle(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setEquipmentExercices(equipmentExercisesData);
    };
    fetchExercisesData();
  }, [id]);
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideo
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscle={targetMuscle}
        equipmentExercices={equipmentExercices}
      />
    </Box>
  );
};

export default ExcerciseDetail;
