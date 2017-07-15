var app = angular.module('app');
app.controller('controller',function($scop){
    self = this;
    self.users = [
        {name:'John Smith',city:'Phoenix'},
        {name:'John Doe',city:'New York'},
        {name:'Jahn Doe',city:'San Francisco'}
    ];
});

function SimpleController($scope)
{
    $scope.customers = [
        {
            name:'Dave Jones',
            city:'Phoenix'
        },
        {
            name:'Jamie Riley',
            city:'Atlanta'
        },
        {
            name:'Heedy Wahlin',
            city:'Chandler'
        },
        {
            name:'Thomas Winter',
            city:'Seattle'
        }
    ];
}