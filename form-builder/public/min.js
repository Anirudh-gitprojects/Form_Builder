document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const categories = document.querySelectorAll(".category");
  
    // Add event listeners to items for dragging
    items.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
    });
  
    // Add event listeners to categories for drop
    categories.forEach((category) => {
      category.addEventListener("dragover", handleDragOver);
      category.addEventListener("drop", handleDrop);
    });
  
    let draggedItem = null;
  
    function handleDragStart(event) {
      draggedItem = event.target;
      event.dataTransfer.setData("text/plain", event.target.innerText);
    }
  
    function handleDragOver(event) {
      event.preventDefault();
    }
  
    function handleDrop(event) {
      event.preventDefault();
      const itemText = event.dataTransfer.getData("text/plain");
      draggedItem.innerText = itemText;
      event.target.appendChild(draggedItem);
    }
  });
  