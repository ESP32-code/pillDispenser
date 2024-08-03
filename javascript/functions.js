// Save the settings to the Node.js backend
function saveSettings() {
    const schedule = {
        container1: document.getElementById("container1").value,
        container2: document.getElementById("container2").value,
        container3: document.getElementById("container3").value,
        schedule: {
            monday: {
                morning: document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="morning"]').value,
                afternoon: document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="afternoon"]').value,
                noon: document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="noon"]').value,
            },
            // Uncomment and complete for other days if needed
            /*tuesday: {
                morning: document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="morning"]').value,
                afternoon: document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="afternoon"]').value,
                noon: document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="noon"]').value,
            },*/
        }
    };

    fetch('http://localhost:3000/saveSettings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    })
    .then(response => response.text())
    .then(data => {
        alert('Schedule saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving schedule:', error);
    });
}

// Load the settings from the Node.js backend
function loadSettings() {
    fetch('http://localhost:3000/loadSettings')
        .then(response => response.json())
        .then(data => {
            // Provide default structure if data is not as expected
            const schedule = data.schedule || {
                monday: { morning: '', afternoon: '', noon: '' },
                // Initialize other days if needed
            };

            if (data) {
                document.getElementById("container1").value = data.container1 || '';
                document.getElementById("container2").value = data.container2 || '';
                document.getElementById("container3").value = data.container3 || '';

                document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="morning"]').value = schedule.monday.morning || '';
                document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="afternoon"]').value = schedule.monday.afternoon || '';
                document.querySelector('input[placeholder="Enter pills"][data-day="monday"][data-time="noon"]').value = schedule.monday.noon || '';
                
                // Uncomment and complete for other days if needed
                /*document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="morning"]').value = schedule.tuesday.morning || '';
                document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="afternoon"]').value = schedule.tuesday.afternoon || '';
                document.querySelector('input[placeholder="Enter pills"][data-day="tuesday"][data-time="noon"]').value = schedule.tuesday.noon || '';*/
            }
        })
        .catch((error) => {
            console.error('Error loading schedule:', error);
        });
}
