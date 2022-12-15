const React = require("react");

class Index extends React.Component {
    render() {
      return (
        <div>
          <h1>Fruits index page</h1>
          <nav>
            <a href='/fruits/new'>Create a New Fruit</a>
          </nav>
          <ul>
            {this.props.fruits.map((fruit, i) => {
              return (
                <li>
                  The <a href={`/fruits/${fruit.id}`}> {fruit.name} </a> is{" "}
                  {fruit.color}.
                  {fruit.readyToEat
                    ? ` It is ready to eat. Yum yum!`
                    : ` It is not ready to eat. Om nom nom.`}
                  <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                      <input type="submit" value="DELETE"/>
                  </form>
                  <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
  
  module.exports = Index;
  