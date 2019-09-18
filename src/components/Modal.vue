<template>
  <div class="modal" :style='modalVisibility'>
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" :style='cancelVisibility' @click.prevent='handleCancel'>&times;</span>
        <h3>{{ header }}</h3>
      </div>
      <div class="modal-body">
        <p>{{ body }}</p>
      </div>
      <div class="modal-footer">
        <button :style='cancelVisibility' @click='handleCancel'>Cancel</button>
        <button @click='handleOk'>Ok</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['visibility', 'header', 'body', 'onOk', 'onCancel'],
  computed: {
    modalVisibility: function () {
      return this.visibility ? 'display: block' : 'display: none'
    },
    cancelVisibility: function () {
      return this.onCancel ? 'display: inline-block' : 'display: none'
    }
  },
  methods: {
    handleCancel () {
      if (this.onCancel) this.onCancel()
    },
    handleOk () {
      if (this.onOk) this.onOk()
    }
  }
}
</script>

<style scoped>
/* Modal Background */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border-radius: 6px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 1.5em;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #007ae5;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: .1em .8em;
  border-radius: .25em .25em 0 0;
  background-color: #003c71;
  color: white;
  text-align: left;
}

h3 {
  margin: .5em 0;
}

.modal-body {
  padding: 0 1em;
  color: #00284c;
  font-weight: bold;
  text-align: justify;
}

.modal-footer {
  padding: 0 .8em;
  border-radius: 0 0 .25em .25em;
  background-color: #003c71;
  color: white;
  text-align: right;
}

button {
  width: 5em;
  height: 2em;
  margin: .5em;
  border: none;
  border-radius: .25em;
  background-color: #fff;
  color: #003c71;
  font-size: 1em;
}

button:hover {
  color: #fff;
  background-color: #005fb2;
}

button:focus {
  outline: none;
}

@media screen and (max-width: 640px) {
  .modal-content {
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  .modal-content {
    font-size: 16px;
  }
}

@media screen and (max-width: 420px) {
  .modal-content {
    font-size: 14px;
  }
}
</style>
