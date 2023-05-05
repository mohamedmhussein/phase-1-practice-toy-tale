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

  //Get the toys info and add it to the page
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys =>{
    toys.forEach(toy => getOneToy(toy))
  })

  //Add a new toy and Post the new toy to the server
  document.querySelector(".add-toy-form").addEventListener("submit", handlesubmit)
  
  //update the number of likes




  //handlesubmit
  function handlesubmit(event){
    event.preventDefault()
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    getOneToy(newToy)
    addToyToServer(newToy)
  }
  function addToyToServer(toy){
    let postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Accept: "application/json"
      },
      body: JSON.stringify(toy)
    }
    fetch("http://localhost:3000/toys",postRequest)
    .then(res => res.json())
    .then(toy => {})
  }





  //Uploading one toy
  function getOneToy(toy){
    let toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCard.innerHTML=`
    <h2>${toy.name}</h2>
    <img src= ${toy.image} class = "toy-avatar" />
    <p> ${toy.likes} Likes</p>
    <button class = "like-btn" id =${toy.id}>Like ❤️</button>
    `
    toyCard.querySelector(".like-btn").addEventListener('click', event => {
      toy.likes += 1
      toyCard.querySelector('p').textContent = `${toy.likes} Likes`
      updateLikes(toy)
    })

    document.querySelector('body').appendChild(toyCard)
    
  }

  function updateLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then (toy => console.log(toy))
  }

});
