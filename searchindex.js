const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    if (!storeitems) {
        console.error("Could not find element with id 'product-list'");
        return;
    }
    const products = storeitems.getElementsByClassName("product");
    for (var i = 0; i < products.length; i++) {
        let product = products[i];
        let pname = product.getElementsByTagName("h2")[0];
        if (!pname) {
            console.error("Could not find h2 element inside product", product);
            continue; // Skip to the next product
        }
        let textvalue = pname.textContent || pname.innerHTML;
        if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    }
}
