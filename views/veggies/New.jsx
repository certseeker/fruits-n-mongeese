const React = require('react');

class New extends React.Component {
  render() {
    return (
        <div>
            <h1>New Veggie page</h1>
            {/* NOTE: action will be the route, method will be the HTTP verb */}
            {/* action= always refer to matching post in server.js. post refers to the methods. the name is the id of the component. before input, the items before the colon is what the page says before the text box. input is the text box, you input the data. the submit type is the submit button and we name empty bc if you don't it will submit the name into the input */}
            <form action="/veggies" method="POST">
              Name: <input type="text" name="name" /><br/>
              Color: <input type="text" name="color" /><br/>
              Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
              <input type="submit" name="" value="Create Veggie"/>
            </form>
        </div>
        );
  }
}

module.exports = New;