const React = require('react');

class Index extends React.Component {
    render() {
        const { veggies } = this.props;
        return (
            <div>
                <div>
                    <h1>Fruits Index Page</h1>
                    <ul>
                        {fruits.map((fruit, i) => {
                            return (
                                <li>
                                    The{' '}
                                    <a href={`/fruits/${i}`}>
                                    {fruit.name}
                                    </a>{' '}
                                    is {fruit.color} <br></br>
                                    {fruit.readyToEat
                                        ? `It is ready to eat`
                                        : `It is not ready to eat`}
                                    <br />
                                    {/* its going to send a request to the endpoint which is what is in server.js. endpoints is where your CRUD comes from aka restful routes. This is where create, delete, ect. These are used to send data to the database.  */}
                                    {/* forms can only send get and post request by default, so we need method override to delete and put in a form. teh overide method goes behind the action you want to override */}
                                    <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                                        {/* the button will say delete but the type is a submit button. sometimes I see submit in caps bc in that case the submit will be in all caps.  */}
                                        
                                    <input type="submit" value='delete' />
                                    </form>
                                    {/* an href is an automatic get request.  */}
                                    <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <nav>
                        <a href="/fruits/new">Create a New Fruit</a>
                    </nav>
                </div>
            </div>
        );
    }
}

module.exports = Index;