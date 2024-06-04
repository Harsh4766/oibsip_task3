document.getElementById('add').addEventListener('click', add);
    function add() {
      const title = document.getElementById('title').value;
      const desc = document.getElementById('description').value;
      if (!title || !desc) {
        alert('Please enter both title and description');
        return;
      }
      let itemJsonArray = JSON.parse(localStorage.getItem('ItemsJson')) || [];
      itemJsonArray.push([title, desc]);
      localStorage.setItem('ItemsJson', JSON.stringify(itemJsonArray));
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      update();
    }
    function update() {
      let itemJsonArray = JSON.parse(localStorage.getItem('ItemsJson')) || [];
      const tableBody = document.getElementById('tbody');
      tableBody.innerHTML = itemJsonArray.map((item, index) => `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item[0]}</td>
          <td>${item[1]}</td>
          <td><button class="btn btn-danger" onclick="deleted(${index})">Delete</button></td>
        </tr>
      `).join('');
    }
    function deleted(itemIndex) {
      let itemJsonArray = JSON.parse(localStorage.getItem('ItemsJson')) || [];
      itemJsonArray.splice(itemIndex, 1);
      localStorage.setItem('ItemsJson', JSON.stringify(itemJsonArray));
      update();
    }
    function clearstorage() {
      if (confirm('Do you really want to delete all items in the list?')) {
        localStorage.clear();
        update();
      }
    }
    update();