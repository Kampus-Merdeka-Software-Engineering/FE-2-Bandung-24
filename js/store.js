// preview modal
let activeModal = null;

document.querySelectorAll('.store-container .store-card').forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault();

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
        const isMobileOrTablet = window.innerWidth <= 1071;

        if (!isTouchDevice && !isMobileOrTablet) {
            let card = btn.getAttribute('data-name');
            let targetModal = document.querySelector(`.modal-container[data-target="${card}"]`);

            if (targetModal) {
                if (activeModal) {
                    activeModal.style.display = 'none';
                }
                targetModal.style.display = 'flex';
                activeModal = targetModal;
            }
        }
    };
});

// close modal
window.onclick = (e) => {
    const isMobileOrTablet = window.innerWidth <= 1071;

    if (e.target === activeModal && !isMobileOrTablet) {
        activeModal.style.display = 'none';
        activeModal = null;
    }
};
