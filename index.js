document.addEventListener("DOMContentLoaded", () => {

const menu = document.querySelector("#burger-menu")
const orderList = document.querySelector("#order-list")
const customForm = document.querySelector("#custom-burger")
const URL = "http://localhost:3000/burgers"
let burgers = [] // global burgers array

//fetch the burger and add to the dom
fetch(URL)
  .then(function(response) {
    return response.json()
  })//end of the first .then
  .then(function(json) {
    burgers = json //settings the global burger array to the data fetched from the URL
    renderAllBurgers()
  })//end of second .then

function renderOneBurger(burger) {
  menu.innerHTML += `
    <div data-id=${burger.id} class="burger">
      <h3 data-id=${burger.id} class="burger_title">${burger.name}</h3>
        <img data-id=${burger.id} src=${burger.image}>
        <p data-id=${burger.id} class="burger_description">
          ${burger.description}
        </p>
        <button data-id=${burger.id} data-action='add' class="button">Add to Order</button>
        <button data-id=${burger.id} data-action='delete' class="button">Delete 👅</button>
    </div>
  `
}// end of renderOneBurger function

function renderAllBurgers() {
  menu.innerHTML = ""
  burgers.forEach(function(burger) { //does the forEach on the global burgers array
    renderOneBurger(burger)
  })//end of forEach on burgers
}//end of renderAllBurgers function

//when user clicks on the "add to order", the burger name gets added to "your order"
  menu.addEventListener("click", function(e) {
    const id = parseInt(e.target.dataset.id)
    if (e.target.dataset.action === "add") {
      addBurgerToOrder(id)
    } else if (e.target.dataset.action === "delete") {
      deleteBurger(id)
    }//end of if
  })//end of addEventListener

//function to add burger from the menu to the order menu
  function addBurgerToOrder(id) {
    const selectedBurger = burgers.find(function(burger) {
        return burger.id === id
    })//end of find
    let li = document.createElement("li")
    li.innerText = `${selectedBurger.name}`
    li.dataset.id = id
    orderList.append(li)
  }//end of addBurgerToOrder function

//function to delete burger from the menu
  function deleteBurger(id) {
    fetch(`${URL}/${id}`, {
      method: "DELETE"
    })//end of fetch
    const deletedBurger = document.querySelector(`div[data-id="${id}"]`)
    menu.removeChild(deletedBurger)
  }//end of delete burger

customForm.addEventListener("submit", function(e) {
  e.preventDefault()
  const name = e.target.elements.name.value
  const description = e.target.elements.description.value
  const image = e.target.elements.url.value

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      description: description
    })
  })// Close of the Fetch POST
  .then(function(response) {
    return response.json()
  })//end of the first .then
  .then(function(burger) {
    burgers.push(burger)
    const burgerID = burger.id
    renderAllBurgers()
    addBurgerToOrder(burgerID)
  })//end of 2nd then

  e.target.elements.name.value = '' //resets the form area to empty
  e.target.elements.url.value = ''//resets the form area to empty
  e.target.elements.description.value = ''//resets the form area to empty

})//end of customForm event listener








})//end of the DOM Loaded
