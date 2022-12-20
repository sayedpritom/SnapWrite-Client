import './App.css';
import ImageCard from './components/ImageCard/ImageCard';
import InformationCard from './components/InformationCard/InformationCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // Hello
    <div className="App">
        <ImageCard/>
        <InformationCard/>
    </div>
  );
}

export default App;
