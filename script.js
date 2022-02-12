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

    }
}
