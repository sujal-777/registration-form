const dob2 = document.getElementById("dob");
const today = new Date().toISOString().split("T")[0];
const year = new Date().getFullYear();
dob2.min = `${year - 55}-01-01`;
dob2.max = `${year - 18}-01-01`;

let userForm = document.getElementById("user-form");


let userEntries = [];
const saveuserform = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const tandc = document.getElementById("tandc").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    tandc,
  };
  
  userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

const displayEntries = () => {
  userEntries = retrieveEntries();
  const entries = retrieveEntries();
  let tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class= " border px-4 py-2 ">${entry.name}</td>`;
      const emailCell = `<td class= " border px-4 py-2 ">${entry.email}</td> `;
      const passwordCell = `<td class= " border px-4 py-2 ">${entry.password}</td> `;
      const dobCell = `<td  class= " border px-4 py-2 ">${entry.dob}</td> `;
      const tandcCell = `<td class= " border px-4 py-2 ">${entry.tandc}</td> `;

      const row = `<tr>${nameCell}   ${emailCell} ${passwordCell} ${dobCell} ${tandcCell} </tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full">
      <tr>
      <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">Dob</th>
        <th class="px-4 py-2">Accepted terms?</th>
      </tr>
       ${tableEntries}
   </table>`;

  let details = document.getElementById("printing");
  details.innerHTML = table;
};

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};


// let retrievedEntries = retrieveEntries();

userForm.addEventListener("submit", saveuserform);

displayEntries();