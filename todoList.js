const form = document.querySelector('form')
const input = document.querySelector('input')
const list = document.querySelector('.todo-list')

const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle'
const LINE_THROUGH = 'line--through'

let id = 0
let LIST = []

// get data when start
let data = localStorage.getItem('savedList')

if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
} else {
    id = 0
    LIST = []
}

function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.isDone, item.isDel)
    })
}




function addToDo(toDo, id, isDone, isDel) {
    if(isDel) {
        return ;
    }
    const DONE = isDone ? CHECK : UNCHECK
    const LINE = isDone ? LINE_THROUGH : ''
    const item = `
                    <li>
                        <i class="far ${DONE} check" job="complete" id="${id}"></i>
                        <p class="${LINE}">${toDo}</p>
                        <i class="fas fa-times del" job="delete" id="${id}"></i>
                    </li>
                 `
    
    const position = 'beforeend'

    list.insertAdjacentHTML(position, item)
}

// add list item when submit occured
form.addEventListener('submit', function(event) {
    event.preventDefault()

    const toDo = input.value

    if(toDo) {
        addToDo(toDo, id, false, false)

        LIST.push({
            name: toDo,
            id: id,
            isDone: false,
            isDel: false
        })

        // save in localstorage
        localStorage.setItem('savedList', JSON.stringify(LIST))
        
        id ++
    }


    input.value = ''

})

// comeplete toDo
function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector('p').classList.toggle(LINE_THROUGH)

    LIST[element.id].isDone = LIST[element.id].isDone ? false: true
}

// delete toDo
function deleteToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    // update to savedList
    LIST[element.id].isDel = true
}

// comeplete or delete list item
list.addEventListener('click', function(event) {
    const element = event.target
    const elementJob = element.attributes.job.value;

    if(elementJob == 'complete') {
        completeToDo(element)
    } else if(elementJob == 'delete') {
        deleteToDo(element)
    }

    // save in localstorage
    localStorage.setItem('savedList', JSON.stringify(LIST))
})


