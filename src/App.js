import React, {Component} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
    state = {
        contacts: []
    };

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        ContactsAPI.remove(contact);
    };

    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <ListContacts onDeleteContact={this.removeContact}
                                  contacts={this.state.contacts} />
                    )} />
                <Route path="/create" component={CreateContact} />
            </div>
        );
    }
}

export default App;
