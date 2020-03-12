const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector("#add-cafe-form");

// GET
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        render(doc);
    });
});

// render a database doc to UI
function render(doc) {
    let name = document.createElement('span');
    name.textContent = doc.data().name;

    let city = document.createElement('span');
    city.textContent = doc.data().city;

    let cross = document.createElement('div');
    cross.textContent = 'x';
    cross.addEventListener('click', remove);

    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
}

// REMOVE
function remove(e) {
    e.stopPropagation();
    let parent = e.target.parentElement;
    let id = parent.getAttribute('data-id');
    db.collection('cafes').doc(id).delete().then(() => {
        console.log(`Deleted document with id ${id}`);
    });
}

// PUT
form.addEventListener('submit', (e) => {
    e.preventDefault();  // prevents the page from refreshing
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    }).then(doc => {
        console.log(`wrote data with id ${doc.id}`);
    }).catch(err => {
        console.error('Error adding document: ', error);
    });
    form.name.value = '';
    form.city.value = '';
});