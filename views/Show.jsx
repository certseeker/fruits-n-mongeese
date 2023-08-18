const React = require('react');

const Show = (props) => {
  return (
    <div>
      <h1> Show Page </h1>
        The {props.fruit.name} is {props.fruit.color}
        {props.fruit.readyToEat ? " It's ready to eat!" : " It's not ready to eat!"}
    </div>
  )
}

module.exports = Show;

// const React = require('react')
// class Show extends React.Component {
//   render () {
//    const fruit = this.props.fruit
//     return (
//       <div>
//       <h1> Show Page </h1>
//         The {fruit.name} is {fruit.color}
//         {fruit.readyToEat? 'It is ready to eat' : 'It is not ready to eat... Can't touch this' }
//       </div>
//       );
//      }
//    }
//   module.exports  = Show;
