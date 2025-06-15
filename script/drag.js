function drag() {
  document.querySelectorAll(".list").forEach((list) => {
    let dragging = false;
    let offsetX, offsetY;

    //mousedown -> mouseup\mousemove
    list.addEventListener("mousedown", (e) => {
      //prevent from selecting text
      e.preventDefault();

      dragging = true;

      //add class "dragging" for convenient css configuration
      list.classList.add("dragging");

      //get initial offset from click position
      offsetX = e.offsetX;
      offsetY = e.offsetY;

      list.style.position = "absolute";
      list.style.zIndex = 1000;
      document.body.appendChild(list);

      // moveAt(e);

      //use callback function
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);

      //list moving follow the cursor
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
        //get cursor position
        const x = upEvent.pageX;
        const y = upEvent.pageY;

        //prevent from appending to list
        let place = document.elementFromPoint(x, y);
        if (place.classList.contains("list")) {
          place = place.parentElement;
        }
        if (!place.classList.contains("box")) {
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
