export default function rootReducer(state, action) {

    let todos = []
    let current_p_id = state.current_p_id

    switch(action.type) {

        case 'changeInputHandler':

            return Object.assign({}, state, {
                inputValue: action.event.target.value
            })

        case 'changeInputTodoHandler':
            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(todo.index == action.index) {
                    todos[index].name = action.event.target.value
                }
            })
            return Object.assign({}, state, { todos })

        case 'changeCheckboxHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(todo.index == action.index) {

                    todos[index].status = !todos[index].status
                    todos[index].checked = !todos[index].checked
                    current_p_id = 0
                }
            })
            return Object.assign({}, state, { todos, current_p_id })

        case 'deleteTodoHandler':

            todos = state.todos.filter(todo => (todo.index != action.index && todo.p_id != action.index))

            todos.map((todo, index) => {
                const new_index = index + 1;
                todos.map(child => {
                    if(todo.index == child.p_id) {
                        child.p_id = new_index
                    }
                })
                todo.index = new_index
            })

            current_p_id = 0

            return Object.assign({}, state, { todos, current_p_id, inputValue: 'Задача ' + (todos.length + 1) })

        case 'editTodoHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(todo.index == action.index) {
                    todos[index].edit = true
                }
            })
            return Object.assign({}, state, { todos })

        case 'saveTodoHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(todo.index == action.index) {
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
                todos.push({index: todos.length + 1, name: state.inputValue, status: 0, edit: false, p_id: state.current_p_id, checked: false, time:action.time})
                return Object.assign({}, state, { todos, inputValue: 'Задача ' + (todos.length + 1) })
            }

        case 'changeCheckboxChildHandler':

            todos = [...state.todos]
            todos.filter((todo, index) => {
                if(todo.index == action.index) {
                    todos[index].checked = !todos[index].checked
                    let close_todo = true;
                    const p_id = todos[index].p_id

                    todos.filter((todo, index) => {
                        if(todo.p_id == p_id && todo.checked == false) {
                            close_todo = false;
                        }
                    })

                    if(close_todo) {
                        todos.filter((todo, index) => {
                            if(todo.index == p_id) {
                                todos[index].status = !todos[index].status
                                todos[index].checked = !todos[index].checked
                                current_p_id = 0
                            }
                        })
                    }
                }
            })
            return Object.assign({}, state, { todos, current_p_id })

        case 'changeSelectHandler':
            return Object.assign({}, state, {
                current_p_id: + action.event.target.value
            })

        case 'resetStore':

            return false

        default:

            return state
    }
}
