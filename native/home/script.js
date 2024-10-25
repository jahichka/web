window.onload = fetchSubjects();

function fetchSubjects() {
    fetch("http://192.168.35.215:8080/classes?id=11")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const classesContainer = document.getElementById("classes");

            for (let i = 0; i < response.length; i++) {
                const { id, className, professorID, description } = response[i];
                const newClass = document.createElement("a");
                newClass.className = "item";
                newClass.id = id;
                newClass.innerHTML = className;

                // Add an event listener to handle the click event
                newClass.addEventListener('click', () => {
                    document.getElementById('lections').innerHTML = ''
                    document.getElementById('instructions').innerHTML = ''
                    document.getElementById('test').innerHTML = ''
                    const items = document.querySelectorAll('.item');
                    items.forEach(item => item.classList.remove('active'));
                    newClass.classList.add('active');
                    fetchVideos(id);
                });

                classesContainer.appendChild(newClass);
            }

            // Append the "Literatura" element with the "GetLiterature" onclick function
            const literatureElement = document.createElement("a");
            literatureElement.className = "item";
            literatureElement.innerHTML = "Literatura";

            literatureElement.addEventListener('click', () => {
                document.getElementById('lections').innerHTML = ''
                document.getElementById('instructions').innerHTML = ''
                document.getElementById('test').innerHTML = ''
                const items = document.querySelectorAll('.item');
                items.forEach(item => item.classList.remove('active'));
                literatureElement.classList.add('active');
                GetLiterature(); // Call the GetLiterature function when clicked
            });

            classesContainer.appendChild(literatureElement);
        });
}

function GetLiterature() {
    // Replace the URL with the actual API endpoint that provides the literature data
    fetch("http://localhost:8080/books")
        .then(response => response.json())
        .then(data => {
            const instructionsDiv = document.getElementById("instructions");

            // Clear the existing content in the instructions div
            instructionsDiv.innerHTML = "";

            // Loop through the retrieved data and create elements for each item
            data.forEach(item => {
                const literatureItem = document.createElement("div");
                literatureItem.className = "ui raised segments";
                literatureItem.style.width = "500px"; // Set a static width of 500px
                literatureItem.style.height = "70px"; // Adjust the height to make it very thin
                literatureItem.style.overflow = "hidden"; // Hide any overflowing content
                literatureItem.style.whiteSpace = "nowrap"; // Prevent text from wrapping
                literatureItem.style.textOverflow = "ellipsis"; // Add ellipsis (...) for trimmed text

                const content = `
                    <div class="ui segment" style="width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center;">
                        <div style="width: 80%;">
                            <p>Filename: ${item.filename}</p>
                            <p>Uploader: ${item.uploader}</p>
                        </div>
                        <a href="http://localhost:8080/books/download?name=${item.filename}" class="ui button download-button" download>Download</a>
                    </div>
                `;

                literatureItem.innerHTML = content;
                instructionsDiv.appendChild(literatureItem);
            });
        })
        .catch(error => {
            console.error("Error fetching literature data: " + error);
        });
}







function fetchVideos(classId) {
    // Make an API call to fetch lecture videos for the specified class ID
    fetch(`http://192.168.35.215:8080/lections?id=${classId}`)
        .then(response => response.json())
        .then(response => {
            const contentArea = document.getElementById('lections');
            contentArea.innerHTML = ''; // Clear the content
            const lectureDiv = document.createElement('div');
            lectureDiv.className = "col-sm";
            for (const lecture of response) {
                const { id, lectionNum, url } = lecture;
                lectureDiv.innerHTML += `
                <div class="ui card" onclick="showClass(${classId})">
                    <div class="content">
                        <div class="header">Lekcija ${lectionNum}</div>
                            <div class="meta">
                            <span>2 days ago</span>
                            <a></a>
                        </div>
                    <p></p>
                    </div>
                </div>`;
            }
            contentArea.appendChild(lectureDiv);
        });
}


function fetchInstructions(classId) {
    // Make an API call to fetch lecture videos for the specified class ID
    fetch(`http://192.168.35.215:8080/lections?id=${classId}`)
        .then(response => response.json())
        .then(response => {
            const contentArea = document.getElementById('instructions');
            const lectureDiv = document.createElement('div');
            lectureDiv.className = "col-sm"
            for (const lecture of response) {
                const { id, url } = lecture;
                lectureDiv.innerHTML += `
                <div class="ui raised segments" style="width: 300px; height: 245px;">
                    <div class="ui segment" style="width: 300px; height: 195px;">
                        <img src="https://d3mxt5v3yxgcsr.cloudfront.net/courses/1948/course_1948_image.png" style="max-width: 100%; max-heigh: 100%;">
                    </div>
                    <div class="ui secondary segment" style="width: 300px; height: 50px;">
                        <h3>Instrukcije ${lecture.id - 6}</h3>
                    </div>
                </div>`;
            }
            contentArea.appendChild(lectureDiv);
        });
}

function fetchTest(id) {
    fetch(`http://192.168.35.215:8080/test?id=${id}`)
        .then(response => response.json())
        .then(response => {
            const testdiv = document.getElementById('test');
            // console.log(response.question[0])
            testdiv.innerHTML = `
            <form class="ui form">
                <div class="field">
                    <label>${response.question[0]}</label>
                    <input type="text" name="answer0">
                </div>
                <div class="field">
                    <label>${response.question[1]}</label>
                    <input type="text" name="answer1">
                </div>
                <div class="field">
                    <label>${response.question[2]}</label>
                    <input type="text" name="answer2">
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>`
        })
        .catch(error => console.error(error))
}




function showClass(id) {
    fetchInstructions(id);
    fetchTest(7);
}