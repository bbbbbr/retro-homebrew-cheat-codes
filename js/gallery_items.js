
function removeAllGalleryItems() {
    const items = document.querySelectorAll('.gallery_tablerow_item');
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


function itemPopup(itemData) {

    const header = itemData.dataset["gameTitle"];
    var content = "";
    content += "Effect: <br>"                + itemData.dataset["cheatEffect"];
    content += "<hr><br>Code: <br>"          + itemData.dataset["inputSequence"];
    content += "<hr><br>When to Input: <br>" + itemData.dataset["whenToInput"];
    content += "<hr><br>Indicator: <br>"     + itemData.dataset["activationIndicator"];

    popupShow(header, content);
}


// Convert gallery items to DOM elements
function createGalleryItems(galleryItems) {
    const containerTable = document.getElementById('data_table');
    galleryItems.forEach(item => {

        // Create main table row for each item
        const itemTableRow = document.createElement('tr');
        itemTableRow.className = 'gallery_tablerow_item';

        // gameTitle
        const titleCell = document.createElement('td');
        titleCell.className = 'gameTitle';
        titleCell.textContent = item.gameTitle;
        titleCell.setAttribute('data-label','Title');
        itemTableRow.appendChild(titleCell);

        // cheatTypeTags
        const cheatTypeTagsCell = document.createElement('td');
        cheatTypeTagsCell.className = 'cheatTypeTags';
        cheatTypeTagsCell.setAttribute('data-label','Type');
            const cheatTypeTagsMetaDiv = document.createElement('div');
            cheatTypeTagsMetaDiv.className = 'itemMeta';
            item.cheatTypeTags.split(', ').forEach(tag => {
                attachClickFilter( appendSpan(tag,  "itemMetaCheatTypes",    cheatTypeTagsMetaDiv), "cheatTypeTagsFilter", tag);
            });
            cheatTypeTagsCell.appendChild(cheatTypeTagsMetaDiv);
        itemTableRow.appendChild(cheatTypeTagsCell);

        // cheatEffect
        const cheatEffectCell = document.createElement('td');
        cheatEffectCell.className = 'cheatEffect';
        cheatEffectCell.textContent = item.cheatEffect;
        cheatEffectCell.setAttribute('data-label','Effect');

        itemTableRow.appendChild(cheatEffectCell);

        // developer
        const developerCell = document.createElement('td');
        developerCell.className = 'developer';
        developerCell.textContent = item.developer;
        developerCell.setAttribute('data-label','Developer');

        itemTableRow.appendChild(developerCell);

        // consoleTags
        const consoleTagsCell = document.createElement('td');
        consoleTagsCell.className = 'consoleTags';
        consoleTagsCell.setAttribute('data-label','Type');
            const consoleTagsmetaDiv = document.createElement('div');
            consoleTagsmetaDiv.className = 'itemMeta';
            item.consoleTags.split(', ').forEach(tag => {
                attachClickFilter( appendSpan(tag,  "itemMetaConsoles",    consoleTagsmetaDiv), "consoleTagsFilter", tag);
            });
            consoleTagsCell.appendChild(consoleTagsmetaDiv);
        itemTableRow.appendChild(consoleTagsCell);

        // Click for details button
        const detailsCell = document.createElement('td');
        detailsCell.className = 'details';
        detailsCell.setAttribute('data-label','details');

            const detailsButton = document.createElement('button');
            detailsButton.className = 'details';
            detailsButton.textContent = "Details";
            detailsCell.appendChild(detailsButton);

            // Attach button click handler to show popup with item data
            detailsButton.onclick = function() { itemPopup(itemTableRow); }

        itemTableRow.appendChild(detailsCell);



        // Attach metadata to entry
        const tags = ['consoleTags', 'cheatTypeTags'];
        tags.forEach(tag => {
            const tagValue = item[tag];
            //if (tagValue) {
                itemTableRow.dataset[tag] = tagValue;
            //}
        });

        itemTableRow.dataset["developer"]    = item.developer;
        itemTableRow.dataset["gameTitle"]    = item.gameTitle;
        itemTableRow.dataset["cheatEffect"]  = item.cheatEffect;

        itemTableRow.dataset["whenToInput"]    = item.whenToInput;
        itemTableRow.dataset["inputSequence"]    = item.inputSequence;
        itemTableRow.dataset["activationIndicator"]  = item.activationIndicator;


        // Attach the row to the table
        containerTable.appendChild(itemTableRow);
    });
}

