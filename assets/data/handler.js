const products = [
    {
        id: "bullet-3-2.4MP",
        name: "Bullet 2.4MP",
        description: "2.4MP Full HD IR Cosmic Bullet Camera - 20Mtr.",
        price: 2300,
        features: [
            ["Image Sensor", `1/2.7" 2.4MP PS CMOS Image Sensor (6.858 centimeters)`],
            ["Minimum Illumination", `0.02Lux/F1.85, 30IRE, 0Lux IR on`],
            ["Effective Pixels", `2.4MP`]
        ],
        bulletPoints: [
            `1/2.7" 2.4MP PS CMOS Image Sensor (6.858 centimeters)`,
            `Max 25/30fps@ 2.4MP`,
            `DWDR, Day/Night(ICR), 2D-DNR, AWB, AGC, BLC, HLC`,
            `3.6mm fixed lens (2.8mm, 6mm optional)`,
            `IR Range of 20 Mtrs., IP67`
        ],
        imageLink: "https://www.cpplusworld.com/prodassets/product/small/cp-usc-ta24l2.jpg",
        category: "cc"
    },

    {
        id: "dome",
        name: "Dome 2.4MP",
        description: "2.4MP Full HD IR Cosmic Dome Camera - 30Mtr",
        price: 2100,
        features: [
            ["Image Sensor", `1/2.7" 2.4MP PS CMOS Image Sensor (6.858 centimeters)`],
            ["Minimum Illumination", `0.02Lux/F1.85, 30IRE, 0Lux IR on`],
            ["Effective Pixels", `2.4MP`],
            ["BodyType", `Dome`]

        ],
        bulletPoints: [
            `1/2.7" 2.4MP PS CMOS Image Sensor (6.858 centimeters)`,
            `Max 25/30fps@ 2.4MP`,
            `DWDR, Day/Night(ICR), 2D-DNR, AWB, AGC, BLC, HLC`,
            `3.6mm fixed lens (2.8mm, 6mm optional)`,
            `IR Range of 20 Mtrs., IP67`,
            `HD, SD and Two other Analog format Output switchable`
        ],
        imageLink: "https://www.cpplusworld.com/prodassets/product/small/70bb461a-f28d-47c5-8107-2a0dd7ab7218.png",
        category: "cc"
    },

    {
        id: "c11",
        name: "Beetel C-11 Landline Basic Phone (Black)",
        description: "Brand:Beetel",
        price: 550,
        features: [
            ["Image Sensor", `1/2.7" 2.4MP PS CMOS Image Sensor (6.858 centimeters)`],
            ["Minimum Illumination", `0.02Lux/F1.85, 30IRE, 0Lux IR on`],
            ["Effective Pixels", `2.4MP`],
            ["BodyType", `Dome`]

        ],
        bulletPoints: [
            `Item Weight: 150g`,
            `Product Dimensions: 21.3 x 19.3 x 6.4 cm`,
            `Colour: black`,
        ],
        imageLink: "https://m.media-amazon.com/images/I/31AVBNi5YKL.jpg",
        category: "te"
    }
]


function createProduct(id, name, price, imageLink){
    return `
    <div class="item col-md-4">
        <a href="/product.html?pid=${id}">
        <div class="featured-item">
            <img src="${imageLink}" style="height: 200px !important; width: 200px !important" alt="">
            <h4>${name}</h4>
            <h6>Rs. ${price}</h6>
        </div>
        </a>
    </div>
    `
}

function createSinglePoint(point){
    return `<li class="list-group-item">${point}</li>`
}

function createSingleTableRow(featureName, featureValue){
    return `<tr><td>${featureName}</td><td>${featureValue}</td></tr>`
}

function createBulletPoint(pointsList){
    var finalList = "";
    for(var i = 0; i < pointsList.length; i++){
        finalList+=createSinglePoint(pointsList[i]);
    }
    return finalList;
}

function createTableRows(features){
    var innerHTML = "";
    for(var i=0; i<features.length; i++){
        innerHTML+=createSingleTableRow(features[i][0], features[i][1]);
    }
    return innerHTML;
}

function getSpecificProduct(id){
    for(var i = 0; i < products.length; i++){
        if(products[i].id == id){
            return products[i]
        }
    }
}

const allProducts = document.getElementById("allproducts");
if(allProducts){
    const ptype = getUrlParameter("type")
    var innerHTML = ""
    for(var i=0; i<products.length; i++){
        if(ptype){
            if(ptype==products[i].category)
            innerHTML += createProduct(products[i].id, products[i].name, products[i].price, products[i].imageLink);
        }
        else
            innerHTML += createProduct(products[i].id, products[i].name, products[i].price, products[i].imageLink);
    }
    allProducts.innerHTML = innerHTML;
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

const pageBox = document.getElementById("pagebox");
if(pageBox){
    const productId = getUrlParameter("pid");
    const product = getSpecificProduct(productId);
    if(product){
        document.getElementById("producttitle").innerHTML = product.name;
        document.getElementById("productimage").setAttribute("src", product.imageLink);
        document.getElementById("productname").innerHTML = product.name;
        document.getElementById("productdescription").innerHTML = product.description;
        document.getElementById("productprice").innerHTML = "Rs. " + product.price;
        var points = createBulletPoint(product.bulletPoints);
        document.getElementById("productpoints").innerHTML = `<ul class="list-group">${points}</ul>`
        document.getElementById("productfeatures").innerHTML = createTableRows(product.features);
    }else{
        pageBox.innerHTML="<br><br><br><center><h3>Product Not Found!</h3></center>"
    }
}