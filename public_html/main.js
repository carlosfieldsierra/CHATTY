/*
    Name: Tony Tavera-Reyes
    Assignment: PA 8
    Discription: This is the java scirpt file in charger and in the 
    middle communication with the HTML file and the server.js, here
    user get element by user of inputs is taken into account and changed
    as this progresses varioables for changes must be made and alarted to be
    inputed into the HTML message board section.
 */
window.onload = () => {
    // This functiopn talks to the server
    function TalkToServer(){
        //checks for user clicking send message
        var clicker = document.getElementById("clicker");
        clicker.addEventListener("click",()=>{
            const userMSh = $("#inputText").val();
            const firstName = $("#firstName").val();
            // time is set to be used to recall data
            const theTime = 10
            let message = {
                time: theTime,
                message: userMSh,
                alias: firstName,
            }
            //this sends the server the message as a string
            sendToServer = JSON.stringify(message)
            $.ajax({
                url: '/chats/post',
                data:{data:sendToServer},
                method:'POST',
                success: function( result ) {
                    console.log("Sent succesfully :)")
                }
            });
        });
        setInterval(()=>{$.ajax({
            url: '/chats',
            method:'GET',
            success: function( result ) {
               var textChange = ""
               let inputChanges = JSON.parse(result);
               // this makes sure that the input makes sense with the ouput
                for (var idx in inputChanges){
                    textChange += "<span>"+'<b>' + inputChanges[idx].alias + '</b>'+": " + inputChanges[idx].message+"</span>" +'<br/><br/>'; // <----
                }

                var messageBoard = $("#messageBoard")
                messageBoard.html(textChange); 
              }
            })},1000);
    }

    TalkToServer();
   

}

