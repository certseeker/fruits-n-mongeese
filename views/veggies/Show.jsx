const React = require('react');

const Show = (props) => {
  return (
    <div>
      <h1> Show Page </h1>
        The {props.veggie.name} is {props.veggie.color}
        {props.veggie.readyToEat ? " It's ready to eat!" : " It's not ready to eat!"}
    </div>
  )
}

module.exports = Show;