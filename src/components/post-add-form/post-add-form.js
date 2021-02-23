import React, {Component} from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        //to controll element "input" 1)
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
               <input
                   type="text"
                   placeholder="What are you think about"
                   className="form-control new-post-label"
                   onChange={this.onValueChange}
                   /* to controll element "input" 2)*/
                   value={this.state.text}/>
               <button
                  type="submit"
                  className="btn btn-outline">
                      Add Post
               </button>
            </form>
        )
    }
}