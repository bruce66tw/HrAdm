﻿var _me = {

    init: function () {        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'UserId' },
                { data: 'AgentId' },
                { data: 'LeaveType' },
                { data: 'StartTime' },
                { data: 'EndTime' },
                { data: 'Hours' },
                { data: 'FlowSignStatus' },
                { data: 'Created' },
            ],
            columnDefs: [
                _crud.dtColConfig,
            ],
        };

        //initial
		_crud.init(config);
    },

}; //class