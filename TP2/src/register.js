
const btnSubmit = document.querySelector(".btnSubmitLogin");



btnSubmit.addEventListener("click", (e) =>{
    e.preventDefault();
    const container = document.querySelector("#loginSuccess");
    console.log(container);
    container.togglePopover();
    container.style.display = "block";
    document.body.classList.toggle('no-scroll');  /* no implementado como volver a activar scroll */
})