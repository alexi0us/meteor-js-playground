
Session.set( 'somebody' , 'World' );
Session.set( 'product' , 'Book' );



Template.hello.somebody = function(){
    return Session.get('somebody');
}

Template.form.events({
    'click input[type=submit]': function(){
        if($('#newName').val() == ''){
            Session.set( 'somebody' , 'Alexis' );
        }
        else{
            Session.set( 'somebody' , $('#newName').val() );
        }
    }
});



Template.data.product = function(){

    // server async
    Meteor.http.get("http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast?pretty", function (err, res) {
        console.log(res.statusCode, res.data);

        if(res.statusCode==200) {
            var respJson = JSON.parse(res.content);
            console.log("response received.");
            var price = [];
            price[0] = respJson.data.last_local.value
            price[1] = respJson.data.last_local.currency
            Session.set('price', price)
            console.log(price);
            return price;

        } else {
            console.log("Response issue: ", result.statusCode);
            var errorJson = JSON.parse(result.content);
            throw new Meteor.Error(result.statusCode, errorJson.error);
        }

    });
    return Session.get('price');

}