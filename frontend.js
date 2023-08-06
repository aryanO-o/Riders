// const { profileEnd } = require("console");

const serverURL = "http://127.0.0.1:8000";

const container = document.querySelector(".container");
const input = document.querySelector(".searchbar");
const userAddButton = document.querySelector(".button");

let text = '';
let array = [];

fetch(serverURL).then((data) => {
    return data.text();
}).then((result)=> {
    array = JSON.parse(result);

    cardMaker(array);

})


function cardMaker(array)
{
    array.forEach(ele =>
    {
        const card = document.createElement("div");

        card.classList.add("cards");
        card.classList.add("remove");

        card.innerHTML = `<div class="name boxes">Name</div>
        <div class="name-content boxes">${ele.name}</div>
        <div class="email boxes">Email</div>
        <div class="email-content boxes">${ele.email}</div>`;

        if(ele.name.includes(text))
        {
            container.appendChild(card);
        }
    })
}


input.addEventListener("input", (event) => {
    const searchStr = event.target.value.toLowerCase();
  
    const filteredArray = array.filter((ele) => {
      return (
        ele.name.toLowerCase().includes(searchStr) ||
        ele.email.toLowerCase().includes(searchStr)
      );
    });
    
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    

    cardMaker(filteredArray);
  });

  userAddButton.addEventListener('click', ()=>
  {
      const name = prompt("enter name..");
      const email = prompt("enter email..");

      const newUser = {
          name: name,
          email: email,
      };

      const secretKey = prompt("enter secret key....");

      const bodydata = {
          newUser,
          secretKey,
      };

      fetch(`${serverURL}/adddata`, {
          method: "POST",
          body: JSON.stringify(bodydata),
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((data) => data.json())
      .then((result) => {
          array = result;
          
          while (container.firstChild) {
            container.removeChild(container.firstChild);
            }
        
          cardMaker(array);
      })
      .catch((error)=>
      {
          alert("user not added");
      })
  })