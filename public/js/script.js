console.log('This is javascript from client side')



const form = document.querySelector('form')
const text = document.getElementById('location')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')
const img = document.getElementById('weatherimg')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ' '
    img.src = ''


    const url = '/weather?location=' + text.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                console.log(data)
                msg1.textContent = data.locationData
                msg2.textContent = data.printData
                img.src = data.imgData
            }
        })
    })
})