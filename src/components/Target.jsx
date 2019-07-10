import React, {useState} from 'react';
import { useDrop } from 'react-dnd-cjs';
import ItemTypes from './ItemTypes';
import Task from './Task';

import update from 'immutability-helper';

//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Target = ({ title, index, deletePipe, changePipeName }) => {

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (CARD, monitor) => ({
      title: title,
      add: addCard(CARD, monitor)
    }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  function addCardForm(){
    return(
      <Form.Group className="newCardForm" controlId="newCard">
          <Form.Control 
            className="mt-3"
            type="Task name"
            placeholder="Card title..."
            onChange={event => getName(event.target.value)}
            />
          <Form.Control 
            className="mb-3"
            type="Task description"
            placeholder="Card content..." 
            onChange={event => getContent(event.target.value)}
            />
          { error ? <p className="error">{error}</p> : <div></div>}
          <Button 
            className="mx-1" 
            variant="success"
            onClick={() => createCard()}
          >
            Add
          </Button>
          <Button 
            className="mx-1" 
            variant="danger"
            onClick={() => {
                errorHandle('');
                handleCardForm(!showNewCardForm)
              }
            }
          >
            Cancel
          </Button>
      </Form.Group>
    );
  }
  //lista de cards
  const [cardList, addToCardList] = useState([]);
  //cambio de nombre
  const [newName, getName] = useState('');
  const [newContent, getContent] = useState('');
  //activador de form para cambiar de nombre la pipeline
  const [showChangePipeName, handlePipeName] = useState(false);
  const [newPipeName, getPipeName] = useState('');
  //flags
  const [showNewCardForm, handleCardForm] = useState(false);
  //manejador de errores
  const [error, errorHandle] = useState('');
  const [errorChange, errorChangeHandle] = useState('');


  function createCard(){
    errorHandle('');

    let exist = false;
    let i = 0;

    while(i < cardList.length && !exist){
      if(newName === cardList[i].name){
        exist = true;
      }
      else{
        i++;
      }
    }

    if(!exist){
      if(newName !== '' && newContent !== ''){
        const newTask = {
          name: newName,
          content: newContent,
          origin: title,
          type: 'card'
        }
        let list = cardList;
        list.push(newTask);
        addToCardList(list);
        handleCardForm(!showNewCardForm);
        getName('');
        getContent('');
      }
      else{
        errorHandle('Fill all the inputs before pressing save!')
      }
    }
    else{
      errorHandle('This name is already in use!')
    }
  }

  function addCard(item, monitor){

    if(item.origin !== title){
      let list = cardList;
      list =  list.filter(card => card.name !== item.name)
      item.origin = title;
      list.push(item);
      addToCardList(list);
    }
  }

  function deleteItem(item){
    let list = cardList;
    list =  list.filter(card => card.name !== item.name)
    addToCardList(list);
  }

  const moveCard =
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragCard = cardList[dragIndex]
        addToCardList(
          update(cardList, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          })
        )
      }
    }


  function modifyItems(name, content, newName, newContent){
    if(newName !== '' || newContent !== ''){

      let update = cardList.map(card => {
        if(newName !== '' && card.name === name){
          card.name = newName;
        }
        if(newContent !== '' && card.content === content){
          card.content = newContent;
        }
        return card
      })

      addToCardList(update);
    }
  }

  

  function sendChange(title, newPipeName){
    if( newPipeName !== ''){
      errorChangeHandle('');
      const result = changePipeName(title, newPipeName);
      if(result){
        handlePipeName(!showChangePipeName);
      }
      else{
        errorChangeHandle('This name is already in use, try a different one!');
      }
    }
    else{
      errorChangeHandle('You must fill the input before pressing set!');
    }

  }

  function renderCards(){
    const all = cardList.map((card, i) => {
      return(
        <div key={i} className="mt-3">
          <Task 
            name={card.name} 
            content={card.content} 
            origin={card.origin}
            index= {i}
            deleteItem={deleteItem} 
            moveCard={moveCard}
            modify={modifyItems}
          />
        </div>
      )
    })
    return all
  }

  function renderTitle(title, index){
    return(
      <div className="col-12">
        <div className="row align-items-center">
          <div className="col-8">
            <h1 onClick={() => console.log(cardList)}>{title}</h1>
          </div>
          <div className="col-4">
            <DropdownButton
              alignRight
              title='Edit'
              size="sm"
            >
              <Dropdown.Item onClick={() => handlePipeName(!showChangePipeName)}>Edit title</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => deletePipe(index)}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    )
  }

  function renderChangeNameForm(title, index){
    return(
      <div className="col-12">

        <div className="row justify-content-center">
          <Form className="col-12">
              <Form.Control 
                  type="text" 
                  placeholder="New pipeline name" 
                  onChange={event => getPipeName(event.target.value)}
                  className="col-12 mb-1"
              />
              <Button 
                variant="success" 
                onClick={() => sendChange(title, newPipeName)}
                className="col-6"
              >
                Set
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  handlePipeName(!showChangePipeName);
                  errorChangeHandle('');
                }}
                className="col-6"
              >
                Cancel
              </Button>
          </Form>
          <div className="col-12">
            {errorChange ? <p className="error">{errorChange}</p> : <div></div> }
          </div>
        </div>
      </div>
    )
  }

  
  let pipeTitle = showChangePipeName ? renderChangeNameForm(title, index) : renderTitle(title, index)
  const addNewCard = showNewCardForm ? addCardForm() : <p onClick={() => handleCardForm(!showNewCardForm)} className="m-0">+Add new card</p>;
  return (
      <div ref={drop} className="row no-gutters">
        {pipeTitle}
        <div className="col-12">
          {renderCards()}
        </div>
        <div className="col-12">
          {addNewCard}
        </div>
      </div>
    
  )
}


export default Target