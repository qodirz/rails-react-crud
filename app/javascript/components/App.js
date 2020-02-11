import React from 'react'
import Home from './Home'
import Header from './Header'
import Fruits from './fruits/index'
import NewFruit from './fruits/new'
import EditFruit from './fruits/edit'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <ReactNotification />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/fruits" component={Fruits} />
                    <Route exact path="/fruits/new" component={NewFruit} />
                    <Route path="/fruits/:id/edit" component={EditFruit}/>
                </Switch>
            </div>
        )
    }
}

export default App
