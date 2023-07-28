var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productSearch = document.getElementById("productSearch");
var btnChange = document.getElementById("btn-change");
// var mainTable = document.getElementById("main-table");
// var noResult = document.getElementById("noResult");

// noResult.style.display = "none";

var productlist = [];

var updateIndex = -1;

var searchArray = [];

if (JSON.parse(localStorage.getItem("products")) !== null) {
  productlist = JSON.parse(localStorage.getItem("products"));
  displayProducts(productlist);
}

function addProduct() {
  if (
    productName.value === "" ||
    productPrice.value === "" ||
    productCategory.value === "" ||
    productDescription.value === ""
  )
    return;

  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDescription.value,
  };

  if (updateIndex !== -1) {
    btnChange.innerHTML = "Add Product";

    for (var i = 0; i < searchArray.length; i++) {
      console.log(searchArray[i]);
      console.log(productlist[updateIndex]);

      if (searchArray[i] === productlist[updateIndex]) {
        searchArray.splice(i, 1, product);
        console.log(searchArray);
      }
    }
    productlist.splice(updateIndex, 1, product);
    localStorage.setItem("products", JSON.stringify(productlist));
    displayProducts(productlist);

    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";

    updateIndex = -1;
    return;
  }

  productlist.push(product);
  localStorage.setItem("products", JSON.stringify(productlist));
  displayProducts(productlist);
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function displayProducts(list) {
  var temp = "";    
  console.log(productSearch.value);
    for (var i = 0; i < list.length; i++) {
      temp += ` 
      <tr>
      <td>${i}</td>
      <td>${list[i].name.replace(
        productSearch.value,
        `<span class="text-danger">${productSearch.value}</span>`
      )}</td>
      <td>${list[i].price}</td>
      <td>${list[i].category.replace(
        productSearch.value,
        `<span class="text-danger">${productSearch.value}</span>`)}</td>
      <td>${list[i].desc}</td>
      <td>
      <button onclick="updateItem(${i})" class="btn btn-outline-warning">Update</button>
      </td>
      <td>
      <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
      </td>
      </tr>`;
    }
  document.getElementById("tableBody").innerHTML = temp;
}

function resetInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function deleteItem(i) {
  searchArray.splice(searchArray.indexOf(productlist[i]), 1);
  productlist.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(productlist));
  displayProducts(productlist);
}

function updateItem(i) {
  btnChange.innerHTML = "Update";

  console.log(productlist[i]);
  updateIndex = i;

  productName.value = productlist[i].name;
  productPrice.value = productlist[i].price;
  productCategory.value = productlist[i].category;
  productDescription.value = productlist[i].desc;
}

function search() {
  searchArray = [];
  for (var i = 0; i < productlist.length; i++) {
    if (
      productlist[i].name
        .toLowerCase()
        .includes(productSearch.value.toLowerCase()) ||
      productlist[i].category
        .toLowerCase()
        .includes(productSearch.value.toLowerCase())
    ) {
      searchArray.push(productlist[i]);
    }
  }
  displayProducts(searchArray);
}
