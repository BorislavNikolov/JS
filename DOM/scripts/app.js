function getData() {
	let clients = JSON.parse(document.getElementsByTagName('textarea')[0].value);
	let peopleInSection = document.querySelector('#peopleIn p');
	let peopleOutSection = document.querySelector('#peopleOut p');
	let blacklistSection = document.querySelector('#blacklist p');

	let sortCriteria = clients[clients.length - 1]['criteria'];
	let selectedSection = clients[clients.length - 1]['action'];

	clients.pop();

	let peopleInList = [];
	let peopleOutList = [];
	let blacklist = [];

	for (const client of clients) {
		let action = client['action'];
		let firstName = client['firstName'];
		let lastName = client['lastName'];

		let currentPerson = { firstName: firstName, lastName: lastName };

		if (action === 'peopleIn') {
			let personIndex = blacklist.findIndex(p =>
                p.firstName === currentPerson.firstName
                && p.lastName === currentPerson.lastName);

            if (personIndex === -1) {
                peopleInList.push(currentPerson);
            }
		}

		if (action === 'peopleOut' || action === 'blacklist') {
            if (action === 'blacklist') {
                blacklist.push(currentPerson);
            }

            let personIndex = peopleInList.findIndex(p =>
                p.firstName === currentPerson.firstName
                && p.lastName === currentPerson.lastName);

            if (personIndex !== -1) {
                peopleInList.splice(personIndex, 1);
                peopleOutList.push(currentPerson);
            }
        }
	}


	if (sortCriteria === 'firstName' || sortCriteria === 'lastName') {
        if (selectedSection === 'peopleIn') {
            peopleInList.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
        } else if (selectedSection === 'peopleOut') {
            peopleOutList.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
        } else if (selectedSection === 'blacklist') {
            blacklist.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
        }
    }

    peopleInSection.innerHTML = '';
    peopleOutSection.innerHTML = '';
    blacklistSection.innerHTML = '';

	peopleInList.forEach(x => peopleInSection.textContent += JSON.stringify(x) + ' ');
    peopleOutList.forEach(x => peopleOutSection.textContent += JSON.stringify(x) + ' ');
    blacklist.forEach(x => blacklistSection.textContent += JSON.stringify(x) + ' ');
}