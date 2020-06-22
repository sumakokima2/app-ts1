import React,{useState} from 'react';
import { Form, Button } from 'semantic-ui-react';

interface ListItem{
    id:number,
    title:string,
    description:string
  }

type Add1 ={
    id:number|null,
    changepage(type:string,item:ListItem|null):void
    add(item:ListItem) : void
  }

const Add: React.FC<Add1> = (props) => {
    const [Title,setTitle] = useState("");
    const [Description, setDescription] = useState("");

    const onChange = (e:any) =>{
        if(e.target.placeholder==="Title"){
            setTitle(e.target.value);
        }
        else{
            setDescription(e.target.value);
        }
    }
    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Title' placeholder='Title' value ={Title} onChange={onChange} />
            </Form.Group>
            <Form.TextArea label='Detail' placeholder='what should I do?' value= {Description} onChange={onChange}/>
            <Button primary onClick={()=>props.add({'title':Title,'description':Description,'id':0})}>Add</Button>
            <Button secondary onClick={()=>props.changepage("list",null)}>Cancel</Button>
        </Form>
    );

}

export default Add;