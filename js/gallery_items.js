
function removeAllGalleryItems() {
    const items = document.querySelectorAll('.gallery_grid_item');
    items.forEach(item => {
        item.remove();
    });
}


function addAndSortGalleryItems() {
    // Sort items and generate filters
    galleryArray = sortData(galleryArray);

    // Render the gallery into the DOM
    createGalleryItems(galleryArray);
}


// Convert gallery items to DOM elements
function createGalleryItems(galleryItems) {
    const container = document.getElementById('gallery_grid');
    galleryItems.forEach(item => {

        // Create main div for each item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery_grid_item';

        // Create inner div for item details
        const itemContainer = document.createElement('div');
        itemContainer.className = 'itemContainer';


        // Item Title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'gameTitle';
        titleDiv.textContent = item.gameTitle;
        itemContainer.appendChild(titleDiv);

        // Developer Name(s)
        const developerDiv = document.createElement('div');
        developerDiv.className   = 'developer';
        developerDiv.textContent = item.developer;
        itemContainer.appendChild(developerDiv);

        // Short Description of Cheat Effect
        const cheatEffectDiv = document.createElement('div');
        cheatEffectDiv.className = 'cheatEffect';
        cheatEffectDiv.textContent = item.cheatEffect;
        itemContainer.appendChild(cheatEffectDiv);


        // inputSequence
        const inputSequenceDiv = document.createElement('div');
        inputSequenceDiv.className   = 'inputSequence';
        inputSequenceDiv.textContent = item.inputSequence;
        itemContainer.appendChild(inputSequenceDiv);

        // whenToInput
        const whenToInputDiv = document.createElement('div');
        whenToInputDiv.className   = 'whenToInput';
        whenToInputDiv.textContent = item.whenToInput;
        itemContainer.appendChild(whenToInputDiv);

        // activationIndicator
        const activationIndicatorDiv = document.createElement('div');
        activationIndicatorDiv.className   = 'activationIndicator';
        activationIndicatorDiv.textContent = item.activationIndicator;
        itemContainer.appendChild(activationIndicatorDiv);


        // Add Meta info footer with text cards
        const metaDiv = document.createElement('div');
        metaDiv.className = 'itemMeta';
        // Attach the cards
        item.consoleTags.split(', ').forEach(tag => {
            attachClickFilter( appendSpan(tag,  "itemMetaConsoles",    metaDiv), "consoleTagsFilter", tag);
        });
        item.cheatTypeTags.split(', ').forEach(tag => {
            attachClickFilter( appendSpan(tag,  "itemMetaCheatTypes",    metaDiv), "cheatTypeTagsFilter", tag);
        });

        itemContainer.appendChild(metaDiv);


        // Attach metadata to entries
        const tags = ['consoleTags', 'cheatTypeTags'];
        tags.forEach(tag => {
            const tagValue = item[tag];
            //if (tagValue) {
                itemDiv.dataset[tag] = tagValue;
            //}
        });

        itemDiv.dataset["developer"]    = item.developer;
        itemDiv.dataset["gameTitle"]    = item.gameTitle;
        itemDiv.dataset["cheatEffect"]  = item.cheatEffect;

        // Append everything inside the main div
        itemDiv.appendChild(itemContainer);
        container.appendChild(itemDiv);
    });
}

