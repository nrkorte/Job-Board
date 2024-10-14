function addSkill(skill, skillsListElement) {
    const skillItem = document.createElement('div');
    skillItem.classList.add('deletable');
    skillItem.textContent = skill;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', function() {
        skillItem.remove();
    });
    skillItem.appendChild(deleteButton);

    skillsListElement.appendChild(skillItem);
}

function handleSkillInputKeyPress(e, skillsListElement) {
    if (e.key === 'Enter') {
        e.preventDefault();

        const skillInput = e.target;
        const skill = skillInput.value.trim();

        if (skill) {
            addSkill(skill, skillsListElement);
            skillInput.value = '';
        }
    }
}

function processSkills(hiddenInputElement, forward) {
    if (forward) {
        const skillItems = document.querySelectorAll('.deletable');
        skillItems.forEach(skillItem => {
            const skill = skillItem.textContent;
            // add logic to add to a hidden input passed through a parameter here
            hiddenInputElement.value += skill + ',';
        });
    }
}

const skillsList = document.getElementById('skillsList');

skillInput.addEventListener('keypress', function(e) {
    handleSkillInputKeyPress(e, skillsList);
});