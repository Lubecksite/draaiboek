function saveObject() {
  // Get the input field values
  var name = document.getElementById("name").value;
  var expiration = document.getElementById("expiration").value;
  var type = document.getElementById("type").value;
  var conditions = document.getElementById("conditions").value;
  var owner = document.getElementById("owner").value;
  var description = document.getElementById("description").value;
  var status = document.getElementById("status").checked;

  // Create an object with the input values
  var object = {
    name: name,
    expiration: expiration,
    type: type,
    conditions: conditions,
    owner: owner,
    description: description,
    status: status,
  };

  // Save the object to the JSON file
  saveObjectToJSON(object);

  // Clear the form fields
  document.getElementById("objectForm").reset();
}

function saveObjectToJSON(object) {
  // Fetch the existing objects from the JSON file (if any)
  fetch("draaiboek.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (objects) {
      // Add the new object to the array
      objects.push(object);

      // Save the updated array to the JSON file
      fetch("draaiboek.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objects),
      });

      // Display the logged objects
      displayObjects(objects);
    });
}

function displayObjects(objects) {
  var container = document.getElementById("objectContainer");
  container.innerHTML = "";

  // Iterate over the objects and create a div for each one
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var div = document.createElement("div");
    div.innerHTML = `
        <h3>${object.name}</h3>
        <p>Expiration: ${object.expiration}</p>
        <p>Type: ${object.type}</p>
        <p>Conditions: ${object.conditions}</p>
        <p>Owner: ${object.owner}</p>
        <p>Description: ${object.description}</p>
        <p>Status: ${object.status ? "True" : "False"}</p>
      `;
    container.appendChild(div);
  }
}

// Load the previously logged objects on page load
window.onload = function () {
  fetch("draaiboek.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (objects) {
      displayObjects(objects);
    });
};
