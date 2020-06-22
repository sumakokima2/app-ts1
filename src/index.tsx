import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { deflate } from 'zlib';
import { List } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import {useState,useCallback} from 'react';

interface ListItem{
  id:number,
  title:string,
  description:string
}

type Props2 ={
  item:ListItem,
  delate(id:number):void
}

const Item: React.FC<Props2> = (props) =>{
  console.log(props.item.id);
  return(
    <List.Item>
    <List.Icon onClick={ () => props.delate(props.item.id)} name='check circle outline' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{props.item.title}</List.Header>
      <List.Description as='a'>{props.item.description}</List.Description>
    </List.Content>
    
  </List.Item>
  )
}

type Props1 ={
  items:ListItem[],
  delate(id:number) : void
}

const ListItems: React.FC<Props1> = (props) => {
  console.log(props.items);
  return(
    <div>{props.items.map(
      (item: ListItem) => (
        <Item key={item.id} item={item} delate={props.delate} />
      ))}</div>
    )
}

const App: React.FC = () => {
  const [data,setdata] = useState([{id:0,title:"title1",description:"aaaaaaaaa"},{id:1,title:"title2",description:"bbbbbbb"}]);
    const [selected,setSelected] = useState("");
    const [hieris, sethieris] = useState("list");
    
     const delate=(id:number) => {
       setdata(data.filter(item => item.id !== id));
       sethieris("list");
    };
  return (<ListItems items={data} delate={delate}/>); 
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
