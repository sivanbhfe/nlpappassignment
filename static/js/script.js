let relationships = [];

function addrelationship() {
    var fentity = document.getElementById('firstentity').value;
    var relationship = document.getElementById('relationship').value;
    var sentity = document.getElementById('secondentity').value;

    // Add the new relationship to the relationships array
    relationships.push({ fentity: fentity, relationship: relationship, sentity: sentity });

    // Post the relationships to the backend
    fetch('http://127.0.0.1:5000/addrelationship', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(relationships)
    })
        .then(response => response.blob())
        .then(blob => {
            // Display the updated graph
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            const container = document.getElementById("knowledgegraphdisplayarea");
            container.innerHTML = "";
            container.appendChild(imageElement);
        });

    // Update the relationships table
    const table = document.getElementById("knowledgegraphtable");
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = fentity;
    cell2.innerHTML = relationship;
    cell3.innerHTML = sentity;
}
