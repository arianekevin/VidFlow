const containerVideos = document.querySelector('.videos__container');

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        if (busca) {
            const videos = await busca.json();
            if (videos) {
                videos.forEach((video) => {
                    if (!video.url || video.url === '') {
                        throw new Error(`Vídeo '${video.titulo}' não possui url`)
                    }
                    containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src = "${video.url}" title = "${video.titulo}" frameBorder = "0" allowFullScreen> </iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden="">${video.categoria}</p>
                    </div>
                </li>`;
                })
            }
        }
    } catch (e) {
        containerVideos.innerHTML = `<p>Erro ao carregar vídeos: ${e}</p>`
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');

    if (barraDePesquisa && barraDePesquisa !== '') {
        for (let video of videos) {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();
            if (!titulo.includes(valorFiltro)) {
                video.style.display = 'none';
            } else {
                video.style.display = 'block';
            }
        }
    } else {
        videos.forEach(v => v.style.display = 'block');
    }
}

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach(btn => {
    let nomeCategoria = btn.getAttribute('name');
    btn.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(nomeCategoria) {
    const videos = document.querySelectorAll('.videos__item');
    for (let video of videos) {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = nomeCategoria.toLowerCase();
        if (valorFiltro !== 'tudo' && !categoria.includes(valorFiltro)) {
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
        }
    }
}
