import React, { useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    //새로 추가함 { type: 'INSERT' , todo: {id:1 , text : 'todo', checked: false }}
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    //제거함 {type: 'REMOVE', id:1 }
    case 'TOGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    //토글
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고윳값으로 사용될 id
  //ref를 사용해 변수 담기
  const nextId = useRef(2501);

  //추가
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  //삭제
  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  //수정
  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;

// 함수형 업데이트 사용 (setTodos를 사용할때 todo => 형태로 사용함 / 새로운 상태를 피라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 힘수를 넣을 수 있음)
