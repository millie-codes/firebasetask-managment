// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWJ80uQhAyyKzYaaSzBepi2_vraQ6xcwc",
  authDomain: "taskapp-7ab65.firebaseapp.com",
  projectId: "taskapp-7ab65",
  storageBucket: "taskapp-7ab65.appspot.com",
  messagingSenderId: "694806768300",
  appId: "1:694806768300:web:d80b77c0ca9f17d5394d09",
  measurementId: "G-Q72XYRL3CR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Add task to Firestore
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  if (task) {
      db.collection('tasks').add({
          task: task,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
          taskInput.value = '';
      }).catch((error) => {
          console.error('Error adding task: ', error);
      });
  }
});

// Get tasks from Firestore and listen for changes
db.collection('tasks').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
  taskList.innerHTML = '';
  snapshot.forEach((doc) => {
      const li = document.createElement('li');
      li.textContent = doc.data().task;
      const button = document.createElement('button');
      button.textContent = 'Delete';
      button.onclick = () => {
          db.collection('tasks').doc(doc.id).delete().catch((error) => {
              console.error('Error deleting task: ', error);
          });
      };
      li.appendChild(button);
      taskList.appendChild(li);
  });
});
