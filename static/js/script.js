let people = [];
let relations = [];

function changeContent(page) {
    var maincontentDiv = document.getElementById('maincontent');
    var addrelationshipsDiv = document.getElementById('addrelationships');
    var editpageDiv = document.getElementById('editpage');
    switch (page) {
        case 'home':
            maincontentDiv.innerHTML = '<h1>Add, Edit and View Knowledge Graph</h1>';
            addrelationshipsDiv.style.display = 'block';
            editpageDiv.style.display = 'none';
            populateSelectors();
            break;
        case 'edit':
            maincontentDiv.innerHTML = '';
            addrelationshipsDiv.style.display = 'none';
            editpageDiv.style.display = 'block';
            break;
        case 'relations':
            maincontentDiv.innerHTML = '<h1>Displaying Relationship Table</h1>';
            break;
        default:
            maincontentDiv.innerHTML = '<h2>Page not found!</h2>';
    }
}

function addPerson() {
    var personName = document.getElementById('personName').value;
    var designation = document.getElementById('designation').value;

    if (personName && designation) {
        people.push({ name: personName, designation: designation });
        var peopleList = document.getElementById('peopleList');
        var listItem = document.createElement('li');
        listItem.textContent = `${personName} - ${designation}`;
        peopleList.appendChild(listItem);

        // Clear the input fields
        document.getElementById('personName').value = '';
        document.getElementById('designation').value = '';
    }
}

function addRelation() {
    var relationName = document.getElementById('relationName').value;
    var relationType = document.getElementById('relationType').value;

    if (relationName && relationType) {
        relations.push({ name: relationName, type: relationType });
        var relationsList = document.getElementById('relationsList');
        var listItem = document.createElement('li');
        listItem.textContent = `${relationName} (${relationType})`;
        relationsList.appendChild(listItem);

        // Clear the input fields
        document.getElementById('relationName').value = '';
    }
}

function populateSelectors() {
    var firstEntitySelect = document.getElementById('firstentity');
    var secondEntitySelect = document.getElementById('secondentity');
    var relationshipSelect = document.getElementById('relationship');

    firstEntitySelect.innerHTML = '';
    secondEntitySelect.innerHTML = '';
    relationshipSelect.innerHTML = '';

    people.forEach(person => {
        var option1 = document.createElement('option');
        option1.value = person.name;
        option1.text = person.name;
        firstEntitySelect.appendChild(option1);

        var option2 = document.createElement('option');
        option2.value = person.name;
        option2.text = person.name;
        secondEntitySelect.appendChild(option2);
    });

    relations.forEach(relation => {
        var option = document.createElement('option');
        option.value = relation.name;
        option.text = relation.name;
        relationshipSelect.appendChild(option);
    });
}

var Str_txt = [];

function addrelationship() {
    var fentity = document.getElementById('firstentity').value;
    var relationship = document.getElementById('relationship').value;
    var sentity = document.getElementById('secondentity').value;
    Str_txt.push({ fentity: fentity, relationship: relationship, sentity: sentity });
    stringifiedlist = JSON.stringify(Str_txt);
    console.log(Str_txt);

    const response = fetch('http://127.0.0.1:5000/addrelationship', {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(stringifiedlist)
    }).then((response) => response.blob())
        .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            const container = document.getElementById("knowledgegraphdisplayarea");
            container.innerHTML = "";
            container.appendChild(imageElement);
        });

    const containertable = document.getElementById("knowledgegraphtable");
    var out = '';
    for (let items of Str_txt) {
        out += `
        <tr>
            <td>${items.fentity}</td>
            <td>${items.relationship}</td>
            <td>${items.sentity}</td>
        </tr>`;
    }
    formatted = '<tr><th>First Entity</th><th>Relationship</th><th>Second Entity</th></tr>';
    formatted += out;
    containertable.innerHTML = formatted;
}
