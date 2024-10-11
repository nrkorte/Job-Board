$(document).on('click', '.section-link', function(e) {
    e.preventDefault();
    const section = $(this).data('section');

    $('#formFields').empty();

    switch (section) {
        case "general":
            $('#formFields').append(`
                <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="Enter your first name" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Enter your last name" required>
                        </div>
                        <div class="form-group">
                            <label for="birthday">Birthday</label>
                            <input type="date" class="form-control" id="birthday" required>
                        </div>
                        <div class="form-group">
                            <label for="addressLine1">Address Line 1</label>
                            <input type="text" class="form-control" id="addressLine1" placeholder="Enter your address" required>
                        </div>
                        <div class="form-group">
                            <label for="addressLine2">Address Line 2 (optional)</label>
                            <input type="text" class="form-control" id="addressLine2" placeholder="Enter additional address details">
                        </div>
                        <div class="form-group">
                            <label for="town">Town</label>
                            <input type="text" class="form-control" id="town" placeholder="Enter your town" required>
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <input type="text" class="form-control" id="state" placeholder="Enter your state" required>
                        </div>
                        <div class="form-group">
                            <label for="zip">Zip Code</label>
                            <input type="text" class="form-control" id="zip" placeholder="Enter your zip code" required>
                        </div>
                        <div class="form-group">
                            <label for="zipPlus4">Zip+4 (optional)</label>
                            <input type="text" class="form-control" id="zipPlus4" placeholder="Enter your zip+4 code">
                        </div>`
                    );
            break;
        case "education":
            $('#formFields').append(`
<div class="form-group">
    <label for="schoolName">School Name</label>
    <input type="text" class="form-control" id="schoolName" placeholder="Colorado State University" required>
</div>
<div class="form-group">
    <label for="startDate">Start Date</label>
    <input type="month" class="form-control" id="startDate" required>
</div>
<div class="form-group">
    <label for="endDate">End Date (Completed or Expected)</label>
    <input type="month" class="form-control" id="endDate" required>
</div>
<div class="form-group">
    <label for="degreeAchieved">Degree Achieved</label>
    <select class="form-control" id="degreeAchieved" required>
        <option value="">Select a degree</option>
        <option value="high_school">High School / GED Equivalent</option>
        <option value="some_college">Some College</option>
        <option value="bachelor">Bachelors</option>
        <option value="bachelor">Associates</option>
        <option value="masters">Masters</option>
        <option value="phd">PhD</option>
    </select>
</div>
<div class="form-group">
    <label for="major">Major / Field of Study</label>
    <input type="text" class="form-control" id="major" placeholder="Computer Science" required>
</div>
<div class="form-group">
    <label for="secondMajor">Second Major (optional)</label>
    <input type="text" class="form-control" id="secondMajor" placeholder="Business Ethics">
</div>
<div class="form-group">
    <label for="minor">Minor(s) [Delimit each by a comma and space]</label>
    <input type="text" class="form-control" id="minor" placeholder="Communications, Psychology">
</div>
<div class="form-group">
    <label for="gpa">GPA [4.0 Scale]</label>
    <input type="number" class="form-control" id="gpa" required>
</div>
                `);
            break;
        case "experience":
            console.log("experience");
            break;
        case "skills":
            console.log("skills");
            break;
        case "certifications":
            console.log("certifications");
            break;            
        case "identity":
            console.log("identity");
            break;
    }
});