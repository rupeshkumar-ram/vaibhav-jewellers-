let products = JSON.parse(localStorage.getItem("products")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// -------- PRODUCT --------
function addProduct() {
  let p = {
    name: p_name.value,
    weight: p_weight.value,
    rate: p_rate.value,
    making: p_making.value
  };

  products.push(p);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function loadProducts() {
  let list = document.getElementById("productList");
  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${p.name} | ${p.weight}
      <button onclick="deleteProduct(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// -------- CUSTOMER --------
function addCustomer() {
  let p = Number(c_principal.value);
  let r = Number(c_rate.value);

  let start = new Date(c_start.value);
  let end = new Date(c_end.value);

  let days = (end - start) / (1000 * 60 * 60 * 24);
  let months = Math.ceil(days / 30);

  let interest = (p * r * months) / 100;

  document.getElementById("c_interest").innerText = interest.toFixed(2);

  let c = {
    name: c_name.value,
    phone: c_phone.value,
    principal: p,
    interest: interest
  };

  customers.push(c);
  localStorage.setItem("customers", JSON.stringify(customers));
}

// -------- DETAILS --------
function loadDetails() {
  let list = document.getElementById("detailsList");
  if (!list) return;

  list.innerHTML = "";

  customers.forEach((c, index) => {
    let row = `
      <tr>
        <td>${c.name}</td>
        <td>₹${c.principal}</td>
        <td>₹${c.interest}</td>
        <td><button onclick="deleteCustomer(${index})">Delete</button></td>
      </tr>
    `;

    list.innerHTML += row;
  });
}

function deleteCustomer(index) {
  customers.splice(index, 1);
  localStorage.setItem("customers", JSON.stringify(customers));
  loadDetails();
  loadDashboard();
}

// -------- DASHBOARD --------
function loadDashboard() {
  let totalInterest = 0;
  let totalPrincipal = 0;

  customers.forEach(c => {
    totalInterest += c.interest;
    totalPrincipal += c.principal;
  });

  let i = document.getElementById("d_interest");
  let p = document.getElementById("d_payable");
  let o = document.getElementById("d_out");

  if (i) i.innerText = totalInterest.toFixed(2);
  if (p) p.innerText = (totalPrincipal + totalInterest).toFixed(2);
  if (o) o.innerText = totalPrincipal.toFixed(2);
}