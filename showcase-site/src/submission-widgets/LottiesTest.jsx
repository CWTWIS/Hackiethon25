import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import PinkEgg from "./assets/egg_pink.json";
import PinkKitten from "./assets/kitten_pink.json";
import PinkCat from "./assets/cat_pink.json";

import BlueEgg from "./assets/egg_blue.json";
import BlueKitten from "./assets/kitten_blue.json";
import BlueCat from "./assets/cat_blue.json";

import YellowEgg from "./assets/egg_yellow.json";
import YellowKitten from "./assets/kitten_yellow.json";
import YellowCat from "./assets/cat_yellow.json";

const pets = [
  { baby: PinkEgg, juvenile: PinkKitten, mature: PinkCat },
  { baby: BlueEgg, juvenile: BlueKitten, mature: BlueCat },
  { baby: YellowEgg, juvenile: YellowKitten, mature: YellowCat },
];

const LottiesTest = ({ taskForProgressBar, onResetProgress }) => {
  // pet
  const [currentPet, setCurrentPet] = useState(
    pets[Math.floor(Math.random() * pets.length)]
  );
  const [isEvolutionComplete, setIsEvolveComplete] = useState(false);

  // task
  const eggStageLimit = 3;
  const juvenileStageLimit = 5;
  const fullGrownStage = eggStageLimit + juvenileStageLimit;

  // determine animation
  const currentPetAnimation =
    taskForProgressBar >= fullGrownStage
      ? currentPet.mature
      : taskForProgressBar >= eggStageLimit
      ? currentPet.juvenile
      : currentPet.baby;

  // determine progress bar
  const currentStageLimit =
    taskForProgressBar < eggStageLimit
      ? eggStageLimit
      : taskForProgressBar < fullGrownStage
      ? juvenileStageLimit
      : juvenileStageLimit;
  const currentStageOffset =
    taskForProgressBar < eggStageLimit ? 0 : eggStageLimit;

  // progress bar width
  const barWidth = 200;
  const rectangleWidth = barWidth / currentStageLimit;

  // start new egg when complete
  useEffect(() => {
    if (taskForProgressBar >= fullGrownStage && !isEvolutionComplete) {
      setIsEvolveComplete(true);
      setTimeout(() => {
        setCurrentPet(pets[Math.floor(Math.random() * pets.length)]);
        onResetProgress();
        setIsEvolveComplete(false);
      }, 3000);
    }
  }, [taskForProgressBar, isEvolutionComplete, onResetProgress]);

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-lg">
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
                    index + currentStageOffset < taskForProgressBar
                      ? "#84cc16"
                      : "#e5e7eb",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LottiesTest;
