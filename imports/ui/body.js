import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './body.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
;
  },
});

Template.body.events({
  'submit .new-task'(event) {
    console.log(event);
    //prevent default browser form submit
    event.preventDefault();

    //get value from form element
    const target = event.target;
    const text = target.text.value;

    //insert task into collection
    Tasks.insert({
      text,
      createdAt: new Date() //current time
    })

    //clear form
    target.text.value = "";
  }
})
