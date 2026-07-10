async function loadStudents() {

    try {

        const response = await fetch("http://localhost:5001/api/students");

        const students = await response.json();

        let html = "<h2>Students</h2>";

        students.forEach(student => {

            html += `
                <div style="margin-bottom:20px;">
                    <b>${student.name}</b><br>
                    ${student.department}
                </div>
            `;

        });

        document.getElementById("students").innerHTML = html;

    } catch (error) {

        document.getElementById("students").innerHTML =
            "<h2>Cannot connect to backend.</h2>";

    }

}