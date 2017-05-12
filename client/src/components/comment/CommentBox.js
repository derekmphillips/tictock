import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

import style from './style';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], timer: null, tabValue: 1 };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    loadCommentsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data});/*.map(project => {
                  console.log(project.author)
                  if (project.author == this.props.userEmail) {
                    return project;
                  }
                }) */
              
            })
    }
    handleCommentSubmit(comment) {
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        console.log(comment);
        axios.post(this.props.url, comment)
            .catch(err => {
                console.error(err);
                this.setState({ data: comments });
            });
    }
    handleCommentDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('Comment deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleCommentUpdate(id, comment) {
        //sends the comment id and new author/text to our api
        axios.put(`${this.props.url}/${id}`, comment)
            .catch(err => {
                console.log(err);
            })
    }
    handleTabChange(value) {
        this.setState({tabValue: value});
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        this.setState( { timer: setInterval(this.loadCommentsFromServer, this.props.pollInterval)});
    }
    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
    }
    render() {
        return ( <div style={ style.commentBox }>
        <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabChange} >
          <Tab label="Project List" value={1}>
            <CommentList 
            onCommentDelete={ this.handleCommentDelete }
            onCommentUpdate={ this.handleCommentUpdate }
            data={ this.state.data }
            usermail={ this.props.userEmail}
            />
          </Tab>
          <Tab label="New Project" value={2}>
            <CommentForm 
            onCommentSubmit={ this.handleCommentSubmit }
            usermail={ this.props.userEmail}
            />
          </Tab>
        </Tabs>
    </div>
        )
    }
}

export default CommentBox;
