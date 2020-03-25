import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  //고윳값으로 사용될 id
  //ref를 사용해 변수 담기
  const nextId = useRef(4);

  //추가
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1;
  }, []);

  //삭제
  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  //수정
  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
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
