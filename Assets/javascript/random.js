$.ajax({
    method: 'GET',
    url: 'https://opentdb.com/api.php?amount=10',
}).then(function(response){
    console.log(response);
})