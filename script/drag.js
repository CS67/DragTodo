function drag() {
  document.querySelectorAll(".list").forEach((list) => {
    let dragging = false;
    let offsetX, offsetY;
    list.addEventListener("mousedown", (e) => {
      console.log(`${e.pageX} ${offsetX} ${e.pageX - offsetX}`);
      e.preventDefault();
      dragging = true;

      // const original = list.parentElement;
      // original.classList.add("original");
      list.classList.add("dragging");

      offsetX = e.offsetX;
      offsetY = e.offsetY;
      list.style.position = "absolute";
      list.style.zIndex = 1000;
      document.body.appendChild(list);

      moveAt(e);

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);

      function moveAt(e) {
        list.style.left = e.pageX - offsetX + "px";
        list.style.top = e.pageY - offsetY + "px";
      }
      function mouseMoveHandler(moveEvent) {
        if (dragging) {
          moveAt(moveEvent);
        }
      }

      function mouseUpHandler(upEvent) {
        dragging = false;
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        const x = upEvent.pageX - offsetX;
        const y = upEvent.pageY - offsetY;
        const place = document.elementFromPoint(x, y);
        if (x <= 0 || y <= 0 || !place.classList.contains("box")) {
          list.remove();
          saveToLocal();
        } else if (place.classList.contains("box")) {
          place.appendChild(list);
          saveToLocal();
        }
        list.style.position = "";
        list.style.left = "";
        list.style.top = "";
        list.style.zIndex = "";
        list.classList.remove("dragging");
      }
    });
  });
}
