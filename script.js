let inputName = document.querySelector("#name");
let category = document.querySelector("#category");
let price = document.querySelector("#price");
let discount = document.querySelector("#discount");
let quantity = document.querySelector("#quantity");
let description = document.querySelector("#description");
let add = document.querySelector("#add");
let tbody = document.querySelector("#product-list");
let edit = document.querySelector(".edit");
let del = document.querySelector(".delete");
let search = document.querySelector("#search");
let products = []; // create an empty array to store the products

// to add product and save in to the local storage
function addProduct(e) {
  e.preventDefault();
  if (inputName.value !== "" && category.value !== "" && price.value !== "") {
    let product = {
      name: inputName.value,
      category: category.value,
      price: price.value,
      discount: discount.value,
      quantity: quantity.value,
      description: description.value,
    };
    products.push(product); // push the new product into the products array
    localStorage.setItem("products", JSON.stringify(products));
    showData();
    clearInput();
  } else {
    alert("Please fill in all the fields");
  }
}
add.addEventListener("click", addProduct);

// retrieve the data and show it in the table
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  showData();
}

// clear all the inputs
function clearInput() {
  inputName.value = "";
  category.value = "";
  price.value = "";
  discount.value = "";
  quantity.value = "";
  description.value = "";
}

// show the data
function showData() {
  tbody.innerHTML = "";
  products.forEach((product, index) => {
    if (product && product.name) {
      tbody.innerHTML += `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.discount}</td>
          <td>${product.quantity}</td>
          <td>${product.description}</td>
          <td onclick='editProduct(${index})'><i class="fa-solid edit fa-pen-to-square"></i></td>
          <td onclick='deleteProduct(${index})'><i class="fa-solid delete fa-trash"></i></td>
        </tr>
      `;
    }
  });
}

function editProduct(index) {
  const product = products[index];
  if (product) {
    // Retrieve the data
    inputName.value = product.name;
    category.value = product.category;
    price.value = product.price;
    discount.value = product.discount;
    quantity.value = product.quantity;
    description.value = product.description;

    // Clear the product data
    product.name = "";
    product.category = "";
    product.price = "";
    product.discount = "";
    product.quantity = "";
    product.description = "";

    showData();
    add.textContent = "Update";
    add.addEventListener("click", () => {
      add.textContent = "Add";
    });
  } else {
    console.log("Product not found");
  }
}

add.addEventListener("click", addProduct);

// this function works perfect
function deleteProduct(index) {
  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));
  showData();
}

function searchByName(term) {
  if (term === "") {
    showData(); // Show all data when the search term is empty
    return;
  }

  products.forEach((product, index) => {
    if (product.name.toLowerCase().includes(term.toLowerCase())) {
      tbody.innerHTML = `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.discount}</td>
          <td>${product.quantity}</td>
          <td>${product.description}</td>
          <td onclick='editProduct(${index})'><i class="fa-solid edit fa-pen-to-square"></i></td>
          <td onclick='deleteProduct(${index})'><i class="fa-solid delete fa-trash"></i></td>
        </tr>
      `;
    }
  });
}

// the event search
search.addEventListener("input", () => {
  searchByName(search.value);
});
