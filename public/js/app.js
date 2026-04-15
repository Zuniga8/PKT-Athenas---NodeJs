console.log('client side javascript file is loading')

const form = document.querySelector('#formSearch')


//messageOne.textContent = ''

const api = ""

const messageOne = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

document.addEventListener('submit', (e) => {

    e.preventDefault()
    
    const inpSearch = document.querySelector('#inpSearch').value
    const urlHome = window.location.origin + '/search?search=' + inpSearch

    console.log(urlHome)

    messageOne.textContent = 'Loading......'
    messagetwo.textContent = ''

 
    fetch( urlHome ).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                //console.log(data)
                messageOne.textContent = data.newsTitle
                messagetwo.textContent = data.newsDescription
            }

        })
    })

})

