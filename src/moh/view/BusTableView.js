import TableView from 'bd/view/TableView';

export default class BusTableView extends TableView {
  init() {
    super.init();

    this._initTable();
  }

  _initTable() {
    this.$container = $('<table class=bus-table-view/>');
    const $footer = $(`
      <div class="footer">
        <div class="time">within 15min Above</div>
        <a class="more">Read More</a>
      </div>
    `);
    this.$element.append(this.$container, $footer);

    this._tableHead = `
      <tr class="small">
        <th>Bus ID</th>
        <th>Pilgrims</th>
        <th>Arrive Time</th>
      </tr>
    `;
    this.$container.append(this._tableHead);
  }

  setRows(rows) {
    this.setProperty('rows', rows);

    if (!rows || rows.length === 0) return;

    this._clearRows();

    rows.forEach((row) => {
      this._addRow(row);
    });
  }

  _addRow(row) {
    const $row = $(`
      <tr>
        <td class="busId" />
        <td class="pilgrims" />
        <td class="arrivalTime" />
      </tr>
    `);
    this._renderRow($row, row);
    this.$container.append($row);
  }

  _renderRow($row, row) {
    $row.data(row);
    $row.find('.busId').text(row.id);
    $row.find('.pilgrims').text(row.pilgrims);
    $row.find('.arrivalTime').text(`${row.arrivalIn} min`);
  }

  _clearRows() {
    this.$container.find('tbody tr').remove();
  }
}
