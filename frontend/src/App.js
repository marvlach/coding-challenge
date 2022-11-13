import ContextualLayout from './components/ContextualLayout/ContextualLayout';
import './App.css';
import Routing from './navigation/Routing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './store/userSlice';
import { getTokenFromLocalStorage } from './utils/manageLocalStorage';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(store => store.user);
	console.log('Whole app rerenders');

	useEffect(() => {
		if (!user.isAuth && getTokenFromLocalStorage()) {
			dispatch(getUserData());
		}
	}, [user.isAuth, dispatch]);

	return (
		<>
			<ContextualLayout>
				<Routing />
			</ContextualLayout>
		</>
	);
}

export default App;
