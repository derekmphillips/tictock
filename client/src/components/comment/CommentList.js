import React, { Component } from 'react';
import moment from 'moment'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
  render() {
    let comments = this.props.data.filter(comment => {
      console.log("comment:", comment);
      console.log("usermail", this.props.usermail);
      return comment.usermail == this.props.usermail;
    })
    let commentNodes = comments.map(comment => {
      return (
        <Comment
          author={ comment.author }
          dateCompleted={ comment.dateCompleted }
          uniqueID={ comment['_id'] }
          onCommentDelete={ this.props.onCommentDelete }
          onCommentUpdate={ this.props.onCommentUpdate }
          key={ comment['_id'] }>
        <Table style={{border:'1px solid rgb(214, 209, 209)'  }}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Date to complete milestone">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Description for each milestone">Description</TableHeaderColumn>
              <TableHeaderColumn tooltip="Time remaining">Time Remaining</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comment.milestones.map((ms, index) =>
              (<TableRow>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn>{new Date(ms.date).toDateString()}</TableRowColumn>
                <TableRowColumn>{ms.description}</TableRowColumn>
                <TableRowColumn>{moment(comment.dateCompleted).from(moment(ms.date))}</TableRowColumn>
              </TableRow>
             ))}
          </TableBody>

        </Table>
        </Comment>
      )
    });

    return (
      <div style={ style.commentList }>
          {commentNodes}
      </div>

    );
  }
}

export default CommentList;
