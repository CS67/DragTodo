function drag() {
  document.querySelectorAll(".list").forEach((list) => {
    if (list.hasMousedown) {
      return;
    }
    list.hasMousedown = true;
    list.addEventListener("mousedown", handleMousedown);
  });

  let dragging = false;
  let offsetX, offsetY;
  let startX, startY;
  let endX, endY;
  const THRESHOLD = 5;
  let timer = null;

  function handleDoubleClick() {
    edit();
    console.log("double click");
  }
  function handleSingleClick() {}

  function handleMouseMove(e) {
    endX = e.pageX;
    endY = e.pageY;

    if (Math.abs(endY - startY) > 5 || Math.abs(endX - startX) > 5) {
      dragging = true;
      draggedItem.classList.add("dragging");
      draggedItem.style.position = "absolute";
      draggedItem.style.zIndex = "1000";
    }
    if (dragging) {
      draggedItem.style.left = e.pageX - offsetX + "px";
      draggedItem.style.top = e.pageY - offsetY + "px";
    }
  }

  function handleMouseUp(e) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    //Determine whether drag or single click or double click
    if (dragging) {
      dragging = false;
      //get cursor position
      draggedItem.style.visibility = "hidden";
      //prevent from appending to list
      let place = document.elementFromPoint(e.pageX, e.pageY);
      draggedItem.style.visibility = "visible";
      const targetBox = place ? place.closest(".box") : null;

      if (!targetBox) {
        draggedItem.remove();
        saveToLocal();
      } else {
        const addButton = targetBox.querySelector(".addButton");
        targetBox.insertBefore(draggedItem, addButton);
        saveToLocal();
      }
      draggedItem.style.position = "";
      draggedItem.style.left = "";
      draggedItem.style.top = "";
      draggedItem.style.zIndex = "";
      draggedItem.classList.remove("dragging");
    } else if (timer) {
      clearTimeout(timer);
      timer = null;
      handleDoubleClick();
    } else {
      timer = setTimeout(() => {
        handleSingleClick();
        timer = null;
      }, 350);
    }
  }

  function handleMousedown(e) {
    draggedItem = e.currentTarget;
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
}
