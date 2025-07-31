
// Update url params with current filter settings
function urlSetFilters() {

    // Get current URL, update the params and then use it to replace the current url
    let url = new URL(window.location);
    let prevHref = url.href;  // Save current href for detecting change and so triggering a new nav state entry

    url.searchParams.set('consoleTags',   document.getElementById('consoleTagsFilter').value);
    url.searchParams.set('cheatTypeTags', document.getElementById('cheatTypeTagsFilter').value);
    url.searchParams.set('textSearch',    document.getElementById('textSearch').value);
    url.searchParams.set('sortSelector',  document.getElementById('sortSelector').value);

    // If the URL changed (meaning filters changed then create a navigation state before applying the update
    if (url.href !== prevHref) {
        window.history.pushState( null, window.title, window.location );
    }

    // Now apply the updated url to the window
    window.history.replaceState(null, "", url.href);
}

// Read filter settings from url params
function urlGetFilters() {
    // Get current URL, update the params and then use it to replace the current url
    let url = new URL(window.location);

    if (url.searchParams.get('consoleTags')   !== null) document.getElementById('consoleTagsFilter').value   = url.searchParams.get('consoleTags');
    if (url.searchParams.get('cheatTypeTags') !== null) document.getElementById('cheatTypeTagsFilter').value = url.searchParams.get('cheatTypeTags');
    if (url.searchParams.get('textSearch')    !== null) document.getElementById('textSearch').value   = url.searchParams.get('textSearch');
    if (url.searchParams.get('sortSelector')  !== null) document.getElementById('sortSelector').value = url.searchParams.get('sortSelector');
}

// Reset all filters to defaults
function resetFilters() {
    document.getElementById('consoleTagsFilter').value = FILTER_ALL;
    document.getElementById('cheatTypeTagsFilter').value = FILTER_ALL;
    document.getElementById('textSearch').value = '';
    document.getElementById('sortSelector').value = SORTING_DEFAULT;
}



function namedFilterAll(descripText) {
    return "<option selected value=\"" + FILTER_ALL + "\">" + FILTER_ALL + " " + descripText + "</option>";
}

// Create filter entries based on attributes of all gallery items
function populateFilters(galleryItems) {
    const consoleTagsSet = new Set();
    const cheatTypeTagsSet = new Set();

    // Parse the JSON gallery entries and extract tags from them
    galleryItems.forEach(item => {
        if (item.consoleTags) item.consoleTags.split(', ').forEach(tag => consoleTagsSet.add(tag));
        if (item.cheatTypeTags) item.cheatTypeTags.split(', ').forEach(tag => cheatTypeTagsSet.add(tag));
    });

    // Now sort and create filter option item entries for each tag per type in html form
    const consoleTagsOptions = Array.from(consoleTagsSet).map(tag => `<option value="${tag}">${tag}</option>`).sort().join('');
    const cheatTypeTagsOptions = Array.from(cheatTypeTagsSet).map(tag => `<option value="${tag}">${tag}</option>`).sort().join('');

    // And attach them to the multi-select controls
    document.getElementById('consoleTagsFilter').innerHTML   = namedFilterAll("Platforms") + consoleTagsOptions;
    document.getElementById('cheatTypeTagsFilter').innerHTML = namedFilterAll("Cheat Types") + cheatTypeTagsOptions;

    // Sorting options
    const sortOptions = SORT_OPTIONS.map(sortType => `<option value="${sortType}">${sortType}</option>`).join('');
    document.getElementById('sortSelector').innerHTML = sortOptions;
}


// Check for a given gallery item if it's tags of type N are enabled by the matching multi-select filter
function checkMultiSelectFilter(filterName, filterTagsSelected, item) {
    var isEnabled = true;

    // Check if "ALL" is selected
    if (filterTagsSelected.some(value => value === FILTER_ALL)) return true;

    if (item.dataset.hasOwnProperty(filterName)) {
        isEnabled = false;

        // Extract all tags from the item
        item.dataset[filterName].split(', ').forEach(tag => {
            // Check if any of the item tags is enabled as a selection in the Filter
            if (filterTagsSelected.some(value => value === tag)) isEnabled = true;
        });
    }
    return isEnabled;
}


// Update displayed items based on their metadata and the filters
function applyFilters() {

    // If sorting changed then update sort method and do a reload
    if (gallerySorting !== document.getElementById('sortSelector').value) {
        gallerySorting = document.getElementById('sortSelector').value;

        removeAllGalleryItems();
        addAndSortGalleryItems();
    }

    const consoleTagsSelected   = Array.from(document.getElementById('consoleTagsFilter').selectedOptions).map(option => option.value);
    const cheatTypeTagsSelected = Array.from(document.getElementById('cheatTypeTagsFilter').selectedOptions).map(option => option.value);
    const textSearchMatch   = document.getElementById('textSearch').value;
    const items = document.querySelectorAll('.gallery_grid_item');

    // TODO: ? Convert filters from arrays to simple compares now that they are single-select instead of multi-select

    // Check whether each item is enabled based on the filters
    let matchCount = 0;
    items.forEach(item => {
        let consoleTagsNoMatch   = !checkMultiSelectFilter('consoleTags', consoleTagsSelected, item);
        let cheatTypeTagsNoMatch = !checkMultiSelectFilter('cheatTypeTags', cheatTypeTagsSelected, item);

        if ((textSearchMatch   !== '')
                 && (item.dataset['gameTitle'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 && (item.dataset['developer'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 && (item.dataset['cheatEffect'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 ) item.style.display = 'none';
        else if (consoleTagsNoMatch || cheatTypeTagsNoMatch) item.style.display = 'none';
        else {
            // Otherwise ok to show item
            item.style.display = ''; matchCount += 1;
        }
    });

    // Show number of results found
    document.getElementById('numFoundResult').textContent = matchCount;

    // Update the URL params to match the new search criteria
    urlSetFilters();
}


function addFilterUpdateHooks() {
    // Event listener to handle filter changes
    // Filter settings
    document.querySelectorAll('.filter_container select, input, #sortSelector').forEach(filter => {
        filter.addEventListener('change', () => {
            applyFilters();
        });
        // Update search as the user types in the text field
        filter.addEventListener('input', () => {
            applyFilters();
        });
    });

    // Reset Filters button
    let elResetButton = document.querySelector('#resetFilterButton');
    elResetButton.addEventListener('click', () => {
            resetFilters();
            applyFilters();
        });

    // Copy Link Filters button
    let elCopyLinkButton = document.querySelector('#copyLinkFilterButton');
    elCopyLinkButton.addEventListener('click', () => {
            copyTextToClipboard(window.location.href);
        });

    // What's New button
    let elWhatsNewButton = document.querySelector('#whatsNewButton');
    elWhatsNewButton.addEventListener('click', () => {
            document.getElementById('sortSelector').value = "Recently Added";
            applyFilters();
        });
}

function attachClickFilter(element, filter_element_id, filtervalue) {
    element.addEventListener('click', () => {
            let elFilter = document.getElementById(filter_element_id);
            if (elFilter.type && elFilter.type === 'checkbox')
                elFilter.checked = filtervalue;
            else
                elFilter.value = filtervalue;
            applyFilters();
            return false;
        });
}