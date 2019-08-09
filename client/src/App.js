import React from 'react';
import FormikForm from './components/UserForm';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Sign In</h1>
        <FormikForm />
      </div>
    );
  }
}

export default App;
