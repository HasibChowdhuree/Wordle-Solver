function validate(){
    var colors = document.getElementById("B").value + document.getElementById("R").value + document.getElementById("I").value + document.getElementById("C").value + document.getElementById("K").value + document.getElementById("J").value + document.getElementById("U").value + document.getElementById("M").value + document.getElementById("P").value + document.getElementById("Y").value + document.getElementById("V").value + document.getElementById("O").value + document.getElementById("Z").value + document.getElementById("H").value + document.getElementById("D").value + document.getElementById("G").value + document.getElementById("L").value + document.getElementById("E").value + document.getElementById("N").value + document.getElementById("T").value + document.getElementById("W").value + document.getElementById("A").value + document.getElementById("Q").value + document.getElementById("F").value + document.getElementById("S").value ;
    
    if(colors.includes("g") || colors.includes("y")){
        result();
    }
    else{
        swal({
            title: "No green or yellow letters!",
            text: "You have not selected any green or yellow letters. Select yellow or green as the color of some of the letters to get the Wordle Solution!",
            icon: "warning",
            button: "Okay",
        });
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
                swal({ title: show,
                    text: `Your word is ${show}. \nThank you for using Wordle Solver. Have a nice day!`,
                    icon: "success",
                    button:"Solve another WORDLE"}).then(okay => {
                    if (okay) {
                        window.location.href = "https://www.hasibchowdhuree.website/Wordle-Solver/";
                    }
                });
            }
            else if(correct_result.length==0 && Object.keys(yellow_dict).length + Object.keys(green_dict).length < 4){
                swal({ title: "Insufficient Information!",
                    text: "Kindly check again and make sure that you have selected the green and yellow letters correctly",
                    icon: "warning",
                    button: "Okay",
                });
            }
            else if(correct_result.length==0){
                swal({ title: "Word unavailable in dataaset",
                    text: "Sorry! Your word is unavailable in our dataset. \nThis may occcur due to the fact that you are solving Wordle puzzle from other websites. \nWe used the same dataset that the real Wordle (nytimes.com/games/wordle) uses. \nKindly email the word to hasibchowdhuree@outlook.com so that we can add this word in our dataset.",
                    icon: "warning",
                    button: "Solve another WORDLE"}).then(okay => {
                        if (okay) {
                            window.location.href = "https://www.hasibchowdhuree.website/Wordle-Solver/";
                        }
                });
            }
            else{
                show=correct_result;
                swal({ title: show,
                    text: `Your word is one of the following - ${show}. \nSorry we could not narrow it down to one word. But we can assure you that it is one of these. \n99% of the time, we narrow it down to one word, This word has to be one of those 1%.`,
                    icon: "success",
                    button:"Solve another WORDLE"}).then(okay => {
                    if (okay) {
                        window.location.href = "https://www.hasibchowdhuree.website/Wordle-Solver/";
                    }
                });
            }

            
        }
    };
    xmlhttp.open("GET", "words.json", true);
    xmlhttp.send();

    
}