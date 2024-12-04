var btn_menu = document.getElementById("btn-menu");
var btn_novamente = document.getElementById("btn-novamente");
var btn_proximo = document.getElementById("btn-proximo");

// FUNCITION BTN

btn_menu.onclick = function () {
    window.location.href = '/menuAxie.html';
}


btn_novamente.onclick = function () {
    location.reload();
    modal.style.display = "none"
}

btn_proximo.onclick = function () {
    let dificuldade = "";
    let url_atual = window.location.href;
    let url_atual_array = url_atual.split("/");
    dificuldade_atual = url_atual_array[url_atual_array.length - 1].split(".")[0].slice(-1);

    if (dificuldade_atual === 'F') {
        dificuldade = 'M';
    } else if (dificuldade_atual === 'M') {
        dificuldade = 'D'
    } else {
        alert('TU É CARA OU A CARA!')
    }

    window.location.href = '/jogoCartas' + dificuldade + ".html";
}