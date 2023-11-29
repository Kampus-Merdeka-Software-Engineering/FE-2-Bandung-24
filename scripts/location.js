let previewContainer = document.querySelector('.modal-container');
let previewBoxs = previewContainer.querySelectorAll('.modal-preview');

document.querySelectorAll('.location-container .location-card').forEach((btn) => {
    btn.onclick = (e) => {
        previewContainer.style.display = 'flex';
        let card = btn.getAttribute('data-name');
        previewBoxs.forEach(preview => {
            let target = preview.getAttribute('data-target');
            if (card == target) {
                btn.classList.add('active');
            }
        });
        e.preventDefault();
    };
});

// close modal
const modal = document.querySelector('.modal-container');
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}