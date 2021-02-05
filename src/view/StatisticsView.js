import {createElement} from '@utils/CommonUtils';
import StatisticsAPIService from '@services/StatisticsAPIService';
import {setElementVariable} from '../utils/CommonUtils';

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
        <h2 class="win-text">${handlers.getUIText().playToWinText}</h2>
        <p class="info-text">${handlers.getUIText().youMustPlayText}</p>
            <table class="statisticsTable">
                <tr> 
                    <th class="name-sort" >${handlers.getUIText().nameText} ↑↓</th>
                    <th class="score-sort" >${handlers.getUIText().scoreText} ↑↓</th>
                </tr>
            </table>
    `;
    this.container.appendChild(this.formEl);

    this.tableHeadName = document.querySelector('.name-sort');
    this.tableHeadScore = document.querySelector('.score-sort');
    this.table = document.querySelector('.statisticsTable tbody');
    this.tableEl = document.querySelector('.statisticsTable');
    this.setFormWidth(handlers.calcFormWidth());

    this.table.append(...await this.getUsersData());

    this._addEventListeners(handlers);
  }

  _sortTable(n) {
    let i;
    let x;
    let y;
    let shouldSwitch;
    let switchcount = 0;
    let switching = true;
    let dir = 'asc';
    while (switching) {
      switching = false;
      const {rows} = this.tableEl;
      for (i = 1; i < (rows.length - 1); i++) { // eslint-disable-line no-plusplus
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        let result;
        if (dir === 'asc') {
          if (n === 1) {
            result = parseInt(
              x.innerHTML.toLowerCase(),
              10,
            ) > parseInt(
              y.innerHTML.toLowerCase(),
              10,
            );
          } else {
            result = x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase();
          }
          if (result) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (n === 1) {
            result = parseInt(
              x.innerHTML.toLowerCase(),
              10,
            ) < parseInt(
              y.innerHTML.toLowerCase(),
              10,
            );
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
        switchcount += 1;
      } else if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersData() {
    const fillTable = (records) => {
      const tableRows = [];
      records.forEach((record) => {
        const tr = createElement('tr');
        const tdName = createElement('td');
        tdName.innerText = record.user;

        const tsScore = createElement('td');
        tsScore.innerText = record.score;
        tr.append(tdName, tsScore);

        tableRows.push(tr);
      });
      return tableRows;
    };

    const userData = await StatisticsAPIService.getAllUsersStatistics();
    return fillTable(userData.data);
  }

  setFormWidth(width) {
    setElementVariable(this.formEl, '--form-width', `${width}px`);
  }

  _addEventListeners() {
    this.tableHeadName.addEventListener('click', () => this._sortTable(0));
    this.tableHeadScore.addEventListener('click', () => this._sortTable(1));
  }

  destroy() {
    this.formEl.remove();
  }
}
