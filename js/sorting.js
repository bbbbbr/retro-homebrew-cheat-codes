
// Sort the gallery items before display


function sortCheatTypes(galleryItems) {

    galleryItems.sort((a, b) => {
        if      (a.cheatTypeTags < b.cheatTypeTags) return SORT_BEFORE;
        else if (a.cheatTypeTags > b.cheatTypeTags) return SORT_AFTER;

        if      (a.gameTitle < b.gameTitle) return SORT_BEFORE;
        else if (a.gameTitle > b.gameTitle) return SORT_AFTER;

        // Default, no change
        return SORT_NOCHANGE;
    });

    return galleryItems;
}


function sortDateAdded(galleryItems) {

    galleryItems.sort((a, b) => {
        if      (a.dateAdded > b.dateAdded) return SORT_BEFORE;
        else if (a.dateAdded < b.dateAdded) return SORT_AFTER;

        if      (a.gameTitle < b.gameTitle) return SORT_BEFORE;
        else if (a.gameTitle > b.gameTitle) return SORT_AFTER;

        // Default, no change
        return SORT_NOCHANGE;
    });

    return galleryItems;
}


function sortTitle(galleryItems) {

    galleryItems.sort((a, b) => {

        if      (a.gameTitle < b.gameTitle) return SORT_BEFORE;
        else if (a.gameTitle > b.gameTitle) return SORT_AFTER;

        // Default, no change
        return SORT_NOCHANGE;
    });

    return galleryItems;
}


function sortAuthor(galleryItems) {

    galleryItems.sort((a, b) => {

        if      (a.developer < b.developer) return SORT_BEFORE;
        else if (a.developer > b.developer) return SORT_AFTER;

        if      (a.gameTitle < b.gameTitle) return SORT_BEFORE;
        else if (a.gameTitle > b.gameTitle) return SORT_AFTER;

        // Default, no change
        return SORT_NOCHANGE;
    });

    return galleryItems;
}


function sortData(galleryItems) {

    if      (gallerySorting === SORTING_NEW_ADDS)   return sortDateAdded(galleryItems);
    else if (gallerySorting === SORTING_TITLE)      return sortTitle(galleryItems);
    else if (gallerySorting === SORTING_AUTHOR)     return sortAuthor(galleryItems);
    else if (gallerySorting === SORTING_CHEATTYPES) return sortCheatTypes(galleryItems);
    else                                            return sortTitle(galleryItems); // Default is Featured
}



