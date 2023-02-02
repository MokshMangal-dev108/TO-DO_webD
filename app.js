const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const app = express();

app.set('view engine','ejs');//always write this after const app because this line works only our app exists.

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
// var item="";
const items=[];
const workItems=[];

//Always remember that not use this res.send because server treat this as a final command but if we use res.write then it will works as print statement.
app.get('/',function(req,res){
    
    // switch (curr_day) {
    //     case 0:
    //         day="Sunday";
    //         break;
    //     case 1:
    //         day="Monday";
    //         break;
    //     case 2:
    //         day="Tuesday";
    //         break;
    //     case 3:
    //         day="Wednesday";
    //         break;
    //     case 4:
    //         day="Thrusday";
    //         break;
    //     case 5:
    //         day="Friday";
    //         break;
    //     case 0:
    //         day="Saturday";
    //         break;
    //     default:
    //         break;
    // }
    // if(curr_day==6||curr_day==0){
    //     day+="weekend";
    // }else{
    //     day+="weekday";
    // }
    let day = date.getDate();
    res.render("list",{ListTitle:day,newListItem:items});
});

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/",function(req,res){
    let item = req.body.newItem;
    if(req.body.list==='Work'){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(req.body.newItem);
        //console.log(item);
        res.redirect('/');
    }
});
app.get("/work",function(req,res){
    res.render('list',{ListTitle:"Work List",newListItem:workItems})
});
// app.post("/work",function(req,res){
//     workItems.push(req.body.newItem);
//     res.redirect('/work');
// })

app.listen(3000,function(){
    console.log("server is running on port 3000");
});