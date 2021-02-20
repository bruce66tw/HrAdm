var _me = {

    init: function () {        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'Code' },
                { data: 'Name' },
                { data: 'Status' },
                { data: '_Fun' },
            ],
            columnDefs: [
                _crud.dtColConfig,
				{ targets: [2], render: function (data, type, full, meta) {
                    return _crud.dtSetStatus(full.Id, data);
                }},
				{ targets: [3], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        _me.divEditTbar = $('#divEditTbar');

        //initial edit one/many
        _me.mNode = new EditMany('Id', null, 'tplNode', '.xf-node');
        _me.mLine = new EditMany('Id', null, 'tplLine', '.xd-line', 'Sort');
        _crud.init(config, [null, _me.mNode, _me.mLine]);

        //initial flow(jsplumb)
        _me.flow = new Flow('divEdit', _me.mNode, _me.mLine);

        //custom function
        _me.mNode.fnLoadJson = _me.mNode_loadJson;
        _me.mNode.fnGetUpdJson = _me.mNode_getUpdJson;
        _me.mNode.fnValid = _me.mNode_valid;
        //
        _me.mLine.fnLoadJson = _me.mLine_loadJson;
        _me.mLine.fnGetUpdJson = _me.mLine_getUpdJson;
        _me.mLine.fnValid = _me.mLine_valid;
    },

    /*
    test1: function () {
        _form.swap(_me.divEdit, function () {
            _me.test2();
        });
    },

    test2: function () {
        var line = {
            Id: '5YW3R5TH2A',
            StartNode: '5YW3R5TEZA',
            EndNode: '5YW3R5TG0A',
        };
        var flow = _me.flow;
        flow.setNodeEvent($('#Start1'));
        flow.setNodeEvent($('#Node1'));
        flow.renderLine(line);
    },
    */
    fnAfterSwap: function (toRead) {
        if (toRead)
            _me.divEditTbar.hide();
        else
            _me.divEditTbar.show();
    },

    /*
    onCreate: function () {
        _crud.onCreate();
        _me.setEditTbar(true);
    },
    onUpdate: function (key) {
        _crud.onUpdate(key);
        _me.setEditTbar(true);
    },
    onSave: function () {
        _crud.onSave();
        _me.setEditTbar(false);
    },
    onToRead: function () {
        _crud.onToRead();
        _me.setEditTbar(false);
    },
    */

    //#region mNode/mLine custom function
    //load nodes
    mNode_loadJson: function (json) {
        _me.flow.loadNodes(json);
    },

    //getUpdJson
    mNode_getUpdJson: function (upKey) {
        return _me.mNode.getUpdJson(upKey, _me.flow.divFlowBox);
    },

    //return boolean
    mNode_valid: function () {
        return true;
    },

    mLine_loadJson: function (json) {
        _me.flow.loadLines(json);
    },

    //getUpdJson
    mLine_getUpdJson: function (upKey) {
        return _me.mLine.getUpdJson(upKey, _me.flow.divLinesBox);
    },

    //return boolean
    mLine_valid: function () {
        return true;
    },
    //#endregion

}; //class