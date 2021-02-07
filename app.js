const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    const input = document.querySelector('.input')
    const list = document.querySelector('.jsList')

    const content = input.value
    let listItem = document.createElement('li')
    listItem.innerHTML = content

    list.appendChild(listItem)

    input.value = ''

})

function getTime() {
    const clock = document.querySelector('.clock')

    const time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    clock.innerHTML = `${hour<10 ? `0${hour}`:hour}<br>:${minutes<10 ? `0${minutes}`:minutes}<br>:${seconds<10 ? `0${seconds}`:seconds}`
}

function init() {
    setInterval(getTime, 1000)
}

init()