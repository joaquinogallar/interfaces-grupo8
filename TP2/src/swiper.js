async function newSwiper(idCarrusel, tarjeta,titulo) {
    const carrusel = document.querySelector(idCarrusel);


    let juegos = await get("https://raw.githubusercontent.com/joaquinogallar/interfaces-grupo8/refs/heads/main/TP2/data/juegos.json");

    console.log(idCarrusel);
    if(idCarrusel !== '.carrusel-destacados-div'){
        console.log("desordenando");
        juegos = juegos.sort(() => Math.random() - 0.5);
    }

    let i = 0;
    

    if (juegos) {
        for(const juego of juegos) {
            i++;
            let add = "<div class='swiper-slide' id='" + i + "'>"; 
            
            add += "<div class='tarjeta-juego " + tarjeta +"' style='background-image:url(\"" + juego.imagen + "\")';>";

            if(juego.precio <= 0) {
                juego.precio = null;
            }

            add += "<div class='juego-precio-container precio-"+ titulo +"'><span class='body0'>" + (juego.precio != null ? juego.precio : "") +"</span> </div>"

            add += "<div class='juego-nombre-container'><h1 class='titulo-"+ titulo + " h1alt'>"+ juego.nombre +"</h1> <button class='boton-juego boton-"+ titulo + " body1' id='" + juego.id + "'>Jugar</button></div>";

            add += "</div>";

            carrusel.innerHTML += add;

        };

        
        let slides = document.querySelectorAll(idCarrusel +' .swiper-slide');

        let btnNext = carrusel.nextElementSibling;
        let btnPrev = btnNext.nextElementSibling; 

        let currentSlide = 0;
        let totalSlides = slides.length;

        
        btnNext.addEventListener('click', function() {
            let slide = carrusel.querySelector('.swiper-slide');
            let slideWidth = slide.offsetWidth;

            const maxSlidesVisible = Math.floor(carrusel.offsetWidth / slideWidth); 
            
            console.log(slideWidth);

            /* Verifica que no se pase del total de slides visibles */
            if (currentSlide < totalSlides - maxSlidesVisible) {
                currentSlide++;
                carrusel.style.transform = `translateX(-${currentSlide * slideWidth}px)`; /* Tamaño de slide*/
            } else {
                //console.log("No hay más slides a la derecha");
            }
        });
        btnPrev.addEventListener('click', function() {   
            let slide = carrusel.querySelector('.swiper-slide');
            let slideWidth = slide.offsetWidth;

            /* Verifica que no se pase del primer slide */
            if (currentSlide > 0) {
                currentSlide--;
                carrusel.style.transform = `translateX(-${currentSlide * slideWidth}px)`; // Tamaño de slide
            } else {
                //console.log("No hay más slides a la izquierda");
            }
        });
        

        

       

    }

    console.log(juegos);

}



async function get(url){
    try {
        response = await fetch(url);
        if(!response.ok) {
            throw "Error en el fetch";
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error:', error);
    }
    
}

