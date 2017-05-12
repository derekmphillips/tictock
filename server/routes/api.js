const express = require('express');


const router = new express.Router();
let Comment = require('mongoose').model('Comment')
router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});


//adding the /comments route to our /api router
router.route('/comments')
    //retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var comment = new Comment();
        (req.body.usermail) ? comment.usermail = req.body.usermail: null;
        (req.body.author) ? comment.author = req.body.author: null;
        (req.body.text) ? comment.text = req.body.text: null;
        (req.body.pledged) ? comment.pledged = req.body.pledged: null;
        (req.body.support) ? comment.support = req.body.support: null;
        (req.body.notsupport) ? comment.notsupport = req.body.notsupport: null;
        (req.body.dateCompleted) ? comment.dateCompleted = req.body.dateCompleted: null;
        (req.body.dateMilestone) ? comment.dateMilestone = req.body.dateMilestone: null;
        (req.body.milestones) ? comment.milestones = req.body.milestones: null;

        comment.save(function(err) {
            if (err)
                res.send(err);
            console.log('Comment successfully added')
            res.json({ message: 'Comment successfully added!' });
        });
    });

//Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
    //The put method gives us the chance to update our comment based on the ID passed to the route
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            //setting the new author and text to whatever was changed. If nothing was changed
            // we will not alter the field.
            (req.body.author) ? comment.author = req.body.author: null;
            (req.body.text) ? comment.text = req.body.text: null;
            //save comment
            comment.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })
    //delete method for removing a comment from our database
    .delete(function(req, res) {
        //selects the comment by its ID, then removes it.
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    });


module.exports = router;
