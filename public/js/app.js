console.log('client side javascript file is loading')

const form = document.querySelector('#formSearch')
const resultSearch = document.querySelector('.resultSearch')

const qtdResult = document.querySelector('#qtdResult')

document.addEventListener('submit', (e) => {

    e.preventDefault()


    const inpSearch = document.querySelector('#inpSearch').value
    const urlHome = window.location.origin + '/search?search=' + inpSearch

    document.querySelector('.home').classList.add('searched')
    fetch(urlHome).then((response) => {
        response.json().then((data) => {
            //console.log(data)
            if (data.error) {
                resultSearch.textContent = data.error
            } else {
                console.log(data)
                resultSearch.innerHTML = ''

                search_word = data.newsSearch // frase de busca 
                const words = search_word.split(' ').map(p => ' ' + p.toLowerCase() + ' '); // recebe um array das palavras de busca

                const listResult = data.newsAllInfo.filter( result => {
                    const search_atributes = [ result.title, result.author, result.description ] // atributos usados para realizar a busca 

                    for (let word of words) {
                        for (let atribute of search_atributes) {
                            if (atribute && atribute.toLowerCase().includes(word)) {
                                return true
                            }
                        }
                    }
                    return false

                })
                console.log(listResult)

                qtdResult.textContent = 'Resultado de busca: '+listResult.length+' artigos encontrados.'

                listResult.sort((a, b) => new Date(b.date) - new Date(a.date))
                listResult.forEach(i => {
                    resultSearch.innerHTML += `
                        <article class="boxResult">
                            <h2 class="title">
                                <a href="${i.url}" target="_blank">${i.title}</a>
                            </h2>
                            <p class="source">Source: ${i.source.name}</p>
                            <p class="description">${i.content || "unavalible"}</p>
                            <div class="authorNews">
                                <p class="author">Author: ${i.author || "unavalible"} </p>
                                <p class="publish"> Published: ${new Date(i.publishedAt).toLocaleString("pt-BR")} </p>
                            </div>
                        </article>
                    `
                })
            }

        })
    })

})

