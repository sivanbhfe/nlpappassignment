function changeContent(page) {
	var maincontentDiv = document.getElementById('maincontent')
	switch (page) {
		case 'home':
			maincontentDiv.innerHTML = '<h1>Add, Edit and View Knowledge Graph</h1>'
			break;
		case 'relations':
			maincontentDiv.innerHTML ='<h1>Displaying Relationship Table</h1>'
			break;
		default:
			maincontentDiv.innerHTML = '<h2>Page not found!</h2>';
	}
}

function getjson() {

	var contentDiv = document.getElementById('knowledgegraph');
	const url = 'http://127.0.0.1:5000/home/10'
    const response = fetch(url)
		.then((response) => {return response.json();})
		.then((data) => 
		{let authors = data;
		contentDiv.innerHTML = authors.data;
		});

}


function addrelationship() {

	var fentity = document.getElementById('firstentity').value;
	var relationship = document.getElementById('relationship').value;
	var sentity = document.getElementById('secondentity').value;
	console.log(fentity, relationship,sentity)
	const input = {fen : fentity, relation: relationship, sen: sentity}

		// a POST request
	const response = fetch('http://127.0.0.1:5000/addrelationship', {
	method: 'POST',
	contentType: 'application/json',
	body: JSON.stringify(input)
	}).then((response) => response.blob())
  .then((blob) => {
    const imageUrl = URL.createObjectURL(blob);
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    const container = document.getElementById("knowledgegraphdisplayarea");
	container.innerHTML=""
    container.appendChild(imageElement);
  });

}
var Str_txt=[]
function addrelationship() {

	var fentity = document.getElementById('firstentity').value;
	var relationship = document.getElementById('relationship').value;
	var sentity = document.getElementById('secondentity').value;
	Str_txt.push({"fentity":fentity,"relationship":relationship,"sentity":sentity});
	stringifiedlist = JSON.stringify(Str_txt);
	console.log(Str_txt)
			// a POST request
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
	container.innerHTML=""
    container.appendChild(imageElement);
	  });
	  
	  
	const containertable = document.getElementById("knowledgegraphtable");
	var out=''
	for(let items of Str_txt){
      out += `
	          <tr>
            <td>${items.fentity}</td>
            <td>${items.relationship}</td>
            <td>${items.sentity}</td>
         </tr>
	      `;
   }
	formatted = '<tr><th>First Entity</th><th>Relationship</th><th>Second Entity</th></tr>';
	formatted  += out;
   containertable.innerHTML = formatted;
}
