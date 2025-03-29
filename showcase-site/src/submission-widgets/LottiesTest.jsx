import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import PinkEgg from "../assets/lotties/egg_pink.json";
import PinkKitten from "../assets/lotties/kitten_pink.json";
import PinkCat from "../assets/lotties/cat_pink.json";

import BlueEgg from "../assets/lotties/egg_blue.json";
import BlueKitten from "../assets/lotties/kitten_blue.json";
import BlueCat from "../assets/lotties/cat_blue.json";

import YellowEgg from "../assets/lotties/egg_yellow.json";
import YellowKitten from "../assets/lotties/kitten_yellow.json";
import YellowCat from "../assets/lotties/cat_yellow.json";

import ProgressBar from "../Development/ProgressBar";

const pets = [
  { baby: PinkEgg, juvenile: PinkKitten, mature: PinkCat },
  { baby: BlueEgg, juvenile: BlueKitten, mature: BlueCat },
  { baby: YellowEgg, juvenile: YellowKitten, mature: YellowCat },
];

const LottiesTest = () => {
  // pet
  const [currentPet, setCurrentPet] = useState(
    pets[Math.floor(Math.random() * pets.length)]
  );
  const [isEvolutionComplete, setIsEvolveComplete] = useState(false);

  // task
  const [tasksCompleted, setTaskCompleted] = useState(0);
  const firstStage = 5;
  const secondStage = 10;
  // const totalTasks = firstStage + secondStage;
  const totalTasks =
    tasksCompleted < firstStage
      ? firstStage
      : tasksCompleted < firstStage + secondStage
      ? secondStage
      : secondStage;

  // determine animation
  const currentPetAnimation =
    tasksCompleted >= totalTasks
      ? currentPet.mature
      : tasksCompleted >= firstStage
      ? currentPet.juvenile
      : currentPet.baby;

  // determine progress bar
  const currentStageLimit =
    tasksCompleted < firstStage ? firstStage : secondStage;
  const currentStageOffset = tasksCompleted < firstStage ? 0 : firstStage;

  // progress bar width
  const barWidth = 300;
  const rectangleWidth = barWidth / totalTasks;

  // progress bar function
  const increaseProgress = () => {
    if (tasksCompleted < firstStage + secondStage) {
      setTaskCompleted(tasksCompleted + 1);
    }
  };
  const decreaseProgress = () => {
    if (tasksCompleted > 0) {
      setTaskCompleted(tasksCompleted - 1);
    }
  };

  // start new egg when complete
  useEffect(() => {
    if (tasksCompleted >= firstStage + secondStage && !isEvolutionComplete) {
      setIsEvolveComplete(true);
      setTimeout(() => {
        setTaskCompleted(0);
        setCurrentPet(pets[Math.floor(Math.random() * pets.length)]);
        setIsEvolveComplete(false);
      }, 3000);
    }
  }, [tasksCompleted, isEvolutionComplete]);

  return (
    <div className="p-6 max-w-l mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between gap-5">
        {/* -------------- Current Pet ------------- */}
        <div>
          <Lottie
            animationData={currentPetAnimation}
            style={{ width: 50, height: 50 }}
          />
        </div>

        {/* ----------- Progressbar ----------- */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              gap: "5px",
              width: barWidth,
              height: "20px",
            }}
          >
            {Array.from({ length: currentStageLimit }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: rectangleWidth,
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor:
                    index + currentStageOffset < tasksCompleted
                      ? "#84cc16"
                      : "#e5e7eb",
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* --------------- button test ------------- */}
      </div>
      <div className="flex justify-between">
        <button
          onClick={increaseProgress}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
        >
          +
        </button>
        <button
          onClick={decreaseProgress}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default LottiesTest;
