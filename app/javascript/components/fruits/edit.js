import React from 'react'
import axios from 'axios'
import { passCsrfToken } from '../../util/helpers'
import { store } from 'react-notifications-component';
import { Form, Button} from 'react-bootstrap';

class EditFruit extends React.Component {
    state = {
        id: '',
        name: '',
        description: ''
    }

    componentDidMount() {
        passCsrfToken(document, axios)
        var fruit_id = this.props.match.params.id
        axios
            .get('/api/fruits/'+fruit_id)
            .then(response => {
                if(response.data.status == true){
                    var fruit = response.data.fruit
                    this.setState({id: fruit.id, name: fruit.name, description: fruit.description})
                }else{
                    this.props.history.push('/fruits');
                    store.addNotification({
                        message: response.data.message,
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 4000,
                            onScreen: true
                        }
                    });

                }
            })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const fruit = {fruit: {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description
            }
        }

        axios
            .put('/api/fruits/'+this.state.id, fruit)
            .then(response => {
                var notif_type = "info"
                if(response.data.status == true){
                    this.props.history.push('/fruits');
                    notif_type = "success"
                }else{
                    notif_type = "danger"
                }
                store.addNotification({
                    title: "update fruit!",
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
                <h1>Update Fruit</h1>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="description" value={this.state.description} onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default EditFruit
