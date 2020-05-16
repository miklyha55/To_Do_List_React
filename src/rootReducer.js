export default function rootReducer(state = initialState, action) {
    
    let todos = []

    switch(action.type) {

        case 'changeInputHandler':

            return Object.assign({}, state, {
                inputValue: action.event.target.value
            })

        case 'changeInputTodoHandler':
            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(index == action.index) {
                    console.log(action.index)
                    todos[index].name = action.event.target.value
                }
            })
            return Object.assign({}, state, { todos })

        case 'changeCheckboxHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(index == action.index) {
                    todos[index].status = !todos[index].status
                }
            })
            console.log(todos)
            return Object.assign({}, state, { todos })

        case 'deleteTodoHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(index == action.index) {
                    todos.splice(index, 1)
                }
            })
            return Object.assign({}, state, { todos, inputValue: 'Задача ' + (todos.length + 1) })

        case 'editTodoHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(index == action.index) {
                    todos[index].edit = true
                }
            })
            return Object.assign({}, state, { todos })

        case 'saveTodoHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(index == action.index) {
                    if (todos[index].name) {
                        todos[index].edit = false
                    } else {
                        alert('Вы не ввели текст задачи!')
                    }
                }
            })
            return Object.assign({}, state, { todos })

        case 'addTodoHandler':

            todos = [...state.todos]
            if(!state.inputValue) {
                alert('Вы не ввели текст задачи!')
                return state
            } else {
                todos.push({name: state.inputValue, status: false, edit: false})
                return Object.assign({}, state, { todos, inputValue: 'Задача ' + (todos.length + 1) })
            }

        case 'resetStore':

            return false

        default:

            return state
    }
}
