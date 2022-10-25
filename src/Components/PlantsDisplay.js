import axios from "axios";
import { useState, useEffect, React } from "react";
// import { Buffer } from "buffer";
// import ReactDOM from "react-dom";
import "./card.scss"
import Nbar from './Nav.jsx'

function PlantsDisplay() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/fetch")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
  return (
    <>
    <Nbar />
    <br></br>
    <div className="wrapper">
      {/* <h1>Data Retrieving react</h1> */}
      {/* {data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...ne w Uint8Array(singleData.image.data.data))
        );
        return <img src={`data:image/png;base64,${base64String}`} width="300"/>
      })} */}

      
        {data.map((singleData) => {
          const base64data = singleData.image;
          console.log("image's binary value : ",base64data)
          // let base64ToString = Buffer.from(base64data, "base64").toString()
          // this.setState({image: base64ToString })
          return<>
          <div>
            <Card
            img={singleData.image}
          title={singleData.plantName}
          description={singleData.desc}
        />
            
            {/* <p>
                {singleData.plantName}
            </p>
            <img src={singleData.image}/> */}
            </div>
            </>          
          {/* // {base64data ? <img src={`data:image/png;base64,${base64data}`}/>: ''} */}

        }
        )
      }
    </div>
    </>
  );
}

function Card(props) {
  return (
    <>

      <div className="card">
        <div className="card__body">
          <img src={props.img} class="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <p className="card__description">{props.description}</p>
        </div>
        <button className="card__btn">For More Info</button>
      </div>
    </>
  );
}

export default PlantsDisplay