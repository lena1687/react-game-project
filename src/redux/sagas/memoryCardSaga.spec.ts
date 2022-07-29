import { dataMemoryCardClickSaga } from "./memoryCardSaga";
import { expectSaga } from "redux-saga-test-plan";
import {
  dataMemoryCardClick,
  dataMemoryCardsProcess,
  initialState,
} from "Slices/MemoryCardsSlice";

describe("Sagas of memory cards", () => {
  it("Page MemoryCard - click first on the card", () => {
    const state = { ...initialState, clicked: 3, prevClicked: null };
    return expectSaga(dataMemoryCardClickSaga)
      .withState({
        MemoryCards: state,
      })
      .dispatch({ type: dataMemoryCardClick.type, payload: 3 })
      .put({ type: dataMemoryCardsProcess.type })
      .run();
  });
  it("Page MemoryCard - click second on the card", () => {
    const state = { ...initialState, clicked: 4, prevClicked: 1 };
    return expectSaga(dataMemoryCardClickSaga)
      .withState({
        MemoryCards: state,
      })
      .dispatch({ type: dataMemoryCardClick.type, payload: 1 })
      .delay(500)
      .put({ type: dataMemoryCardsProcess.type })
      .run(500);
  });
});
