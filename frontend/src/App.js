import ContextualLayout from './components/ContextualLayout/ContextualLayout';
import './App.css';
import Routing from './navigation/Routing';


function App() {

	console.log('Whole app rerenders');

	return (
		<>
			<ContextualLayout>
				<Routing />
			</ContextualLayout>
		</>
	);
}

export default App;
