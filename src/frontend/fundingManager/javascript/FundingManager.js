document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle.onclick = function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    };

    // add hovered class to selected list item
    let listItems = document.querySelectorAll(".navigation li");

    function activateLink() {
        listItems.forEach((item) => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    }

    listItems.forEach((item) => item.addEventListener("click", activateLink));

    document.getElementById('signOut').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/login/logout');

            const data = await response.text();
            alert(data);
            window.location.href = '../../login/html/login.html';
        } catch (e) {
            console.error("ERROR:", e);
        }
    });
})