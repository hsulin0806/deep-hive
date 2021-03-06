import React from 'react';
import Task from './Task'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
    }

    componentDidMount() {
        this.newTask()
    }

    newTask() {
        fetch("/api/task")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="app">
                    <Task image={data.image}
                          image_id={data.image_id}
                          labels={data.labels}
                          handleComplete={this.newTask.bind(this)}
                    />
                </div>
            );
        }
    }
}