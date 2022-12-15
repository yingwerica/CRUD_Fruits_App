import React, { Component } from 'react'

export default class Edit extends Component {
  render() {
    const {fruit} = this.props;
    return (
      <div>
        <h1>Edit Fruit</h1>
        <form>
          Name: <input type="text" name="name" defaultValue={fruit.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={fruit.color}/><br/>
          Is Ready To Eat:
              {fruit.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
        </form> 
       </div>
    )
  }
}

