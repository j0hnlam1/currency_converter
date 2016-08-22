var app = angular.module("myapp", []);

function getCurrencies()
{
	    var a = 
    [
        {code: 'USD', rate: 1.00, name: 'US Dollar'},
        {code: 'CND', rate: 1.30, name: 'Canadian Dollar'},
        {code: 'EUR', rate: 31.80, name: 'EURO'},
        {code: 'NTD', rate: 32.00, name: 'New Taiwan Dollar'},
        {code: 'CNY', rate: 6.65, name: 'Chinese Yuan'}
    ];
    return a;
}

app.controller('CurrencyConverter', function($scope, $filter)
{
    $scope.currencies = getCurrencies();
    $direction = 0;
    $scope.from = {option : $scope.currencies[0]};
    $scope.to = {option : $scope.currencies[1]};

    $scope.convert = function(from, to, amount){
        var startVal = $filter('filter')($scope.currencies, {code: from}, true);
        var finalVal = $filter('filter')($scope.currencies, {code: to}, true);
        var USD = 0;
        if(startVal.length)
            USD = amount/startVal[0].rate;
        var final = finalVal[0].rate*USD
        return final;
    }

    $scope.updateSource = function(){
        $scope.from.amount = 
            $scope.convert(
                $scope.to.option.code,
                $scope.from.option.code,
                $scope.to.amount)
            if($scope.from.amount == 0)
                $scope.from.amount = '';
    }

    $scope.updateTarget = function(){
        $scope.to.amount = 
            $scope.convert(
                $scope.from.option.code,
                $scope.to.option.code,
                $scope.from.amount)
            if($scope.to.amount == 0)
                $scope.to.amount = '';
    }

    $scope.$watch('from.amount',function(newRate, oldRate){
        if($scope.direction == 0)
        $scope.updateTarget();    
    });

    $scope.$watch(function(){return $scope.to.option.code;},function(newRate, oldRate){
        if($scope.direction == 0)
            $scope.updateTarget();
    });

    $scope.$watch(function(){return $scope.to.amount;},function(newRate, oldRate){
        if($scope.direction == 1)
            $scope.updateSource();
    });
    $scope.change = function(source){
        if(source == 0){
            $scope.direction = 1
        }else{
            $scope.direction = 0;
        }
    }

});
