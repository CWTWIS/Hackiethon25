import React, { useState } from "react";
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

const MyWidget = () => {
  // pet
  const [] = useState(pets[Math.floor]);

  // task

  const [text, setText] = useState("Hello, World!");

  const changeText = () => setText("Text has been changed!");

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between">
        {/* -------------- Lotties ------------- */}
        <div>
          <Lottie animationData={PinkEgg} style={{ width: 50, height: 50 }} />
          {/* <Lottie
            animationData={PinkKitten}
            style={{ width: 50, height: 50 }}
          /> */}
          {/* <Lottie animationData={PinkCat} style={{ width: 50, height: 50 }} /> */}
        </div>

        {/* ----------- Progressbar ----------- */}
        <div>
          <ProgressBar />
        </div>

        {/* <div className="flex justify-center">
          <button
            onClick={changeText}
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            Change Text
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MyWidget;
