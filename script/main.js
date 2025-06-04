const boards = getFromLocal();
const container = document.querySelector(".container");

boards.forEach((board) => {
  const box = document.createElement("div");
  box.className = "box";
  box.innerHTML = `<h3>${board.title}</h3>`;
  board.items.forEach((item) => {
    const list = document.createElement("div");
    list.className = "list";
    list.innerHTML = `${item}`;
    box.appendChild(list);
  });
  const addButton = document.createElement("button");
  addButton.innerText = "+";
  addButton.className = "addButton";
  box.appendChild(addButton);
  container.appendChild(box);
});

drag();

//add button
const addButtons = document.querySelectorAll(".addButton");
addButtons.forEach((addButton) => {
  addButton.addEventListener("click", () => {
    const input = prompt("Enter Todo:");
    const box = addButton.parentElement;
    if (input && input !== "") {
      const list = document.createElement("div");
      list.className = "list";
      list.innerHTML = `${input}`;
      //insert before button
      box.insertBefore(list, addButton);
    }
    drag();
    saveToLocal();
  });
});

function saveToLocal() {
  document.querySelectorAll(".box").forEach((box) => {
    const title = box.querySelector("h3").textContent;
    boards.forEach((board) => {
      if (board.title === title) {
        board.items = [];
        box.querySelectorAll(".list").forEach((list) => {
          board.items.push(list.textContent);
        });
      }
    });
  });
  localStorage.setItem("boards", JSON.stringify(boards));
}

function getFromLocal() {
  return (
    JSON.parse(localStorage.getItem("boards")) || [
      {
        title: "Todo",
        items: ["Drink milk", "Eat breakfast", "Read a book"],
      },
      { title: "Done", items: ["Get up at 8:00", "Eat fruit"] },
    ]
  );
}
