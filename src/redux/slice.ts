import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote, filterModel } from '../shared/models';
import notesData from '../data/notes.json';

export interface IState {
  notes: INote[];
  filter: filterModel;
}
const initialState: IState = {
  notes: notesData.notes,
  filter: 'active',
};

export const notesAppSlice = createSlice({
  name: 'notesApp',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

// Part 4
export const { addNote } = notesAppSlice.actions;
export default notesAppSlice.reducer;
