import { delay, put, takeEvery, select } from "redux-saga/effects";
import {
  dataMemoryCardClick,
  dataMemoryCardsProcess,
  fetchMemoryCards,
  isSecondCardClicked,
} from "Slices/MemoryCardsSlice";
import { DataMemoryCardsState } from "Types/MemoryCardsType";

export function* dataMemoryCardClickSaga(): Generator {
  yield takeEvery(dataMemoryCardClick, function* () {
    const state: DataMemoryCardsState = yield select(fetchMemoryCards);
    if (isSecondCardClicked(state)) {
      yield delay(500);
    }
    yield put({ type: dataMemoryCardsProcess.type });
  });
}
