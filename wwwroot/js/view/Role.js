var _me = {

    init: function () {        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'Name' },
                { data: '_Fun' },
            ],
            columnDefs: [
                _crud.dtColConfig,
				{ targets: [1], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mRoleProg = new EditMany('Id', 'eformRoleProg', 'tplRoleProg', 'tr');
		_crud.init(config, [null, _me.mRoleProg]);
    },


}; //class