class Grid {
    constructor(name) {
        if (name.length < 1)
            throw "Error attempting to initialize Grid with missing name : " + name;
        this._id = null
        this._name = name;
        this._currentPage = 1;
        this._title = null;
        this._pageCount = 0;
        this._rowCount = 0;
        this._rowsPerPage = 10;
        this._columns = [];
        this._columnCount = 0;
        this._columnCountVisible = 0;
        this._data = null;
        this._actionButtons = null;
        this._allowExport = true;
        this._rows = null;
        this._message = null;
        this._query = null;
        this._queryCount = null;
        this._url = null;
        this._filters = [];
        this._sortColumn = null;
        this._sortDir = null;

        /**
         * fields below will hold references to DOM objects in the table drawn
         */
        this._contentLoadingOverlay = null;
        this._contentDrawTableOn = null;
        this._contentTBody = null;
        this._contentThead = null;
        this._contentTfoot = null;
        this._contentPaginationFirstPage = null;
        this._contentPaginationPrevPage = null;
        this._contentPaginationNextPage = null;
        this._contentPaginationLastPage = null;
        this._contentPaginationCurrPage = null;
        this._contentGridTitle = null;
        this._contentGridButtons = null;
        this._contentTheadColumnHeaders = null;
        this._contentTheadColumnSearchRow = null;
        this._contentPaginationTd = null;
        this._contentPaginationInfoSection = null;
        this._contentPaginationRowsPerPageSelector = null;
    }

    /**
     *
     * @param allRows
     * @returns {string}
     */
    buildUrl(allRows = false) {
        var currentURL = new URL(window.location.href);
        var tmpUrl = null;
        tmpUrl = currentURL.origin;
        tmpUrl += currentURL.pathname;
        tmpUrl += currentURL.search;
        if (currentURL.search.length < 3) {
            tmpUrl += '?';
        }

        tmpUrl += "&load_grid_by_name=" + this.name;
        tmpUrl += "&page=" + this.currentPage;
        if (allRows) {
            tmpUrl += "&limit=0";
        } else {
            tmpUrl += "&limit=" + this.rowsPerPage;
        }

        if (this.sortColumn != '' && this.sortColumn != null) {
            tmpUrl += '&sort=' + this.sortColumn;
            if (this.sortDir == '' || this.sortDir == null) {
                tmpUrl += '&dir=asc';
            } else {
                tmpUrl += '&dir=' + this.sortDir;
            }
        }

        var _fp = this.getFilterParams();
        if (_fp.length > 3) {
            tmpUrl += '&searchParams=' + _fp;
        }

        tmpUrl += "&rand=" + Math.random();
        return tmpUrl;
    }

    getFilterParams() {
        var tmpFilters = [];

        for (var field in this.filters) {
            var tmpFilter = {value: null, property: null, operator: null};

            tmpFilter.value = this.filters[field];
            tmpFilter.property = field;
            tmpFilter.operator = 'like';

            if (tmpFilter.value.startsWith('<=')) {
                tmpFilter.value = tmpFilter.value.substr(2);
                tmpFilter.operator = 'lteq';
            } else if (tmpFilter.value.startsWith('>=')) {
                tmpFilter.value = tmpFilter.value.substr(2);
                tmpFilter.operator = 'gteq';
            } else if (tmpFilter.value.startsWith('<')) {
                tmpFilter.value = tmpFilter.value.substr(1);
                tmpFilter.operator = 'lt';
            } else if (tmpFilter.value.startsWith('>')) {
                tmpFilter.value = tmpFilter.value.substr(1);
                tmpFilter.operator = 'gt';
            } else if (tmpFilter.value.startsWith('=')) {
                tmpFilter.value = tmpFilter.value.substr(1);
                tmpFilter.operator = 'eq';
            } else if (tmpFilter.value.startsWith('!=')) {
                tmpFilter.value = tmpFilter.value.substr(2);
                tmpFilter.operator = 'noteq';
            }

            tmpFilters.push(tmpFilter);

        }
        return encodeURI(JSON.stringify(tmpFilters))
    }

    /**
     * Find necessary DOM elements and keep references for easy access
     */
    fetchContentElementReferences() {
        this.contentDrawTableOn = document.getElementById(this.name);
        if (this.contentDrawTableOn === null) {
            throw "Unable to find Grid table for " + name;
        }
        this.contentTBody = document.getElementById(this.name + '_tbody');
        this.contentThead = document.getElementById(this.name + '_thead');
        this.contentTfoot = document.getElementById(this.name + '_tfoot');
        this.contentPaginationFirstPage = document.getElementById(this.name + '_paginationFirstPage');
        this.contentPaginationPrevPage = document.getElementById(this.name + '_paginationPrevPage');
        this.contentPaginationNextPage = document.getElementById(this.name + '_paginationNextPage');
        this.contentPaginationLastPage = document.getElementById(this.name + '_paginationLastPage');
        this.contentPaginationCurrPage = document.getElementById(this.name + '_paginationCurrPage');
        this.contentLoadingOverlay = document.getElementById(this.name + '_loader');
        this.contentGridTitle = document.getElementById(this.name + '_title');
        this.contentGridButtons = document.getElementById(this.name + '_buttons');
        this.contentTheadColumnHeaders = this.contentThead.getElementsByTagName('tr')[1];
        this.contentTheadColumnSearchRow = this.contentThead.getElementsByTagName('tr')[2];
        this.contentPaginationTd = document.getElementById(this.name + '_paginationTd');
        this.contentPaginationInfoSection = document.getElementById(this.name + '_paginationInfoSection');
        this.contentPaginationRowsPerPageSelector = document.getElementById(this.name + '_rowsPerPageSelector');
    }

    /**
     * Retreive JSON file Async mode
     * once downloaded, call initialize
     */
    fetchJson() {
        var self = this;
        this.url = this.buildUrl();
        this.showLoadingIcon();
        console.log("Loading json from URL: " + this.url);
        $.ajaxSetup({
            async: true
        });
        $.getJSON(this.url, function (data) {
            window.grid[self.name].data = data;
            window.grid[self.name].initialize();
        }).fail(function () {
            alert('Failed loading data for the table. Please refresh the page and try again')
        });

        this.contentPaginationRowsPerPageSelector.innerHTML = "<i class='fa fa-bars'></i> " + (this.rowsPerPage == 0 ? 'All' : this.rowsPerPage);
    }

    refresh() {
        this.fetchJson();
    }

    initialize() {
        this.fetchContentElementReferences();

        if (this.data == null) {
            this.fetchJson();
            return;
        }

        this.id = this.data.id;
        this.name = this.data.name;
        this.title = this.data.title;
        this.rows = this.data.rows;
        this.columns = this.data.columns;
        this.columnCount = this.data.columnCount;
        this.pageCount = this.data.pageCount;
        this.rowCount = this.data.rowCount;
        this.rowsPerPage = this.data.rowsPerPage;
        this.message = this.data.message;
        this.query = this.data.query;
        this.queryCount = this.data.queryCount;
        this.actionButtons = this.data.actionButtons;
        this.allowExport = this.data.allowExport;

        this.initColumns();

        this.draw();
    }

    initColumns() {
        var col = this.columns;
        this.columns = [];
        this.columnCountVisible = 0;
        for (var c in col) {
            this.columns[col[c].fieldName] = new Column(col[c]);
            if (this.columns[col[c].fieldName].visible) {
                this.columnCountVisible++;
            }
        }
    }

    drawTableHeader() {
        var self = this;
        this.contentTheadColumnHeaders.innerHTML = null;
        this.contentTheadColumnSearchRow.innerHTML = null;
        for (var columnIndex in this.columns) {
            var column = this.columns[columnIndex];
            if (column.visible != 1)
                continue;
            var th = document.createElement('th');

            var columnTitle = document.createElement('span');
            columnTitle.innerText = column.label;
            columnTitle.classList.add('float-left');

            var columnSortButton = document.createElement('a');
            columnSortButton.className = 'float-right btn btn-sm btn-outline-secondary d-print-none';
            columnSortButton.href = 'javascript:;';
            columnSortButton.setAttribute('fieldName', column.fieldName);
            columnSortButton.setAttribute('gridName', this.name);

            //set click handler
            columnSortButton.onclick = function () {

                if (window.grid[this.getAttribute('gridName')].sortColumn == this.getAttribute('fieldName')) {
                    if (window.grid[self.name].sortDir == 'asc') {
                        window.grid[self.name].sortDir = 'desc';
                    } else {
                        window.grid[self.name].sortDir = 'asc';
                    }
                } else {
                    window.grid[self.name].sortColumn = this.getAttribute('fieldName');
                    window.grid[self.name].sortDir = 'asc';
                }
            };

            var columnSortbuttonIcon = document.createElement('i');
            columnSortbuttonIcon.classList.add('fas');
            if (window.grid[self.name].sortColumn == column.fieldName) {
                if (window.grid[self.name].sortDir != 'desc') {
                    columnSortbuttonIcon.classList.add('fa-sort-down');
                } else {
                    columnSortbuttonIcon.classList.add('fa-sort-up');
                }
            } else {
                columnSortbuttonIcon.classList.add('fa-sort');
            }
            columnSortButton.appendChild(columnSortbuttonIcon);
            th.appendChild(columnTitle);
            th.appendChild(columnSortButton);

            this.contentTheadColumnHeaders.appendChild(th);


            //draw the search field
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Search');
            //input.style.cssText = "border:0;width:100%;height:100%;padding:1px;margin:0;";
            input.className = 'form-control form-control-sm';
            input.setAttribute('fieldName', column.fieldName);
            input.setAttribute('gridName', this.name);
            if (typeof this.filters[column.fieldName] !== 'undefined') {
                input.value = this.filters[column.fieldName];
            }
            input.onkeydown = function (event) {
                if (event.key === 'Enter') {
                    //I can't get the setter to fire when assigning a new member to this.filters. hence this ugly workaround
                    var _filters = window.grid[this.getAttribute('gridName')].filters;
                    _filters[this.getAttribute('fieldName')] = this.value.trim();
                    window.grid[this.getAttribute('gridName')].filters = _filters;
                    console.log("Search filters ");
                    console.log(window.grid[this.getAttribute('gridName')].filters);
                }
            };
            var td = document.createElement('th');
            td.appendChild(input);
            this.contentTheadColumnSearchRow.appendChild(td);
        }
        var emptySearchRowTh = document.createElement('th');
        var emptySearchRowTh2 = document.createElement('th');
        emptySearchRowTh.innerHTML = "&nbsp;";
        emptySearchRowTh2.innerHTML = "&nbsp;";

        this.contentTheadColumnSearchRow.appendChild(emptySearchRowTh);
        this.contentTheadColumnHeaders.appendChild(emptySearchRowTh2);

        if (this.columnCountVisible > 3) {
            this.contentGridTitle.colSpan = 2
        }
        if (this.columnCountVisible > 5) {
            this.contentGridTitle.colSpan = 4
        }
        this.contentGridTitle.innerText = this.title;
        this.drawGridExportbutton();
    }

    drawGridExportbutton() {
        var self = this;
        this.contentGridButtons.colSpan = (this.columnCountVisible - this.contentGridTitle.colSpan + 1);
        this.contentGridButtons.innerHTML = "";

        if (this.allowExport) {

            var btnGroup = document.createElement('div');
            btnGroup.classList.add('btn-group');
            btnGroup.classList.add('d-print-none');

            var mainBtn = document.createElement('a');
            mainBtn.setAttribute('gridName', this.name);
            mainBtn.setAttribute('title', "Export to Excel");
            mainBtn.innerHTML = "<i class='fas fa-download'></i>";
            mainBtn.href = "javascript:;";
            mainBtn.className = 'btn btn-sm btn-outline-secondary';
            mainBtn.onclick = function () {
                window.grid[self.name].downloadExcelJs();
            }

            var dropdownToggleButton = document.createElement('button');
            dropdownToggleButton.className = "btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split";
            dropdownToggleButton.setAttribute('data-toggle', 'dropdown');
            dropdownToggleButton.setAttribute('aria-haspopup', 'true');
            dropdownToggleButton.setAttribute('aria-expande', 'false');

            var dropdownMenu = document.createElement('div');
            dropdownMenu.classList.add('dropdown-menu');

            var links = [
                ['Excel (JavaScript)', 'javascript:window.grid["' + self.name + '"].downloadExcelJs();']
                , ['Excel (PHPSpreadsheet)', self.buildUrl(true) + '&export_grid_to_excel=1']
                , ['Excel (Spout)', self.buildUrl(true) + '&export_grid_to_excel=2']
                , ['CSV (JavaScript)', 'javascript:window.grid["' + self.name + '"].downloadCsvJs();']
                , ['CSV (PHP)', this.buildUrl(true) + '&export_grid_to_csv=1']
            ];

            for (var _idx in links) {
                var _link = document.createElement('a');
                _link.classList.add('dropdown-item');
                _link.innerHTML = "<i class='fas fa-download'></i> " + links[_idx][0];
                _link.href = links[_idx][1]
                _link.setAttribute('gridName', this.name);
                dropdownMenu.appendChild(_link)
            }

            btnGroup.appendChild(mainBtn);
            btnGroup.appendChild(dropdownToggleButton);
            btnGroup.appendChild(dropdownMenu);
            this.contentGridButtons.appendChild(btnGroup);
        }
    }

    drawTableFooter() {
        this.disableInactivePaginationButtons();
    }

    downloadExcelJs() {
        console.log('Downloading Grid in Excel: ' + this.name);

        this.showLoadingIcon();

        var json = null;
        var self = this;
        this.url = this.buildUrl(true);
        var _data = null;

        $.ajaxSetup({
            async: false
        });
        $.getJSON(this.url, function (data) {
            _data = data;
        }).fail(function () {
            alert('Faile loading data for the table. Please refresh the page and try again')
        });


        var nowDate = new Date();
        var now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        var fileName = _data.name + ' (' + now + ')';
        fileName = fileName.substring(1,30)
        var worksheet = XLSX.utils.json_to_sheet(_data.rows);
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
        var bin = XLSX.writeFile(workbook, (fileName + '.xlsx'), {bookType: 'xlsx'});
        this.hideLoadingIcon();
    }

    downloadCsvJs() {
        console.log('Downloading Grid in CSV: ' + this.name);

        var json = null;
        var self = this;
        this.url = this.buildUrl(true);
        var _data = null;

        $.ajaxSetup({
            async: false
        });
        $.getJSON(this.url, function (data) {
            _data = data;
        }).fail(function () {
            alert('Failed loading data for the table. Please refresh the page and try again')
        });


        var nowDate = new Date();
        var now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        var fileName = _data.name + ' (' + now + ')';
        fileName = fileName.substring(1,30)
        var worksheet = XLSX.utils.json_to_sheet(_data.rows);
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
        var bin = XLSX.writeFile(workbook, (fileName + '.csv'), {bookType: 'csv'});
    }

    draw() {
        this.drawTableHeader();
        this.drawTableFooter();
        //reset the body so we can re-populate
        this.contentTBody.innerHTML = null;

        for (var rowIndex in this.rows) {
            var tr = document.createElement('tr');
            for (var columnId in this.rows[rowIndex]) {
                var column = this.columns[columnId];

                //skip hidden columns
                if (column.visible != 1) {
                    continue;
                }

                var td = document.createElement('td');
                var innerElement = null;

                /**
                 * If the cell/column has a href attribute, it needs to be a link, otherwise display just a span
                 */
                if (column.href != null) {
                    innerElement = document.createElement('a');
                    innerElement.href = this.formatLinkHref(this.rows[rowIndex], column.href);
                    innerElement.target = column.target;
                } else {
                    innerElement = document.createElement('span');
                }
                innerElement.innerText = this.rows[rowIndex][columnId];
                td.appendChild(innerElement);

                //set styling attributes for the span/a
                innerElement.style = column.innerElementCssStyle;
                innerElement.className = column.innerElementCssClass;

                //set styling attributes for the td
                td.style = column.outerElementCssStyle;
                td.className = column.outerElementCssClass;


                tr.appendChild(td);
            }

            /**
             * Drawing the action buttons per row
             */
            var actionButtonsTd = document.createElement('td');
            if (this.actionButtons.length > 0) {
                var actionButtonsDropdown = document.createElement('div');
                actionButtonsDropdown.classList.add('btn-group');
                actionButtonsDropdown.classList.add('d-print-none');
                var actionButtonsDropdown_button = document.createElement('button');
                actionButtonsDropdown_button.className = "btn btn-outline-secondary btn-sm dropdown-toggle";
                actionButtonsDropdown_button.setAttribute('type', 'button');
                actionButtonsDropdown_button.setAttribute('data-toggle', 'dropdown');
                actionButtonsDropdown_button.setAttribute('aria-haspopup', 'true');
                actionButtonsDropdown_button.setAttribute('aria-expanded', 'false');
                actionButtonsDropdown_button.innerHTML = "<i class='fa fa-cog'></i>";

                actionButtonsDropdown.appendChild(actionButtonsDropdown_button);
                var actionButtonsDropdown_menu = document.createElement('div');
                actionButtonsDropdown_menu.classList.add('dropdown-menu');
                for (var _idx in this.actionButtons) {
                    var currentActionButton = this.actionButtons[_idx];

                    if (currentActionButton.hasOwnProperty('href') && currentActionButton.hasOwnProperty('label') && currentActionButton.hasOwnProperty('icon')) {
                        var _item = document.createElement('a');
                        _item.classList.add('dropdown-item');
                        _item.href = this.formatLinkHref(this.rows[rowIndex], currentActionButton.href)
                        _item.innerHTML = "<i class='" + currentActionButton.icon + "'></i> " + currentActionButton.label;
                        actionButtonsDropdown_menu.appendChild(_item);
                    }
                }
                actionButtonsDropdown.appendChild(actionButtonsDropdown_menu);
                actionButtonsTd.appendChild(actionButtonsDropdown);
                actionButtonsTd.style.textAlign = 'center';
            }

            tr.appendChild(actionButtonsTd);
            this.contentTBody.appendChild(tr);
        }

        this.hideLoadingIcon();
        this.bindActionsToGrid();
    }

    setRowsPerPage(numberOfRows) {
        this.rowsPerPage = numberOfRows;
        if (this.currentPage === 1) {
            this.refresh();
        } else {
            this.currentPage = 1;
        }
    }

    /**
     * Given a url from a cell or action button,
     * it will format the href based on the table data and query string parameters
     * anything like {id} gets replaced with the value of the id column in the table
     * anything like [module] gets replaced with the value on ?module= from the URL
     * @param data
     * @param href
     * @returns {*}
     */
    formatLinkHref(data, href) {
        if (!href) {
            return null;
        }
        if (href.includes('{')) {
            for (let column in data) {
                if (data.hasOwnProperty(column)) {
                    href = href.replace(('{' + column + '}'), data[column]);
                }
            }
        }

        var urlParams = new URLSearchParams(window.location.search);
        if (href.includes('[')) {
            for (const [key, value] of urlParams) {
                href = href.replace(('\[' + key + '\]'), value);
            }
        }
        return href
    }

    bindActionsToGrid() {
        var self = this;
        this.contentPaginationFirstPage.onclick = function () {
            window.grid[self.name].currentPage = 1;
        };
        this.contentPaginationPrevPage.onclick = function () {
            window.grid[self.name].currentPage--;
        };
        this.contentPaginationNextPage.onclick = function () {
            window.grid[self.name].currentPage++;
        };
        this.contentPaginationLastPage.onclick = function () {
            window.grid[self.name].currentPage = self.pageCount;
        };
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(value) {
        var newValue = value;

        if (value > this.pageCount) {
            newValue = this.pageCount;
        } else if (value < 1) {
            newValue = 1;
        } else {
            newValue = value;
        }

        if (newValue == this._currentPage) {
            console.log('same page');
            return
        } else {
            this._currentPage = newValue;
            console.log('Current Page: ' + this._currentPage);
            this.contentPaginationCurrPage.innerText = this._currentPage;
            this.fetchJson();
        }
        this.disableInactivePaginationButtons();
        this.setPaginationInfoSection();
    }

    setPaginationInfoSection() {
        this.contentPaginationInfoSection.innerText = "Pages: " + this.pageCount.toLocaleString() + ' Rows: ' + this.rowCount.toLocaleString();
    }

    disableInactivePaginationButtons() {
        if (this.currentPage === 1) {
            this.contentPaginationFirstPage.parentElement.classList.add('disabled');
            this.contentPaginationPrevPage.parentElement.classList.add('disabled');
        } else {
            this.contentPaginationFirstPage.parentElement.classList.remove('disabled');
            this.contentPaginationPrevPage.parentElement.classList.remove('disabled');
        }

        if (this.currentPage === this.pageCount) {
            this.contentPaginationLastPage.parentElement.classList.add('disabled');
            this.contentPaginationNextPage.parentElement.classList.add('disabled');
        } else {
            this.contentPaginationLastPage.parentElement.classList.remove('disabled');
            this.contentPaginationNextPage.parentElement.classList.remove('disabled');
        }
        this.setPaginationInfoSection();
    }

    showLoadingIcon() {
        this.contentLoadingOverlay.style.display = "";
    }

    hideLoadingIcon() {
        this.contentLoadingOverlay.style.display = "none";
    }

    get sortColumn() {
        return this._sortColumn;
    }

    set sortColumn(value) {
        this._sortColumn = value;
        this._currentPage = 1;
        //this.drawTableHeader();
        //this.refresh();
    }

    get sortDir() {
        return this._sortDir;
    }

    set sortDir(value) {
        this._sortDir = value;
        this._currentPage = 1;
        this.refresh();
    }

    get allowExport() {
        return this._allowExport;
    }

    set allowExport(value) {
        this._allowExport = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get pageCount() {
        return this._pageCount;
    }

    set pageCount(value) {
        this._pageCount = value;
    }

    get rowCount() {
        return this._rowCount;
    }

    set rowCount(value) {
        this._rowCount = value;
    }

    get rowsPerPage() {
        return this._rowsPerPage;
    }

    set rowsPerPage(value) {
        this._rowsPerPage = value;
    }

    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get filters() {
        return this._filters;
    }

    set filters(value) {
        this._filters = value;
        this.refresh();
    }

    get columnCount() {
        return this._columnCount;
    }

    set columnCount(value) {
        this._columnCount = value;
    }

    get query() {
        return this._query;
    }

    set query(value) {
        this._query = value;
    }

    get queryCount() {
        return this._queryCount;
    }

    set queryCount(value) {
        this._queryCount = value;
    }


    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get contentDrawTableOn() {
        return this._contentDrawTableOn;
    }

    set contentDrawTableOn(value) {
        this._contentDrawTableOn = value;
    }

    get contentTBody() {
        return this._contentTBody;
    }

    set contentTBody(value) {
        this._contentTBody = value;
    }

    get contentThead() {
        return this._contentThead;
    }

    set contentThead(value) {
        this._contentThead = value;
    }

    get contentTfoot() {
        return this._contentTfoot;
    }

    set contentTfoot(value) {
        this._contentTfoot = value;
    }

    get contentPaginationFirstPage() {
        return this._contentPaginationFirstPage;
    }

    set contentPaginationFirstPage(value) {
        this._contentPaginationFirstPage = value;
    }

    get contentPaginationPrevPage() {
        return this._contentPaginationPrevPage;
    }

    set contentPaginationPrevPage(value) {
        this._contentPaginationPrevPage = value;
    }

    get contentPaginationNextPage() {
        return this._contentPaginationNextPage;
    }

    set contentPaginationNextPage(value) {
        this._contentPaginationNextPage = value;
    }

    get contentPaginationLastPage() {
        return this._contentPaginationLastPage;
    }

    set contentPaginationLastPage(value) {
        this._contentPaginationLastPage = value;
    }

    get contentPaginationCurrPage() {
        return this._contentPaginationCurrPage;
    }

    set contentPaginationCurrPage(value) {
        this._contentPaginationCurrPage = value;
    }

    get contentLoadingOverlay() {
        return this._contentLoadingOverlay;
    }

    set contentLoadingOverlay(value) {
        this._contentLoadingOverlay = value;
    }

    get contentGridTitle() {
        return this._contentGridTitle;
    }

    set contentGridTitle(value) {
        this._contentGridTitle = value;
    }

    get contentGridButtons() {
        return this._contentGridButtons;
    }

    set contentGridButtons(value) {
        this._contentGridButtons = value;
    }

    get columnCountVisible() {
        return this._columnCountVisible;
    }

    set columnCountVisible(value) {
        this._columnCountVisible = value;
    }

    get contentTheadColumnHeaders() {
        return this._contentTheadColumnHeaders;
    }

    set contentTheadColumnHeaders(value) {
        this._contentTheadColumnHeaders = value;
    }

    get contentPaginationTd() {
        return this._contentPaginationTd;
    }

    set contentPaginationTd(value) {
        this._contentPaginationTd = value;
    }

    get contentPaginationInfoSection() {
        return this._contentPaginationInfoSection;
    }

    set contentPaginationInfoSection(value) {
        this._contentPaginationInfoSection = value;
    }

    get contentPaginationRowsPerPageSelector() {
        return this._contentPaginationRowsPerPageSelector;
    }

    set contentPaginationRowsPerPageSelector(value) {
        this._contentPaginationRowsPerPageSelector = value;
    }

    get contentTheadColumnSearchRow() {
        return this._contentTheadColumnSearchRow;
    }

    set contentTheadColumnSearchRow(value) {
        this._contentTheadColumnSearchRow = value;
    }

    get actionButtons() {
        return this._actionButtons;
    }

    set actionButtons(value) {
        this._actionButtons = value;
    }
}

class Column {
    constructor(json_string) {
        this._index = 0;
        this._fieldName = "";
        this._label = "";
        this._format = "";
        this._href = "";
        this._target = "";
        this._innerElementCssStyle = "";
        this._innerElementCssClass = "";
        this._outerElementCssStyle = "";
        this._outerElementCssClass = "";
        this._visible = true;
        this._innerElementAttributes = "";
        this._outerElementAttributes = "";
        this._json_string = json_string;
        this._data = [];

        this.loadValuesFromJson();
    }

    loadValuesFromJson() {
        //this._data = JSON.parse(this._json_string);
        this._data = this._json_string;
        this._index = this._data.index;
        this._fieldName = this._data.fieldName;
        this._label = this._data.label;
        this._format = this._data.format;
        this._href = this._data.href;
        this._innerElementCssStyle = this._data.innerElementCssStyle;
        this._innerElementCssClass = this._data.innerElementCssClass;
        this._outerElementCssStyle = this._data.outerElementCssStyle;
        this._outerElementCssClass = this._data.outerElementCssClass;
        this._visible = this._data.visible;
        this._innerElementAttributes = this._data.innerElementAttributes;
        this._outerElementAttributes = this._data.outerElementAttributes;
        this._target = this._data.target;
    }


    get json_string() {
        return this._json_string;
    }

    set json_string(value) {
        this._json_string = value;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    get fieldName() {
        return this._fieldName;
    }

    set fieldName(value) {
        this._fieldName = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }

    get href() {
        return this._href;
    }

    set href(value) {
        this._href = value;
    }

    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }

    get innerElementCssStyle() {
        return this._innerElementCssStyle;
    }

    set innerElementCssStyle(value) {
        this._innerElementCssStyle = value;
    }

    get innerElementCssClass() {
        return this._innerElementCssClass;
    }

    set innerElementCssClass(value) {
        this._innerElementCssClass = value;
    }

    get outerElementCssStyle() {
        return this._outerElementCssStyle;
    }

    set outerElementCssStyle(value) {
        this._outerElementCssStyle = value;
    }

    get outerElementCssClass() {
        return this._outerElementCssClass;
    }

    set outerElementCssClass(value) {
        this._outerElementCssClass = value;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
    }

    get innerElementAttributes() {
        return this._innerElementAttributes;
    }

    set innerElementAttributes(value) {
        this._innerElementAttributes = value;
    }

    get outerElementAttributes() {
        return this._outerElementAttributes;
    }

    set outerElementAttributes(value) {
        this._outerElementAttributes = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}

var grid = [];
