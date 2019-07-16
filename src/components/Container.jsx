import React, { Component } from 'react';
import Target from './Target';

import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';

//jumbotrom import
import Jumbotron from 'react-bootstrap/Jumbotron';
//form imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Container extends Component{

  constructor(){
    super()
    this.state = {
      pipes: [],
      newPipeName: '',
      showChangePipeName: false,
      changePipeName: '',
      errorNew: '',
      errorChange:''
    }
  }

  addPipe(){

    const name = this.state.newPipeName;
    let pipes = this.state.pipes;

    let exist = false;
    let i = 0;

    while(i < pipes.length && !exist){
      if(name === pipes[i]){
        exist = true;
      }
      else{
        i++;
      }
    }
    if(!exist){
      if(this.state.newPipeName !== ''){
        pipes.push(name);
        this.setState({
          pipes,
          errorNew: ''
        })
      }
      else{
        this.setState({ errorNew: 'You must fill the input before pressing set!'})
      }
    }
    else{
      this.setState({ errorNew: 'This pipeline name is already in use!'})
    }
  }

  deletePipe(index){
    let pipes = this.state.pipes;
    pipes.splice(index, 1);
    this.setState({ pipes });
  }

  toggleChangeNameForm(){
    const flag = !(this.state.showChangePipeName);
    this.setState({
      showChangePipeName: flag,
    })
  }

  changePipeName(oldTitle, newTitle){
    let update = this.state.pipes;

    let result = true;
    let i=0;
    while(i < update.length && result){
      if(newTitle === update[i]){
        result = false;
      }
      else{
        i++;
      }
    }

    if(result){
      update = update.map(el => {
        if(oldTitle === el){
          el = newTitle;
        }
        return el
      })
      this.setState({
        pipes: update,
      })
    }
    return result
  }

  renderPipes(){
      const pipes = this.state.pipes.map((pipeName, i) => {

      return(
        <article key={`${i}${pipeName}`} className='col-lg-3 col-md-4 mt-3'>
          <Jumbotron className='p-3'>
            <Target 
              allowedDropEffect="move" 
              title={pipeName} 
              index= {i} 
              deletePipe = {this.deletePipe.bind(this)}
              changePipeName = {this.changePipeName.bind(this)}  
            />
          </Jumbotron>
        </article>
      )
    })
    
    return pipes
  }
  
  render(){
    return(
      <div className="container">
        <div className="row">
          <Form inline className="col-md-6 mt-5">
            <div className="row">
              <div className="col-12">
                <Form.Control 
                  type="text" 
                  placeholder="Pipeline name" 
                  className="mr-sm-2" 
                  onChange={event => this.setState({ newPipeName: event.target.value })}
                />
                <Button variant="outline-success" onClick={() => this.addPipe()}>Set</Button>
              </div>
              <div className="col-12">
                {this.state.errorNew ? <p className="error">{this.state.errorNew}</p> : <div></div>}
              </div>
            </div>
          </Form>

        </div>
        
        <div className="row">

        <DndProvider backend={HTML5Backend}>
          {this.renderPipes()}
        </DndProvider>
        </div>
      </div>

    )
  }
}

// export default DragDropContext(HTML5Backend)(Container)
export default Container