import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { deflate } from 'zlib';
import { List } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import {useState,useCallback} from 'react';

interface ListItem{
    id:number,
    title:string,
    description:string
  }
  interface Edit1{
    item: ListItem,
    edit(item:ListItem):void,
    changepage(type:string,item:ListItem|null):void
  }
  
  const Edit: React.FC<Edit1> = (props) => {
    const [Title,setTitle] = useState(props.item.title);
    const [Description,setDescription] = useState(props.item.description);
  
    console.log("hwhwhw");
    
    const onChange = (e:any) =>{
      if(e.target.placeholder==="Title"){
          setTitle(e.target.value);
      }
      else{
          setDescription(e.target.value);
      }
  }
    return (
      <div>
        <Form>
              <Form.Group widths='equal'>
                  <Form.Input fluid label='Title' placeholder='Title' value ={Title} onChange={onChange} />
              </Form.Group>
              <Form.TextArea label='Detail' placeholder='what should I do?' value= {Description} onChange={onChange}/>
              <Button primary onClick={()=>props.edit({'title':Title,'description':Description,'id':props.item.id})}>Edit</Button>
              <Button secondary onClick={()=>props.changepage("list", null)}>Cancel</Button>
        </Form>
      </div>
    ); 
  }

  export default Edit;