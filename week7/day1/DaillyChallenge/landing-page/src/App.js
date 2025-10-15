import Header from './components/Header';
import Card from './components/Card';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <Card title="Fast Performance" icon="fa-bolt" text="Our app is blazing fast!" />
          <Card title="Responsive Design" icon="fa-mobile-alt" text="Looks great on all devices!" />
          <Card title="Easy to Use" icon="fa-smile" text="Simple and intuitive design." />
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default App;
