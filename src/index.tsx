import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { List } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import {useState} from 'react';
import Edit from './Edit';
import Add from　'./Add';

interface ListItem{
  id:number,
  title:string,
  description:string
}
interface Edit{
  item: ListItem,
  edit(item:ListItem):void,
  changepage(type:string,item:ListItem|null):void
}

type Props2 ={
  item:ListItem,
  delate(id:number):void,
  changepage(type:string,item:ListItem|null):void
  edit(item:ListItem):void,
}

const Item: React.FC<Props2> = (props) =>{
  return(
    <List.Item>
    <List.Icon onClick={ () => props.delate(props.item.id)} name='check circle outline' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{props.item.title}</List.Header>
      <List.Description as='a'>{props.item.description}</List.Description>
    </List.Content>
    <List.Icon onClick={()=>props.changepage('edit',props.item)} name='edit' size='large' verticalAlign='middle' />
  </List.Item>
  )
}

type Props1 ={
  items:ListItem[],
  delate(id:number) : void,
  changepage(type:string,item:ListItem|null):void
  edit(item:ListItem) : void
}

const ListItems: React.FC<Props1> = (props) => {
  const array:any[] = props.items.map(
      (item: ListItem) => (
        <Item key={item.id} item={item} delate={props.delate} edit={props.edit} changepage={props.changepage}/>
      ));
    
      return (
        <List divided relaxed>
        {array}
        </List>
        );

}


const App: React.FC = () => {
  const [data,setdata] = useState([{id:0,title:"title1",description:"aaaaaaaaa"},{id:1,title:"title2",description:"bbbbbbb"}]);
    const [selected,setSelected] = useState({id:0,title:"title1",description:"aaaaaaaaa"});
    const [hieris, sethieris] = useState("list");
    
     const delate=(id:number) => {
       setdata(data.filter(item => item.id !== id));
       sethieris("list");
      };
      const edit=(item:ListItem) => {
        const arr = data.slice();
        arr[item.id] = item;
        console.log(arr);
        setdata(arr);
        sethieris("list");
     };
   
     const add = (add:ListItem) => {
      const arr = data.slice();
      const newarr = [...arr,add];
      newarr.map((ar,index) =>{
          ar.id = index;
      });
      setdata(newarr);
      sethieris("list");
  }

    const changepage = (type:string,arr:ListItem|null) => {
        if(type==='edit' && arr!=null){
            setSelected(arr);
            sethieris(type);
            showpage(type); 
        }
        else{
            sethieris(type);
            showpage(type); 
        }
    }
    const showpage = (type:string) => {
      console.log(hieris);
      switch(hieris){
        case 'list' : return(
            <div>
              <Header size='huge' textAlign='center'>To Do List2</Header>
              <Button onClick={() => changepage('add',null)}>Add</Button>
              <ListItems items={data} delate={delate} edit={edit} changepage = {changepage} />
            </div>
            ); 
        case 'edit' : return <Edit item={selected} edit={edit} changepage={changepage}/>
        case 'add' :return <Add id ={data.length} add={add} changepage={changepage}/>
      }
    }
return (<div>{ showpage("list") }</div>)

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
