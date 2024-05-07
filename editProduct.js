function editProduct(index) {
  const product = products[index];
  if (product) {
    // retrieve the data
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

    showData(); // Update the table after editing
    add.innerHTML = "Update"; //update text
  } else {
    console.log("Product not found");
  }
  add.innerHTML = "Add product";
}
