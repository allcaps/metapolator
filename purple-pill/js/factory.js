app.factory("sharedScope", function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.data = {
        projectName : "Rozha",
        sequences : [{
            id : 0,
            name : "Sequence 1",
            masters : []
        }],
        adjustmentMasters : [],
        designSpaces : [{
            trigger : 0,
            name : "Space 0",
            id : 0,
            type : "x",
            masters : [],
            axes : [],
            triangle : false,
            mainMaster : 1

        }],
        families : [{
            id : 0,
            instances : []
        }],
        currentDesignSpace : null,
        eventHandlers : {
            mousedown : false,
            initialDisplay : null
        },
        localmenu : {
            project : false,
            help : false,
            masters : false,
            instances : false,
            designspace : false,
            fonts : false
        },
        view : {
            menuItems : ["Parameters", "Design spaces", "Fonts"],
            viewState : 1,
            panels : [3, 10, 3, 10, 3, 1, 12],
            totalPanelParts : 42,
            dividers : [{
                add : 0,
                subtract : 1,
                dead : 2,
                mirror : null,
                position : [0],
                view : 0,
                side : "left",
                contain : "left",
                limitMin : 180,
                limitMax : 270
            }, {
                add : 2,
                subtract : 1,
                dead : 0,
                mirror : 3,
                position : [0, 1],
                view : 0,
                side : "right",
                contain : "right",
                limitMin : 180,
                limitMax : 270
            }, {
                add : 2,
                subtract : 3,
                dead : 4,
                mirror : 1,
                position : [2],
                view : 1,
                side : "left",
                contain : "left",
                limitMin : 180,
                limitMax : 270
            }, {
                add : 4,
                subtract : 3,
                dead : 2,
                mirror : 6,
                position : [2, 3],
                view : 1,
                side : "right",
                contain : "right",
                limitMin : 180,
                limitMax : 270
            }, {
                add : 6,
                subtract : 4,
                dead : 5,
                mirror : 3,
                position : [4, 5],
                view : 2,
                side : "right",
                contain : "left",
                limitMin : 260,
                limitMax : 350
            }]

        },
        parametersPanel : 0,
    };
    return scope;
});
