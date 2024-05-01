document.addEventListener("DOMContentLoaded", () => {
    
    
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