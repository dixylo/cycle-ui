<template>
  <table>
    <thead>
      <tr>
        <th v-for='(heading, index) in header' :key='index'>
          {{ heading.text }}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(row, rowIndex) in data' :key='rowIndex'>
        <td v-for='(heading, cellIndex) in header' :key='cellIndex'>
          {{ computeCell(row, heading.value) }}
        </td>
        <td>
          <span
            v-for='(action,index) in actions'
            :key='index'
            @click.prevent='action.callback(row._id)'
          >
            {{ action.text }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: ['header', 'data', 'actions'],
  methods: {
    computeCell (row, key) {
      if (key.includes('.')) {
        const keys = key.split('.')
        return row[keys[0]][keys[1]]
      }
      return row[key]
    }
  }
}
</script>

<style scoped>
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: auto;
  background-color: white;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

span {
  color: #00a3cf;
  font-size: 12px;
  cursor: pointer;
}
</style>
