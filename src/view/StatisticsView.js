import { createElement, setElementVariable } from '@utils/CommonUtils';
import AuthAPIService from '@services/AuthAPIService';
import StatisticsAPIService from '@services/StatisticsAPIService';

export default class StatisticsView {
  constructor() {
    this.container = document.querySelector('.wrapper');
  }

  async render(handlers) {
    const authForm = document.querySelector('.statistics-block');
    if (authForm) {
      document.querySelector('.statistics-block').remove();
    }
    this.formEl = createElement('div', 'statistics-block');
    this.formEl.innerHTML = `
        <h2 class="win-text">Play to win, but enjoy the fun!</h2>
        <p class="info-text">You must play at least one game to appear in statistics</p>
            <table class="statisticsTable">
                <tr> 
                    <th class="name-sort" >Name ↑↓</th>
                    <th class="score-sort" >Score ↑↓</th>
                </tr>

            </table>
         
    `;
    this.container.appendChild(this.formEl);

    this.tableHeadName = document.querySelector('.name-sort');
    this.tableHeadScore = document.querySelector('.score-sort');
    this.table = document.querySelector('.statisticsTable tbody');

    this.table.append(...await this.getUsersData());

    this.setFormWidth(handlers.calcFormWidth());
    this._addEventListeners(handlers);
  }

  _sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector(".statisticsTable");
    switching = true;
    dir = "asc"; 
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        let result;
        if (dir == "asc") {
         if (n === 1) {
            result = parseInt(x.innerHTML.toLowerCase()) > parseInt(y.innerHTML.toLowerCase());
         } else {
            result = x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase();
         }
            if (result) {
                shouldSwitch= true;
                break;
              }
         
          
        } else if (dir == "desc") {
            
         if (n === 1) {
            result = parseInt(x.innerHTML.toLowerCase()) < parseInt(y.innerHTML.toLowerCase());
         } else {
            result = x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase();
         }
          if (result) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;      
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  async getUsersData() {
    const userData = await StatisticsAPIService.getAllUsersStatistics();
    const userDataTable = this.fillTable(userData.data);
    return userDataTable;
  }

  fillTable(records) {
     const tableRows = [];
     records.forEach(record => {
         const tr = createElement('tr');
         const tdName = createElement('td');
         tdName.innerText = record.user;

         const tsScore = createElement('td');
         tsScore.innerText = record.score;
         tr.append(tdName, tsScore)

         tableRows.push(tr);
     })
     return tableRows;
  }

  setFormWidth(width) {
  }

  _addEventListeners(handlers) {
    this.tableHeadName.addEventListener('click', () =>
      this._sortTable(0)
    );
    this.tableHeadScore.addEventListener('click', () =>
      this._sortTable(1)
    );
  }

  destroy() {
    this.formEl.remove();
  }
}
