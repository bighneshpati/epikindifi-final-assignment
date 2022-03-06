// Write your code here!
const users = ["UserA", "UserB", "UserC", "UserD"]
let user = ''
//Extracting values from the table
const table = document.getElementById("info-table")
let statusCheck = 0;
const loginField = document.getElementById("logged-user")
// All the present users
const database = [
    {   id: 1,
        name: "Book1",
        author: "Author1",
        lender: "UserC",
        borrower: "UserB", 
        action: "" 
    },
    {   id: 2, 
        name: "Book2",
        author: "Author2", 
        lender: "UserC", 
        borrower: "", 
        action: "" 
    },
    {   id: 3, 
        name: "Book3", 
        author: "Author3", 
        lender: "UserD", 
        borrower: "UserC", 
        action: "" 
    },
    {   id: 4, 
        name: "Book4", 
        author: "Author4", 
        lender: "UserA", 
        borrower: "", 
        action: "" 
    },
    {   id: 5, 
        name: "Book5", 
        author: "Author5", 
        lender: "UserA", 
        borrower: "", 
        action: "" 
    },
    {   id: 6, 
        name: "Book6", 
        author: "Author6", 
        lender: "UserB", 
        borrower: "UserA", 
        action: "" 
    }
];
// Extractions of the values
for (let i = 0; i < database.length; i++) {
    let row = table.insertRow();
    let id = row.insertCell(0);
    let newName = row.insertCell(1);
    let author = row.insertCell(2);
    let lender = row.insertCell(3);
    let borrower = row.insertCell(4);
    let action = row.insertCell(5);
    id.innerHTML = database[i].id;
    newName.innerHTML = database[i].name;
    author.innerHTML = database[i].author;
    lender.innerHTML = database[i].lender;
    borrower.innerHTML = database[i].borrower;
    action.innerHTML = "";
}

function changeLoggedInUser() {
    const userName = loginField.value;
    let message = document.getElementById("logged-in-user-name");
    if (users.includes(userName)) {
        if (statusCheck === 1) {
            for (let i = 1; i < table.rows.length - 1; i++) {
                row = table.rows[i];
                row.cells[5].innerHTML = "";
            }
            table.deleteRow(table.rows.length - 1);
        }
        message.innerHTML = "Logged in user: " + userName;
        user = userName;
        statusCheck = 1;
        addRow(user);
    } else if (!users.includes(userName) && userName !== "") {
        message.innerHTML = "";
        statusCheck = 0;
        for (let i = 1; i < table.rows.length - 1; i++) {
            row = table.rows[i];
            row.cells[5].innerHTML = "";
        }
        table.deleteRow(table.rows.length - 1);
    } else if (userName = "") {
        //foobar
    }
}

function addRow(user) {
    table.insertRow(database.length + 1).innerHTML = `<tr>
    <td>
    </td>
    <td>
        <input type="text" id="titlenew" placeholder="Title" required></input>
    </td>
    <td>
        <input type="text" id="authornew" placeholder="Author" required></input>
    </td>
    <td>
        ${user}
    </td>
    <td></td>
    <td>
        <button type="button" onclick="insertnew(user)">Add</button>
    </td>
    </tr>`
    loggedIn()
}

function insertnew(userLogged) {
    //Checked the corner test cases that is checking the proper values has been entered or not
    let titleName = document.getElementById("titlenew").value === "" ? alert("Enter some values in the Title field") : document.getElementById("titlenew");
    let authorName = document.getElementById("authornew").value === "" ? alert("Enter some values in the Author field") : document.getElementById("authornew");
    database.push({
        id: database.length,
        name: titleName.value,
        author: authorName.value,
        lender: userLogged,
        borrower: "",
        action: ""
    })
    let row = table.insertRow(database.length);

    let id = row.insertCell(0);
    id.innerHTML = database.length;

    let namenew = row.insertCell(1);
    namenew.innerHTML = titleName.value;

    let author = row.insertCell(2);
    author.innerHTML = authorName.value;

    let lender = row.insertCell(3)
    lender.innerHTML = userLogged

    let borrower = row.insertCell(4)
    borrower.innerHTML = ""

    let action = row.insertCell(5)
    
    // Cleared the box for the next input
    titleName.value = null;
    authorName.value = null;
}

// Logging in 
function loggedIn() {
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i]
        if (database[i - 1].lender !== user && database[i - 1].borrower === "") {
            row.cells[5].innerHTML = `<button onclick="borrow(${i})">Borrow</button>`
        } else if (database[i - 1].lender !== user && database[i - 1].borrower === user) {
            row.cells[5].innerHTML = `<button onclick="returning(${i})">Return</button>`
        }
    }
}

// browwing 
function borrow(rowNo) {
    let row = table.rows[rowNo];
    row.cells[5].innerHTML = `<button onclick="returning(${rowNo})">Return</button>`
    row.cells[4].innerHTML = user;
    database[rowNo - 1].borrower = user;
}

//returning the values
function returning(rowNo) {
    let row = table.rows[rowNo];
    row.cells[5].innerHTML = `<button onclick="borrow(${rowNo})">Borrow</button>`
    row.cells[4].innerHTML = ""
    database[rowNo - 1].borrower = ""
}