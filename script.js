function validate(){
    if(document.getElementById("B").value=="" || document.getElementById("R").value=="" || document.getElementById("I").value=="" || document.getElementById("C").value=="" || document.getElementById("K").value=="" ){
        swal({
            title: "Empty Cells!",
            text: "You have not filled up all the boxes. Select the color of all the letters to get the Wordle Solution!",
            icon: "warning",
            button: "Okay",
        });
    }
    else{
        result();
    }
}

function result(){
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var brick = document.getElementById("B").value + document.getElementById("R").value + document.getElementById("I").value + document.getElementById("C").value + document.getElementById("K").value ;
            var jumpy = document.getElementById("J").value + document.getElementById("U").value + document.getElementById("M").value + document.getElementById("P").value + document.getElementById("Y").value ;
            var vozhd = document.getElementById("V").value + document.getElementById("O").value + document.getElementById("Z").value + document.getElementById("H").value + document.getElementById("D").value ;
            var glent = document.getElementById("G").value + document.getElementById("L").value + document.getElementById("E").value + document.getElementById("N").value + document.getElementById("T").value ;
            var waqfs = document.getElementById("W").value + document.getElementById("A").value + document.getElementById("Q").value + document.getElementById("F").value + document.getElementById("S").value ;
            
            var color_list=[brick,jumpy,vozhd,glent,waqfs];
            var input_list=["BRICK","JUMPY","VOZHD","GLENT","WAQFS"];
            var word=["","","","",""];
            var green_dict={};
            var yellow_dict={};
            var x;
            for(var i in input_list){
                x=color_list[i];
                for(var j in x){
                    if(x[j]=="y"){
                        yellow_dict[input_list[i][j].toLowerCase()]=j;
                    }
                    if(x[j]=="g"){
                        green_dict[input_list[i][j].toLowerCase()]=j;
                    }
                }
            }
            console.log(green_dict);
            console.log(yellow_dict);
            for(var i in yellow_dict){
                for(var j in word){
                    if(j!=yellow_dict[i]){
                        word[j]+=i;
                    }
                }
            }
            for(var i in green_dict){
                word[green_dict[i]]=i;
            }
            console.log(word);
            var result=[];
            var correct_result=[];
            var reg="";
            if(Object.keys(yellow_dict).length + Object.keys(green_dict).length != 5){
                var extra_str="x";
                for(var i in green_dict){
                    extra_str+=i;
                }
                for(var i in word){
                    if((word[i].length==1) && (word[i] in green_dict)){
                        continue;
                    }
                    else{
                        word[i]+=extra_str;
                    }
                }
            }
            for(var i of word){
                if(i.length>1){
                    reg=reg+"["+i+"]";
                }
                else{
                    reg=reg+i;
                }
            }
            var re= /a/ ;
            var final_reg=RegExp(reg,re.flags);
            console.log(final_reg);
            var words_json;
            var words;
            words_json = this.responseText;
            // console.log(words);
            // // jsonData(data);
            // console.log(words_json);
            words=JSON.parse(words_json);
            console.log(words);
            for(var i in words){
                var search_result= final_reg.test(i);
                if(search_result==true){
                    result.push(i);
                }
            }
            for(var i of result){
                var flag=true;
                for(var j in yellow_dict){
                    if(i.includes(j)){
                        continue;
                    }
                    else{
                        flag=false;
                        break;
                    }
                }
                if(flag==true){
                    correct_result.push(i.toUpperCase());
                }
            }
            console.log(correct_result);
            var show;
            if(correct_result.length==1){
                show=correct_result[0];
            }
            else{
                show=correct_result;
            }

            swal({ title: show,
                    text: `Your word is ${show}. After testing, this software had more than 99% accuracy. Hope that yours is correct as well.`,
                    icon: "success",
                    button:"Solve another WORDLE"}).then(okay => {
                    if (okay) {
                        window.location.href = "/";
                    }
            });
        }
    };
    xmlhttp.open("GET", "words.json", true);
    xmlhttp.send();

    
}