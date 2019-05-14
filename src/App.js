import React from 'react';
import Main from './containers/Main'
import {BrowserRouter} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel, faTimesCircle, faCheckCircle);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main/>
      </div>
    </BrowserRouter>

  );
}

export default App;
