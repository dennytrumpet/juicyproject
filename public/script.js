(function() {
        var url = 'https://api.nutritionix.com/v1_1/search/';
        var appid = 'b5be09da';
        var appkey = '7d3ebf2b22826cfcf7aeceb36774a4fd';
        var brandid = '51db37d0176fe9790a899db2';
        jQuery.getJSON(url, {
                "appId": appid,
                "appKey": appkey,
                "fields": "*",
                "offset": 50,
                "limit": 50,
                "results": "0:50",
                "brand_id": brandid
        }).done(function(data) {
                console.log(data);
                jQuery("#qone").html(data.total_hits);
                var calories = 0;
                var list = [];
                var len = data.hits.length;
                for (var i = 0; i < len; i++) {
                        calories += data.hits[i].fields.nf_calories; // Adds up all the calorie values
                        ingredients = JSON.stringify(data.hits[i].fields.nf_ingredient_statement).split(/\,\s?(?![^\(]*\))/); // creates an array of ingredients spliting on commas not inside parenthesis
                        list.push(...ingredients); // making a big master list of ingredients
                }
                avgCal = calories / len;
                jQuery('#qtwo').html(avgCal);

                // Function that only returns unique items
                function filterDupes(value, index, self) {
                        return self.indexOf(value) === index;
                }
                var cleanList = list.filter(filterDupes); // Creates array of only unique ingridents
                for (var i = 0; i < cleanList.length; i++) {
                        cleanList[i] = cleanList[i].replace('"', '');
                        jQuery('#qthree select').append('<option value="' + cleanList[i] + '">' + cleanList[i] + '</option>');
                }
                jQuery('#qthree select').change(function() {
                        jQuery('#item-list').html('');
                        var needle = jQuery('#qthree select').val();
                        for (var i = 0; i < len; i++) {
                                // Checks ingredient statement field for chosen ingredient and spits out HTML for products
                                if (JSON.stringify(data.hits[i].fields.nf_ingredient_statement).includes(needle)) {
                                        jQuery('#item-list').append('<div class="card item-card ' + data.hits[i].fields.item_name + '"><div class="card-body"><h5 class="card-title item-title">' + data.hits[i].fields.item_name + '</h5><span class="item-description">' + data.hits[i].fields.item_description + '</span></div></div>');
                                }
                        };
                });
        })
})();
