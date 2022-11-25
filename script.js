//Point the elements mentioned in html
const makeUpProducts = document.getElementById("makeUpProducts");
const search = document.getElementById("search");
let products = [];
//create an empty array to store the input
console.log(search);

//create addEventListener to point the elemnt which need to be searched
search.addEventListener("keyup", (e) => {
  const searchedProducts = e.target.value.toLowerCase();
  //store the searched name and apply filter function
  const filteredProducts = products.filter((items) => {
    return items.name.toLowerCase().includes(searchedProducts);
  });
  //call the displayProducts function and pass the filteredProducts to it
  displayProducts(filteredProducts);
});

//Fetch the data with async/await and fetch
//create async function
const getProducts = async () => {
  try {
    //use fetch and give the url of the api
    const res = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    );
    //covert the result to JSON objectslog the datas into products
    products = await res.json();
    displayProducts(products);
    console.log(products);

    //use catch to display as error if there is any error during run time
  } catch (err) {
    alert("Sorry!!Unable to Load the page,Something Went Wrong");
  }
};

//point the object in the API and map the datas to be displayed

const displayProducts = (items) => {
  const htmlString = items
    .map((items) => {
      return `
            <div class="items">
            <img src="${items.image_link}" alt="No Image Available ☹"></img>
                <div class="name"><b><i>Product Name:</i></b> ${items.name}</div>
                <div class="brand"><b><i>Brand Name:</i></b> ${items.brand}</div>
                <div class="price"><b><i>Price:</i></b> $${items.price}</div>
                <div class="label"><b><i>Product Link:</i></b><a href="${items.product_link}" class="link" target="_blank">${items.product_link}</a></div>
                <div class="desc"><b><i>Description:</i></b> ${items.description}</div>
                
            </div>
        `;
    })
    .join("");
  makeUpProducts.innerHTML = htmlString;
};

getProducts();
