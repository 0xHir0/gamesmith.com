async function getNewArrivalProducts() {
  const products = await getProducts("/new-arrivals/?format=json");
  if (products && products.length >= 1) {
    const productsUrls = products.map((e) => e.url.replace(".html", ".ajax"));
    const productsList = [];
    for (let url of productsUrls) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.id) {
          const product = data;
          productsList.append(product);
        }
      } catch (error) {
        console.log(error);
      }
      if (productsList.length >= 4) break;
    }
    if (productsList.length >= 1) {
      const newArrivalsContainers = document.querySelector(
        "#home-products-new-arrivals"
      );
      if (newArrivalsContainers) {
        for (let productItem of productsList) {
          if (productItem.stock.available) {
            const productDiv = document.createElement("div");
            productDiv.classList("product", "col-xs-6", "col-sm-3", "col-md-3");
            productDiv.innerHTML = `
         
         <div class="image-wrap">
    <a href="${productItem.url}" title="${productItem.title}">
                                                                                                                                 <div class="sale-new new-label">
          New
        </div>
                                                                                           <img src="${productItem.images[0]}" alt="${productItem.title}" title="${productItem.title}" width="262" height="276">
                </a>

    <div class="description text-center">
      <a href="${productItem.url}" title="${productItem.title}">
                <div class="text" style="height: 264px;">
                   ${productItem.description}
                  </div>
      </a>
      <a href="https://www.shoppejvinteriors.ca/cart/add/${productItem.id}/" class="cart">Add to cart</a>    </div>
  </div>

  <div class="info">
    <a href="${productItem.url}" title="${productItem.title}" class="title">
        ${productItem.title}     </a>

    <div class="left">

      <!-- edited for offline products -->
      
        </div>
 <div class="">
 ${productItem.price.price_money}       

   </div>
         </div>
         
         `;
            newArrivalsContainers.appendChild(productDiv);
          }
        }
      }
    }
  }
}
