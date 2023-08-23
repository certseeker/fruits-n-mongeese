const React = require('react');

class Index extends React.Component {
    render() {
        const { fruits } = this.props;
        return (
            <div>
                <div>
                    <h1>Fruits Index Page</h1>
                    <ul>
                        {fruits.map((fruit, i) => {
                            return (
                                <li>
                                    The{' '}
                                    {/* the dot in front of id bc I am grabbing the id from the fruit in the map on line 11 */}
                                    <a href={`/fruits/${fruit._id}`}>
                                    {fruit.name}
                                    </a>{' '}
                                    is {fruit.color} <br></br>
                                    {fruit.readyToEat
                                        ? `It is ready to eat`
                                        : `It is not ready to eat`}
                                        <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                                            <input type="submit" value="DELETE" />
                                        </form>
                                    <br />
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