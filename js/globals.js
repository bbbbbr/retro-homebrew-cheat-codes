const SORT_BEFORE = -1;
const SORT_AFTER  =  1;
const SORT_NOCHANGE = 0;

// Sorting dropdown list options
const SORTING_TITLE       = "Title";
const SORTING_NEW_ADDS    = "Recently Added";
const SORTING_CHEATTYPES  = "CheatTypes";
const SORTING_AUTHOR      = "Developer";

const SORTING_DEFAULT = SORTING_TITLE;

const SORT_OPTIONS = [
    SORTING_TITLE,  // Default sorting type
    SORTING_NEW_ADDS,
    SORTING_CHEATTYPES,
    SORTING_AUTHOR];


const FILTER_ALL = "All"

// Main list of gallery items
var galleryArray;
var gallerySorting = SORTING_DEFAULT;
