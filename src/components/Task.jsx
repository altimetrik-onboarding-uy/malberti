import React, {useRef, useState} from 'react';
import ItemTypes from './ItemTypes';
import { useDrag, useDrop } from 'react-dnd-cjs';

//import bootstrap
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Task = ({ name, content, origin, index, moveCard, deleteItem, modify }) => {

  const item = { name, content, origin, index, type: ItemTypes.CARD }
  
  const [{ opacity }, drag] = useDrag({
    item,
    end(dropResult, monitor) {
      if (dropResult && monitor.didDrop()) {
        if(dropResult.allowedDropEffect === dropResult.dropEffect){
          if(monitor.getDropResult().title !== item.origin){
            deleteItem(item);
          }
        }
      }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
      isDragging: monitor.isDragging()
    }),
  })

  const ref = useRef(null)

  const [,drop] = useDrop({

    accept: ItemTypes.CARD,

    hover(card, monitor){
      if (!ref.current) {
        return
      }
      const dragIndex = card.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      // determinar tamano de elemento
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // obtener punto medio vertical
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // determinar posicion del mouse
      const clientOffset = monitor.getClientOffset()

      // obtener distancia desde el top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Moviendo hacia abajo, que haga el cambio cuando pase la mitad de un elemento
      // Moviendo hacia arriba, que lo mueva cuando pase la mitad del elemento
      // hacia abajo
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // hacia arriba
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // mover la card
      moveCard(dragIndex, hoverIndex)
      card.index = hoverIndex
    }
  })
  drag(drop(ref))
  // toggle de modal
  const [modal, modalToggle] = useState(false) ;
  //variables para cambiar de nombre
  const [newName, changeName] = useState('');
  const [newContent, changeContent] = useState('');
  // manejador de errores
  const[error, errorHandle] = useState('');

  function toggleModal(){
    errorHandle('');
    changeName('');
    changeContent('');
    modalToggle(!modal);
  }

  return (
    <div ref={ref} style={{ opacity }} >
      <Card bg="dark" text="white" onClick={() => modalToggle(!modal)}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        size="sm"
        show={modal}
        onHide={toggleModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Change Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? <p className="error">{error}</p> : <div></div> }
        <Form.Group className="" controlId="changeCard">
          <Form.Control 
            className="my-3"
            type="Task name"
            placeholder="Card title..."
            onChange={event => changeName(event.target.value)}
          />
          <Form.Control 
            className="my-3"
            type="Task description"
            placeholder="Card content..." 
            onChange={event => changeContent(event.target.value)}
          />
          <Button 
            className="mx-1" 
            variant="success"
            onClick={() => modify(name, content, newName, newContent)}
          >
            Add
          </Button>

      </Form.Group>

        </Modal.Body>
      </Modal>

    </div>
  )
}
export default Task


