# HTML 

- It includes a container with two main sections: product listing and shopping cart.
- The product listing section is represented by a div with the class "listProduct".
- The shopping cart section is represented by a div with the class "listCart" to display cart items.
- The HTML also includes buttons for closing the cart and checking out.

# JavaScript 
- Variables are declared to select specific elements from the HTML structure using querySelector.
- These variables include references to various elements such as "listProductHTML", "listCartHTML", "iconCart", "iconCartSpan", "body", "closeCart", etc.


# Event Listeners:

- Event listeners are attached to the "iconCart" and "closeCart" elements to toggle the visibility of the cart when clicked.
- When the "iconCart" is clicked, it toggles the "showCart" class on the body element to show/hide the cart.
- Similarly, clicking the "closeCart" button toggles the "showCart" class to close the cart.

# Rendering Products:

- The "addDataToHTML" function is defined to render products onto the webpage.
- It checks if there are products available (products.length > 0) and creates HTML elements for each product.
- It then appends these elements to the "listProductHTML".

# Adding Products to Cart:

- The "addToCart" function adds products to the cart.
- It takes the "product_id" as input and checks if the product already exists in the cart.
- If it does, it increments its quantity; otherwise, it adds a new entry to the cart with a quantity of 1.
- After updating the cart, it calls "addCartToHTML" to update the cart display and "addCartToMemory" to store the cart data in local storage.

# Rendering Cart:

- The "addCartToHTML" function renders cart items on the webpage.
- It clears the existing content and iterates through each item in the cart to create HTML elements.
- It then appends these elements to the "listCartHTML" and updates the cart counter to display the total quantity of items.

# Fetching Product Data:

- The "getData" function fetches product data from an external JSON file (products.json).
After receiving the data, it renders the products using "addDataToHTML".
If there's stored cart data in local storage, it retrieves and displays it.
