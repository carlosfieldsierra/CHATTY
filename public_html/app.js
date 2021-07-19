window.onload = () => {

    function getMessages(){
        $.ajax({
            url: '/chats',
            method:'GET',
            success: function( result ) {
                var chatPage = $("#chatPage")
               var innerText = ""
               let results = JSON.parse(result);
               
                for (var i in results){
                    innerText += "<span>"+'<b>' + results[i].alias + '</b>'+": " + results[i].message+"</span>" +'<br/><br/>';
                }
                chatPage.html(innerText);
              }
            });
    }

     
    
    
    function addMessage(){
        const msg = $("#textArea").val();
        const alias = $("#alias").val();
        var milliseconds = new Date().getTime();
        let message = {
            time: milliseconds,
            message: msg,
            alias: alias,
        }
        messageObj = JSON.stringify(message)
        $.ajax({
            url: '/chats/post',
            data:{message: messageObj},
            method:'POST',
            success: function( result ) {
            }
        });
    }

    function btnEventListner(){
        var btn = document.getElementById("btn");
        var textArea = $("#textArea")[0];
        btn.addEventListener("click",addMessage);
    }

    function Main(){
        btnEventListner();
        setInterval(getMessages,1000);
    }

    Main();
   

}

