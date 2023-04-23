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
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(buildCard);
    });
  //add new toy form. POSTs toy to db.json
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (e) => {
    const toyName = e.target.children[1].value;
    const toySrc = e.target.children[3].value;
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: `${toyName}`,
        image: `${toySrc}`,
        likes: 0,
      }),
    });
  });
});
//
//
//modular title card building
//
function buildCard(toy) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <h2> ${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar"/>
  <p>${parseInt(toy.likes)}</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button`;
  document.querySelector("#toy-collection").append(card);
  card.querySelector(".like-btn").addEventListener("click", (e) => {
    toy.likes += 1;
    card.querySelector("p").textContent = toy.likes;
    updateLikes(toy);
  });
}
function updateLikes(param) {
  fetch(`http://localhost:3000/toys/${param.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(param),
  });
}
