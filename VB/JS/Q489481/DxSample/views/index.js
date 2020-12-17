DxSample.Index = function (params) {
    var page = ko.observable();
    var pageSize = 3;
    var viewModel = {
        prevButtonVisible: ko.computed(function() {
            return page() > 0;
        }),
        nextButtonVisible: ko.observable(),
        handlePrevButtonClick: function () {
            page(page() - 1);
        },
        handleNextButtonClick: function () {
            page(page() + 1);
        },
        dataSource: ko.observableArray(),
        viewShown: function () {
            page(0);
        }
    };
    page.subscribe(function (newValue) {
        DxSample.db.sampleData.load({
            skip: newValue * pageSize,
            take: pageSize + 1
        }).done(function (data) {
            if (data.length > pageSize) {
                viewModel.nextButtonVisible(true);
                data.pop();
            } else viewModel.nextButtonVisible(false);
            viewModel.dataSource(data);
        });
    });
    return viewModel;
};