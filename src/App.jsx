import React, { useEffect, useState } from "react";
import "./App.css";
import Visualiser from "./Visualiser";
import Control from "./Control";

import { bubbleSort } from "./algorithm/bubbleSort";
import { mergeSort } from "./algorithm/mergeSort";
import { selectionSort } from "./algorithm/SelectionSort";
import { insertionSort } from "./algorithm/insertionSort";
import { quickSort } from "./algorithm/quickSort";
import { heapSort } from "./algorithm/heapSort";

function App() {
  const [array, setArray] = useState([]);
  const [userInuptArray, setUserInuptArray] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("");

  useEffect(() => {
    const userInput = userInuptArray.split(",");
    const filteredInput = userInput
      .map((item) => parseInt(item.trim()))
      .filter((num) => !isNaN(num) && num > 0 && num <= 500);

    setArray(filteredInput);
  }, [userInuptArray]);

  const handleNewArrayGenrate = () => {
    const newArray = Array.from(
      { length: 15 },
      () => Math.floor(Math.random() * 400) + 50
    );
    setArray(newArray);
  };

  const reSet = () => {
    setArray([]);
    setSelectedSorting("");
    setUserInuptArray("");
  };

  const handleSorting = (e) => {
    const sortingMethod = e.target.value;
    setSelectedSorting(sortingMethod);
    setIsSorting(true);

    let animationArr = [];
    switch (sortingMethod) {
      case "bubbleSort":
        animationArr = bubbleSort(array);
        bubbleAnimation(animationArr);
        break;
      case "mergeSort":
        animationArr = mergeSort(array);
        animateMergeSorting(animationArr);
        break;
      case "selectionSort":
        animationArr = selectionSort(array);
        animateSelectionSorting(animationArr);
        break;
      case "insertionSort":
        animationArr = insertionSort(array);
        animateInsertionSorting(animationArr);
        break;
      case "quickSort":
        animationArr = quickSort(array);
        animateQuickSorting(animationArr);
        break;
      case "heapSort":
        animationArr = heapSort(array);
        animateHeapSorting(animationArr);
        break;

      default:
        setIsSorting(false);
        break;
    }
  };

  const bubbleAnimation = (animation) => {
    const barEle = document.getElementsByClassName("bar");

    for (let i = 0; i < animation.length; i++) {
      const [barOneInd, barTwoInd, swap] = animation[i];
      const barOne = barEle[barOneInd];
      const barTwo = barEle[barTwoInd];

      setTimeout(() => {
        barOne.style.backgroundColor = swap ? "red" : "yellow";
        barTwo.style.backgroundColor = swap ? "red" : "yellow";

        if (swap) {
          const heightTemp = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = heightTemp;

          const content = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = content;
        }

        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < barEle.length; j++) {
        setTimeout(() => {
          barEle[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animation.length * speed);
  };

  const animateMergeSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = bars[barOneIdx];
        const barTwo = bars[barTwoIdx];
        const color = i % 3 === 0 ? "yellow" : "blue";

        setTimeout(() => {
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOne = bars[barOneIdx];
          barOne.style.height = `${newHeight}px`;
          barOne.innerHTML = newHeight;
        }, i * speed);
      }
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };

  const animateSelectionSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];

      setTimeout(() => {
        barOne.style.backgroundColor = swap ? "red" : "yellow";
        barTwo.style.backgroundColor = swap ? "red" : "yellow";

        if (swap) {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;

          const tempContent = barOne.innerHTML;
          barOne.innerHTML = barTwo.innerHTML;
          barTwo.innerHTML = tempContent;
        }

        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };
  const animateInsertionSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoValOrIdx, isSwap] = animations[i];

      setTimeout(() => {
        const barOne = bars[barOneIdx];

        if (!isSwap) {
          const barTwo = bars[barTwoValOrIdx];
          barOne.style.backgroundColor = "yellow";
          barTwo.style.backgroundColor = "yellow";
          setTimeout(() => {
            barOne.style.backgroundColor = "blue";
            barTwo.style.backgroundColor = "blue";
          }, speed);
        } else {
          barOne.style.height = `${barTwoValOrIdx}px`;
          barOne.innerText = barTwoValOrIdx;
          barOne.style.backgroundColor = "red";
          setTimeout(() => {
            barOne.style.backgroundColor = "blue";
          }, speed);
        }
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };
  const animateQuickSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];

      setTimeout(() => {
        barOne.style.backgroundColor = isSwap ? "red" : "yellow";
        barTwo.style.backgroundColor = isSwap ? "red" : "yellow";

        if (isSwap) {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;

          const tempText = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = tempText;
        }

        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };
  const animateHeapSorting = (animations) => {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isSwap] = animations[i];
      const barOne = bars[barOneIdx];
      const barTwo = bars[barTwoIdx];

      setTimeout(() => {
        barOne.style.backgroundColor = isSwap ? "red" : "yellow";
        barTwo.style.backgroundColor = isSwap ? "red" : "yellow";

        if (isSwap) {
          const tempHeight = barOne.style.height;
          barOne.style.height = barTwo.style.height;
          barTwo.style.height = tempHeight;

          const tempText = barOne.innerText;
          barOne.innerText = barTwo.innerText;
          barTwo.innerText = tempText;
        }

        setTimeout(() => {
          barOne.style.backgroundColor = "blue";
          barTwo.style.backgroundColor = "blue";
        }, speed);
      }, i * speed);
    }

    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setIsSorting(false);
    }, animations.length * speed);
  };

  return (
    <div className="App">
      <h1>Sorting Visualizer</h1>
      <Control
        handleNewArrayGenrate={handleNewArrayGenrate}
        handleSorting={handleSorting}
        userInuptArray={userInuptArray}
        setUserInuptArray={setUserInuptArray}
        setSpeed={setSpeed}
        reSet={reSet}
        isSorting={isSorting}
        speed={speed}
        selectedSorting={selectedSorting}
      />
      <Visualiser array={array} />
    </div>
  );
}

export default App;
