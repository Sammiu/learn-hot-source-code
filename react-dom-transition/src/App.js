import React, {useState} from 'react';
import './App.css';
import Col from './components/Col'

function App() {
  const [data, setData] = useState([{}]);

  function addItemClickHandle() {
    data.push({});
    setData([].concat(data))
  }

  function addItemHandle(index) {
    data.splice(index, 0, {});
    setData([].concat(data));
  }

  function removeItemHandle(index) {
    data.splice(index, 1);
    setData([].concat(data))
  }

  return (
      <div className="App">
        <div className={'tool-button__wrap'}>
          <button className={'tool-btn tool-btn-primary'} onClick={addItemClickHandle}>增加元素</button>
        </div>
        <div className={'animate__wrap'}>
          {data.map((item, index) => {
            return (<Col key={index} index={index} onAdd={addItemHandle} onRemove={removeItemHandle}/>)
          })}
        </div>
      </div>
  );
}

export default App;
