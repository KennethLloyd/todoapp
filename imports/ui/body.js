import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      //if hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true} }, { sort: { createdAt: -1 }});
    }
    //else return all tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true }}).count();
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
    Meteor.call('tasks.insert', text);

    //clear form
    target.text.value = "";
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
})
