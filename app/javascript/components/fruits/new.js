import React from 'react'
import axios from 'axios'
import { passCsrfToken } from '../../util/helpers'
import { store } from 'react-notifications-component';

class NewFruit extends React.Component {
    state = {
        name: '',
        description: ''
    }

    componentDidMount() {
        passCsrfToken(document, axios)
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const fruit = {
            name: this.state.name,
            description: this.state.description
        }

        axios
            .post('/api/fruits', fruit)
            .then(response => {
                var notif_type = "info"
                if(response.data.status == true){
                    this.props.history.push('/fruits');
                    notif_type = "success"
                }else{
                    notif_type = "danger"
                }
                store.addNotification({
                    title: "Create fruit!",
                    message: response.data.message,
                    type: notif_type,
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 4000,
                        onScreen: true
                    }
                });
            })
    }

    render() {
        return (
            <div className="container">
                <h1>New Fruit</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                        name="name"
                        onChange={this.handleChange}
                        placeholder="name"
                        type="text"
                    />
                    <input
                        name="description"
                        onChange={this.handleChange}
                        placeholder="description"
                        type="text"
                    />
                    <button className="btn btn-dark">Create Fruit</button>
                </form>
            </div>
        )
    }
}

export default NewFruit
