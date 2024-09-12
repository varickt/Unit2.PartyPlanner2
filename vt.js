const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2407-FTB-ET-WEB-PT/events';
const partyList = document.getElementById('partyList');
const partyForm = document.getElementById('partyForm');

// Fetch and display parties
async function fetchParties() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const parties = await response.json();
    displayParties(parties);
  } catch (error) {
    console.error('Error fetching parties:', error);
  }
}

// Display parties on the page
function displayParties(parties) {
  partyList.innerHTML = '';
  parties.forEach(party => {
    const partyItem = document.createElement('li');
    partyItem.classList.add('party-item');
    partyItem.innerHTML = `
      <strong>${party.name}</strong><br />
      ${party.date} ${party.time}<br />
      Location: ${party.location}<br />
      ${party.description}<br />
      <button class="delete-btn" data-id="${party.id}">Delete</button>
    `;
    partyList.appendChild(partyItem);

    // Add delete functionality
    partyItem.querySelector('.delete-btn').addEventListener('click', async () => {
      await deleteParty(party.id);
    });
  });
}

// Delete a party
async function deleteParty(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    fetchParties(); // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting party:', error);
  }
}

// Add a new party
partyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newParty = {
    name: document.getElementById('partyName').value,
    date: document.getElementById('partyDate').value,
    time: document.getElementById('partyTime').value,
    location: document.getElementById('partyLocation').value,
    description: document.getElementById('partyDescription').value,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newParty),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    partyForm.reset(); // Clear the form
    fetchParties(); // Refresh the list with the new party
  } catch (error) {
    console.error('Error adding party:', error);
  }
});

// Initial fetch of parties
fetchParties();
