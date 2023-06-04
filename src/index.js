let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const container = document.getElementById('toy-collection')

// Implementing the get request functionality
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then( res => res.json() )
    .then( toys => toys.forEach(renderToy))
})

//Performing post request
const form = document.querySelector('.add-toy-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const newToy = {
    "name": e.target.name.value,
    "image": e.target.image.value,
    "likes": 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then( res => res.json() )
    .then( toy => renderToy(toy))

})

// Rendering the toy card
function renderToy(element) {
  const imageCard = document.createElement('div')
  imageCard.setAttribute('class', 'card')

  const name = document.createElement('h2')
  name.textContent = element.name

  const likes = document.createElement('p')
  likes.textContent = `${element.likes} likes`

  const btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', element.id)
  btn.textContent = 'like'
  btn.addEventListener('click', () => {
    element.likes += 1
    likes.textContent = `${element.likes} likes` 
    updateLikes(element)
  })

  const img = document.createElement('img')
  img.setAttribute('src', element.image)
  img.setAttribute('class', 'toy-avatar')

  imageCard.append(name, img, likes, btn)
  container.appendChild(imageCard)
}

// Performing patch request
const updateLikes = (toy) => {
  // console.log(id)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then( res => res.json() )
    // .then( likes => renderToy(likes) )
}