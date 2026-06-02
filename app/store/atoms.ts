import { atom } from "jotai";

export const projectModalOpenAtom = atom<boolean>(false);

const projectIndexMap = {
  notetogo: 0,
  blinkshare: 1,
  cubely: 2,
};

// Sets the index (value of activeProjectAtom) to index of the project from the map
export const activeProjectAtom = atom(0);
