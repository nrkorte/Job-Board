function updateInputAndSetActive(button, inputId, value, multipleSelect, className) {
    document.getElementById(inputId).value = value;

    if (!multipleSelect) {
        document.querySelectorAll(`.${className}`).forEach(btn => {
            btn.classList.remove('active');
        });
    }

    button.classList.toggle('active');
}

function toggleCheckbox(button, inputId, value, multipleSelect, className) {
    button.classList.toggle('active');

    var input = document.getElementById(inputId);
    if (input.value.includes(value)) {
        input.value = input.value.replace(value + ',', '');
    } else {
        input.value += value + ',';
    }

    if (!multipleSelect) {
        document.querySelectorAll(`.${className}`).forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
    }
}