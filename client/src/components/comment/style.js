const style = {
  commentBox: {
    width:'80vw',
    margin:'0 auto',
    fontFamily:'Helvetica, sans-serif'
  },
  title: {
    textAlign:'center',
    textTransform:'uppercase'
  },
  commentList: {
    border:'1px solid #f1f1f1',
    padding:'0 12px',
    maxHeight:'70vh',
    overflow:'scroll'
  },
  comment: {
    backgroundColor:'#fafafa',
    margin:'10px',
    padding:'3px 10px',
    fontSize:'.85rem'
  },
  commentForm: {
    margin:'10px',
    display:'flex',
    flexFlow:'row wrap',
    justifyContent:'space-between'
  },
  commentFormAuthor: {
    minWidth:'150px',
    margin:'20px 3px',
    padding:'0 10px',
    borderRadius:'3px',
    height:'40px',
    flex:'1 1 40%'
  },
  commentFormPledge: {
    minWidth:'150px',
    margin:'20px 10px',
    padding:'0 10px',
    borderRadius:'3px',
    height:'40px',
    flex:'1 1 20%'
  },
  commentFormText: {
    flex:'1 1 100%',
    minWidth:'400px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    borderRadius:'3px'
  },
  commentFormMilestoneDescription: {
    minWidth: '150px',
    margin: '24px 3px',
    padding: '0px 10px',
    borderRadius: '3px',
    height: '40px',
    flex: '1 1 45%'
  },
  commentFormSelect: {
    minWidth:'150px',
    margin:'20px 3px',
    height:'40px',
    flex:'1 1 45%'
  },
  commentFormDatePicker: {
    minWidth:'150px',
    flex:'1 1 30%'
  },
  commentFormDateMilestonePicker: {
    minWidth:'150px',
    flex:'1 1 20%'
  },
  commentFormButtonAddMilestone: {
    height: '56px',
    margin: '15px 3px'
  },
  commentFormPost: {
    minWidth:'75px',
    flex:'1',
    height:'40px',
    margin:'5px 3px',
    fontSize:'1rem',
    backgroundColor:'#A3CDFD',
    borderRadius:'3px',
    color:'#fff',
    textTransform:'uppercase',
    letterSpacing:'.055rem',
    border:'none'
  },
  updateLink: {
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'.7rem'
  },
  deleteLink: {
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'.7rem',
    color:'red'
  }
}

module.exports = style;
