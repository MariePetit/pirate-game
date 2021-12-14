import {
  randomCrewMateName,
  randomCrewIcon,
  randomCrewAttributes,
} from "./randomCrewMate";

const crewMateGenerator = () => {
  return {
    name: randomCrewMateName(),
    attributes: randomCrewAttributes(),
    energy: Math.floor(Math.random() * 15 + 5),
    moral: Math.floor(Math.random() * 15 + 5),
    img: randomCrewIcon(),
  };
};

export default crewMateGenerator;
