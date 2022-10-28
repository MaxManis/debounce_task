import React, {useCallback, useState} from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

const DEBOUNCE_WAIT = 1000;

// DEBOUNCE DECORATOR:
const debounce = (func: (qwery: string) => void, wait: number) => {
  let timer: NodeJS.Timeout;

  return (newQwery: string) => {
    clearTimeout(timer);

    timer = setTimeout(func, wait, newQwery);
  };
};

function App() {
  const [qwery, setQwery] = useState('');
  const [inputQwery, setInputQwery] = useState('');

  const setQweryDebounce = useCallback(
      debounce(setQwery, DEBOUNCE_WAIT),
      [],
  );

  return (
    <div className="box">
        <h1 className="title is-2">Debounce example:</h1>

        <div className="field has-addons">
            <p className="control">
                <input
                    className="input"
                    type="text"
                    placeholder="Amount of money"
                    value={inputQwery}
                    onChange={(event) => {
                        setQweryDebounce(event.target.value);
                        setInputQwery(event.target.value);
                    }}
                />
            </p>

            <p className="control">
                <button
                    className="button is-primary"
                    onClick={() => {
                        setInputQwery('');
                        setQwery('');
                    }}
                >
                    Clear
                </button>
            </p>
        </div>

        <div className="field has-addons">
            <p className="control title is-4">
                {`Current value: ${qwery}`}
            </p>
        </div>
    </div>
  );
}

export default App;
