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
    saveToLocal();
    drag();
  });
});

//save data to local
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

//get data from local
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

//edit when dblclick
function edit() {
  document.querySelectorAll(".list").forEach((list) => {
    if (list.dbListener) {
      return;
    }
    list.dbListener = true;
    list.addEventListener("dblclick", (e) => {
      e.preventDefault();
      let content = list.textContent.trim();
      list.innerHTML = `<input type="text" placeholder="${content}">`;
      const input = list.querySelector("input");
      input.focus();
      function handleLoseFocus() {
        const newContent = input.value;
        if (newContent) {
          list.innerHTML = newContent;
        } else {
          list.innerHTML = content;
        }
        saveToLocal();
      }

      function handleKeydown(e) {
        if (e.key === "Enter") {
          input.blur();
        }
      }
      //lose focus
      input.addEventListener("blur", handleLoseFocus);
      //enter to blur
      input.addEventListener("keydown", handleKeydown);
    });
  });
}
