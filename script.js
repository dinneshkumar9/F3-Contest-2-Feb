// Function 1: getMenu()
function getMenu() {
  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.getElementById("menu-container");
      const items = Object.values(data); // Convert JSON object to array


      // Add each item to the container
      items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
            <img class="item-img" src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.dsc}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Rating: ${item.rate}</p>
            <p>Location: ${item.country}</p>
          
        `;
         
        menuContainer.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error fetching menu:", error);
    });
}


// Call the getMenu() function when the screen loads
window.onload = getMenu;

// Function 2: takeOrder()
function takeOrder() {
  const burgers = ["Cheeseburger", "Double Cheeseburger", "Bacon Cheeseburger", "Mushroom Swiss Burger", "Jalapeno Burger"];
  const order = {};

  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const burger = burgers[Math.floor(Math.random() * burgers.length)];
        order[burger] = order[burger] ? order[burger] + 1 : 1;
      }
      resolve(order);
    }, 2500);
  });
}

// Function 3: orderPrep()
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderStatus = true;
      const paid = false;
      const order = { orderStatus, paid };
      resolve(order);
    }, 1500);
  });
}

// Function 4: payOrder()
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderStatus = true;
      const paid = true;
      const order = { orderStatus, paid };
      resolve(order);
    }, 1000);
  });
}

// Function 5: thankyouFnc()
function thankyouFnc() {
  alert("Thank you for your payment!");
}

// Usage example:
takeOrder()
  .then((order) => {
    console.log("Order placed:", order);
    return orderPrep();
  })
  .then((order) => {
    console.log("Order preparation status:", order);
    return payOrder();
  })
  .then((order) => {
    console.log("Order payment status:", order);
    if (order.paid) {
      thankyouFnc();
    }
  })
  .catch((error) => {
    console.error(error);
  });
