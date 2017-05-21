import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {RadioGroup, Radio} from 'react-radio-group';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '', pledged: '', value: 1, value_ns: 1, dateCompleted: {}, dateMilestone: {}, milestoneDescription: '', milestones: [] };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePledgeChange = this.handlePledgeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNSChange = this.handleNSChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMilestoneDateChange = this.handleMilestoneDateChange.bind(this);
    this.handleMilestoneDescriptionChange = this.handleMilestoneDescriptionChange.bind(this);
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handlePledgeChange(e) {
    this.setState({ pledged: e.target.value });  
  }
  handleChange(event, index, value) {
    this.setState({value: value});
  }
  handleNSChange(event, index, value) {
    this.setState({value_ns: value});
  }
  handleDateChange(event, date) {
    this.setState({dateCompleted: date})
  }
  handleMilestoneDateChange(event, date) {
    this.setState({dateMilestone: date})
  }
  handleMilestoneDescriptionChange(e) {
    this.setState({milestoneDescription: e.target.value})
  }
  handleAddMilestone(e) {
    e.preventDefault();
    if (this.state.milestoneDescription == '') {
      return false;
    }
    this.state.milestones.push({date: this.state.dateMilestone, description: this.state.milestoneDescription});
  }
  handleSubmit(e) {
    e.preventDefault();
    let usermail = this.props.usermail;
    console.log("usermail in form", usermail);
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    let pledged = this.state.pledged.trim();
    let support = this.state.value;
    let notsupport = this.state.value_ns;
    let dateCompleted = this.state.dateCompleted;
    let dateMilestone = this.state.dateMilestone;
    let milestones = this.state.milestones;
    if (!text || !author || !pledged) {
      return;
    }
    this.props.onCommentSubmit({ usermail: usermail, author: author, text: text, pledged: pledged, support: support, notsupport: notsupport, dateCompleted: dateCompleted, dateMilestone: dateMilestone, milestones: milestones });
    this.setState({ author: '', text: '', pledged: '', value: 1, value_ns: 1, dateCompleted: {}, dateMilestone: {}, milestoneDescription: '', milestones: [] });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Name of project...'
          style={ style.commentFormAuthor}
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Amount of pledged...'
          style={ style.commentFormPledge}
          value={ this.state.pledged }
          onChange={ this.handlePledgeChange } />
        <DatePicker 
         hintText="Click here to select date"
         floatingLabelText="Date to be completed"
         autoOk={true} 
         container="inline"
         onChange={this.handleDateChange}
         value={this.state.dateCompleted}
         style={ style.commentFormDatePicker} />
        <input
          type='text'
          placeholder='Description...'
          style={ style.commentFormText}
          value={ this.state.text }
          onChange={ this.handleTextChange } />

      <SelectField
          floatingLabelText="Organization you support"
          value={this.state.value}
          onChange={this.handleChange}
          style={ style.commentFormSelect}
        >
          <MenuItem value={1} primaryText="Democratic Senatorial Campaign Committee" />
          <MenuItem value={2} primaryText="Organization 2" />
          <MenuItem value={3} primaryText="Organization 3" />
          <MenuItem value={4} primaryText="Organization 4" />
          <MenuItem value={5} primaryText="Organization 5" />
          <MenuItem value={6} primaryText="Organization 6" />
        </SelectField>
        <SelectField
          floatingLabelText="Organization you don't support"
          value={this.state.value_ns}
          onChange={this.handleNSChange}
          style={ style.commentFormSelect}
        >
          <MenuItem value={1} primaryText="OrganizationNS 1" />
          <MenuItem value={2} primaryText="Donald Trump 2020" />
          <MenuItem value={3} primaryText="OrganizationNS 3" />
          <MenuItem value={4} primaryText="OrganizationNS 4" />
          <MenuItem value={5} primaryText="OrganizationNS 5" />
          <MenuItem value={6} primaryText="OrganizationNS 6" />
        </SelectField>

        <DatePicker 
         hintText="Click here to select date" 
         container="inline"
         floatingLabelText="Date to complete milestone"
         autoOk={true}
         onChange={this.handleMilestoneDateChange}
         value={this.state.dateMilestone}
         style={ style.commentFormDatePicker} />
        <input
          type='text'
          placeholder='Milestone Description'
          style={ style.commentFormMilestoneDescription}
          value={ this.state.milestoneDescription }
          onChange={ this.handleMilestoneDescriptionChange } />
        <FloatingActionButton 
        onTouchTap={this.handleAddMilestone}
        style={ style.commentFormButtonAddMilestone }>
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Date to complete milestone">Date</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Description for each milestone">Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
             {this.state.milestones.map((row, index) =>
              (<TableRow>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn>{row.date.toDateString()}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
              </TableRow>
             ))}
          </TableBody>

        </Table>
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post'/>
      </form>
    )
  }
}

export default CommentForm;
