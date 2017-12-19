const Video = require('../db').Video;

let getAllTypeOfCategories = (req, res) => {
    let allCatAndSubCat = {};

    Video.find({}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            for(let i = 0; i < data.length; i++) {
                if(!allCatAndSubCat[data[i]['category']]) {
                    console.log(data[i]['category'])
                    allCatAndSubCat[data[i]['category']] = [data[i]['subcategory']]
                } else if(allCatAndSubCat[data[i]['category']]) {
                    if(allCatAndSubCat[data[i]['category']].indexOf(data[i]['subcategory']) === -1) {
                        allCatAndSubCat[data[i]['category']].push(data[i]['subcategory']);
                    }
                }
            }
            res.send(JSON.stringify(allCatAndSubCat));
        }
    });

};

module.exports = getAllTypeOfCategories;
