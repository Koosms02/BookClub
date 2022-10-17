
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from './Api/DataProvider';
import StackNavigation from './Route/StackNavigation';


export default function App() {

  return (
    <DataProvider>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </DataProvider>
  );
}

