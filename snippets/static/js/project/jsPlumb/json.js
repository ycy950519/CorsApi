var fs = require("fs");

function writeJson(params){
    //现将json文件读出来
    fs.readFile('/CorsApi/snippets/static/js/storeage.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.data.push(params);//将传来的对象push进数组对象中
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        console.log(person.data);
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('/CorsApi/snippets/static/js/storeage.json',str)
    })
}


function deleteJson(id){
    fs.readFile('/CorsApi/snippets/static/js/storeage.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来删除
        for(var i = 0; i < person.data.length;i++){
            if(id == person.data[i].id){
                
                person.data.splice(i,1);
            }
        }
        console.log(person.data);
        person.total = person.data.length;
        var str = JSON.stringify(person);
        //然后再把数据写进去
        fs.writeFile('/CorsApi/snippets/static/js/storeage.json',str)
    })
}


function changeJson(id,params){
    fs.readFile('/CorsApi/snippets/static/js/storeage.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来,然后进行修改
        for(var i = 0; i < person.data.length;i++){
            if(id == person.data[i].id){
                
                for(var key in params){
                    if(person.data[i][key]){
                        person.data[i][key] = params[key];
                    }
                }
            }
        }
        person.total = person.data.length;
        var str = JSON.stringify(person);
        //console.log(str);
        fs.writeFile('/CorsApi/snippets/static/js/storeage.json',str)
    })
}

function pagination(p,s){
    //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
    fs.readFile('/CorsApi/snippets/static/js/storeage.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来
        //console.log(person.data);
        var length = person.data.length;
        var pagePerson = person.data.slice(s*p,(p+1)*s);
        
    })
}

