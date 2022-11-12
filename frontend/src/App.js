import ContextualLayout from './components/ContextualLayout/ContextualLayout';
import './App.css';
import Routing from './Navigation/Routing';

function App() {
  return (
    <>
      <ContextualLayout>
        <Routing />
      </ContextualLayout>
    </>
  );
}

export default App;
