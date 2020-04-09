document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  const burgerUrl = 'http://localhost:3000/burgers'
    fetchBurgers(burgerUrl)
  const burgerMenu = document.querySelector('#burger-menu')
  const orderList = document.querySelector('#order-list')
  const customBurger = document.querySelector('#custom-burger')
  
  burgerMenu.addEventListener('click', (e) =>{
    let li = document.createElement('li')
    let orderedBurger = e.target.parentNode.firstChild.nextElementSibling.textContent
    li.textContent =orderedBurger

    orderList.append(li)
    
  })
  customBurger.addEventListener('submit', (e) =>{
    e.preventDefault()
    let form = e.target
    let name = form.name.value
    let description = form.description.value
    let url = form.url.value
    let burger = {name, url, description}
    renderBurger(burger)
    fetch(burgerUrl,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(burger)
    })
  })

  function renderBurger(burger){
    
      let div = document.createElement('div')
      div.className = 'burger'
      div.innerHTML =`
      <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
      ${burger.description}
      </p>
      <button class="button">Add to Order</button>
      `
      burgerMenu.appendChild(div)
    
  }
  
  function fetchBurgers(url){
    fetch(url)
      .then(res => res.json())
      .then(burgers => {
        burgers.forEach(burger => {
          renderBurger(burger)
        })
      })
  }


})