import React from 'react'
import axios from 'axios'
import { passCsrfToken } from '../../util/helpers'
import { store } from 'react-notifications-component';
import { Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SweetAlert  from 'react-bootstrap-sweetalert'

class Fruits extends React.Component {
    state = {
        fruits: [],
        showConfirmrAlert: false,
        fruit_id: "",
        fruit_name: ""
    };

    componentDidMount() {
        passCsrfToken(document, axios)
        axios
            .get('/api/fruits')
            .then(response => {
                this.setState({ fruits: response.data.fruits });
            })
    }

    deleteHandler(i, e) {
        e.preventDefault();
        this.setState({showConfirmrAlert: true, fruit_id: i[0], fruit_name: i[1]})
    };

    deletefruit(i) {
        this.setState({showConfirmrAlert: false})
        axios.delete(`/api/fruits/${i}`)
            .then(response => {
                if(response.status == 204){
                    store.addNotification({
                        title: "delete fruit!",
                        message: "successfully delete fruit.",
                        type: "success",
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
                axios
                    .get('/api/fruits')
                    .then(response => {
                        this.setState({ fruits: response.data.fruits });
                    })
            })
    };

    renderAllFruits= () => {
        return(
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.fruits.map(fruit => (
                        <tr key={fruit.id}>
                            <td>{fruit.id}</td>
                            <td>{fruit.name}</td>
                            <td>{fruit.description}</td>
                            <td>
                                <Link to={`/fruits/${fruit.id}/edit`} className="btn btn-info btn-sm">edit</Link>
                                <button onClick={this.deleteHandler.bind(this, [fruit.id, fruit.name])} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </Table>
                <Link to={`/fruits/new`} className="btn btn-primary btn-sm">New fruit</Link>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="delete"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={this.deletefruit.bind(this, this.state.fruit_id)}
                    onCancel={() => this.setState({ showConfirmrAlert: false })}
                    focusCancelBtn
                    show={this.state.showConfirmrAlert}
                >are you sure will delete fruit {this.state.fruit_name} ?
                </SweetAlert>
                {this.renderAllFruits()}
            </div>
        )
    }
}

export default Fruits
