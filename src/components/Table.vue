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
          <p
            v-for='(action, index) in actions'
            :key='index'
            @click.prevent='action.callback(row._id)'
          >
            {{ action.text }}
          </p>
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
        if (keys[1] === 'color') {
          return row[keys[0]][keys[1]].replace(/\//g, ', ')
        }
        return row[keys[0]][keys[1]]
      }
      if (key.includes('time')) {
        if (!row[key]) return
        return row[key].slice(0, 16).replace('T', ', ')
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
  max-width: 1024px;
  background-color: white;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

tr:hover td {
  border-color: #fff;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4CAF50;
  color: white;
}

p {
  color: #00a3cf;
  font-size: 12px;
  cursor: pointer;
  transition: .3s
}

p:hover {
  color: #00cbff;
  transform: scale(1.02)
}
</style>
