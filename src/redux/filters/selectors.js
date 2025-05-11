export const selectNameFilter = (state) => state.filters.name;
export const selectIsFilterActive = (state) => state.filters.name.length > 0;
