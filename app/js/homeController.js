app.controller('homeController', function($scope) {
    $scope.selectedPerson = 0;
    $scope.selectedGenre = null;
    $scope.searchText = "";
    $scope.people = [
        { id: 0, name: 'Leon', music: [ 'Rock', 'Metal', 'Dubstep', 'Electro' ] },
        { id: 1, name: 'Chris', music: [ 'Indie', 'Drumstep', 'Dubstep', 'Electro' ] },
        { id: 2, name: 'Harry', music: [ 'Rock', 'Metal', 'Thrash Metal', 'Heavy Metal' ] },
        { id: 3, name: 'Allyce', music: [ 'Pop', 'RnB', 'Hip Hop' ] }
    ];

    $scope.newPerson = '';
    $scope.addNew = function() {
        $scope.people.push({id: 10, name: $scope.newPerson, music:[]});
    };
});
