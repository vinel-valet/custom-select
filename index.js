const button = document.querySelector('.container-search-line');
const containerSelects = document.querySelector('.container-selects');
const counter = document.querySelector('.counter');
const selectedItems = document.querySelector('.selected-items');
const allCheckbox = document.querySelectorAll('.item-to-choose');

button.addEventListener('click', () => {
    containerSelects.classList.toggle('hide-container-selects');
});

function updateCounter() {
    const allChecked = document.querySelectorAll('input[type="checkbox"]:checked');
    counter.textContent = allChecked.length;

    if (allChecked.length) {
        counter.classList.remove('hide-counter');
        selectedItems.classList.remove('hide-selected-items');
    } else {
        counter.classList.add('hide-counter');
        selectedItems.classList.add('hide-selected-items');
    }
}

for (const checkbox of allCheckbox) {
    checkbox.addEventListener('change', () => {
        selectedItems.innerHTML = '';
        const allChecked = document.querySelectorAll('input[type="checkbox"]:checked');

        for (const checked of allChecked) {
            let elemDiv = document.createElement('div');
            elemDiv.classList.add('selected-item');
            elemDiv.setAttribute('data-checkbox-id', checked.id);
            elemDiv.innerHTML = `<p>${checked.value}</p>
            <svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.91235 4L11.9128 12.0004M12.0843 4L4.08392 12.0004" stroke="#07000F" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

            selectedItems.appendChild(elemDiv);

            const removeIcon = elemDiv.querySelector('.remove-icon');
            removeIcon.addEventListener('click', () => {
                const checkboxId = elemDiv.getAttribute('data-checkbox-id');
                const correspondingCheckbox = document.getElementById(checkboxId);
                elemDiv.remove();
                correspondingCheckbox.checked = false;
                updateCounter();
            });
        }

        updateCounter();
    });
}