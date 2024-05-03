document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/admin/')
    .then(data => data.text())
    .then(response => console.log(response));
        
    const buttons = document.querySelectorAll(".removeButton");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const listItem = this.closest(".listElement");
            if (listItem){
                listItem.remove();
            }
        });
    });
});