const log = console.log


const updatePage = (address) => {
    const url = 'http://localhost:3000/weather?address=' + address
    fetch(url).then((response) => {
        response.json().then((data) => {
            document.getElementById("name").innerHTML = data.name
            document.getElementById("temp").innerHTML = data.Temperature
            document.getElementById("perci").innerHTML = data.Percipatation
            document.getElementById("summary").innerHTML = data.Summary
    
        })
    })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    updatePage(location)
})