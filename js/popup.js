
function popupShow(titleHTML, bodyHTML) {

    const backdrop = document.getElementById('modalBackdrop');
    
    const popup_header = document.getElementById('popup_header');
    const poup_body    = document.getElementById('popup_body');

    popup_header.innerHTML = titleHTML;
    popup_body.innerHTML   = bodyHTML;

    backdrop.classList.add('active');
}


function popupInit() {

    //const openBtn = document.getElementById('openModalBtn');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = backdrop.querySelector('.modal-close');
    const dialog = backdrop.querySelector('.modal-dialog');

    // openBtn.addEventListener('click', () => {
    //     backdrop.classList.add('active');
    // });

    closeBtn.addEventListener('click', () => {
        backdrop.classList.remove('active');
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            backdrop.classList.remove('active');
        }
    });
}

