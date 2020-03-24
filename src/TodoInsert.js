import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  //onSubmit호출 시 props로 받아 온 onInsert함수에 현재 value을 피라미터로 넣어 호출한뒤
  //현재 value값을 초기화함
  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');

      //submit이벤트는 새로고침 발생
      //이를 방지하기 위해 이 함수를 호출
      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input placeholder="할 일 입력하기" value={value} onChange={onChange} />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
