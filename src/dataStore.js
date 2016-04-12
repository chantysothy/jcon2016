'use strict';

import React from 'react-native';
import _     from 'lodash';

let {
  AsyncStorage
} = React;

let fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

import localData from '../initial_data.js';


export default {

  fetchNews: () => {
    return new Promise((resolve, reject) => {
      fetch('http://con-nexus.bgun.me/api/news?con_id=jcon2016', fetchOptions)
        .then(resp => resp.json())
        .then(data => {
          resolve(data.items);
        })
        .catch(e => {
          global.makeToast("Error fetching news. You need an Internet connection for this.", "error");
          resolve([]);
        })
        .done();
    });
  },

  fetchPackageFromNetwork: () => {
    return new Promise((resolve, reject) => {
      fetch('http://con-nexus.bgun.me/api/con/jcon2016', fetchOptions)
        .then(resp => resp.json())
        .then(data => {
          resolve(data);
        })
        .catch(e => {
          resolve(false);
        })
        .done();
    });
  },

  fetchPackageFromStorage: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('con_data')
        .then(resp => {
          resolve(JSON.parse(resp));
        })
        .catch(e => {
          resolve(false);
        })
        .done();
    });
  },

  fetchPackageFromLocalFile: () => {
    let data = localData();
    console.log(data);
    return Promise.resolve(data);
  },

  saveToStorage: (data) => {
    return new Promise((resolve, reject) => {
      let str = JSON.stringify(data);
      AsyncStorage.setItem('con_data', str)
        .then(resp => {
          resolve(true);
        })
        .catch(e => {
          resolve(false);
        })
        .done();
    });
  },

  fetchTodos: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('todo')
        .then(resp => {
          let todos = new Set(JSON.parse(resp));
          global.todos = todos;
          resolve(todos);
        })
        .catch(e => {
          global.makeToast("Error fetching to-do list", "error");
          resolve(false);
        })
        .done();
    });
  },

  saveTodos: () => {
    let todo_array = Array.from(global.todos);
    console.log("saving todos");
    AsyncStorage.setItem('todo', JSON.stringify(todo_array))
      .then(resp => {
        console.log("save todos", resp);
      })
      .catch(e => {
        global.makeToast("Error saving to-do list", "error");
        resolve(false);
      })
      .done();
  }

}