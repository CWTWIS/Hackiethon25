import { useState } from 'react';
import PropTypes from 'props-types'

TodoForm.propTypes = {
    onAddItem: PropTypes.func
}

const TodoForm = ({ onAddItem }) => {
  const [input, setInput] = useState('');

  const atSubmit = (e) => {
    e.preventDefault();
    if (input === '') {
      return;
    }
    setInput('');
    onAddItem(input);
  };

  return (
    <section>
      <form onSubmit={atSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>
    </section>
  );
};

export default TodoForm;
