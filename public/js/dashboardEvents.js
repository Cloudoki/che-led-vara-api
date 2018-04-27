function removeProject(evt) {
    var data = $(this).parent().data();
    var led = data.led;
    var id = data.id;
    var title = data.title
    $("#project_select_box").append(
        $("<option></option>")
            .attr("value",id)
            .text(title)
    ); 
    $(this).parent().remove();
}

function addProject(hooksUrl) {
    var led = $("#led_number").val();
    var ledMonitor = $("#led_monitor").val() ? $("#led_monitor").val() : 0;
    var ledDeploy = $("#led_deploy").val() ? $("#led_deploy").val() : 0;
    var monitorUrl = $("#ping_url").val() ? $("#ping_url").val() : "";
    var error = 0;
    if(led) {
        $(".projects_with_leds").each(function (element) { 
            if(
                //Check the main led is unique
                $(this).data("led") == led || $(this).data("ledmonitor") == led || $(this).data("leddeploy") == led
            || 
                //if monitor led is provided check is unique
            (ledMonitor && (
                $(this).data("led") == ledMonitor || $(this).data("ledmonitor") == ledMonitor || $(this).data("leddeploy") == ledMonitor))
                //if deploy led is provided check if unique
            ||
            (ledDeploy && (
                $(this).data("led") == ledDeploy || $(this).data("ledmonitor") == ledDeploy || $(this).data("leddeploy") == ledDeploy))
            )  
                error = "Led invalid";
        }); 
        if(led == ledMonitor || led == ledDeploy || ledDeploy == ledMonitor)
            error = "Leds can't be equal";
        if(!error) {
            var itemClass = $(".projects_with_leds").length % 2 == 0 ? "list-group-item-info" : "list-group-item-secondary";
            var selectedProject = $("#project_select_box").find(":selected");
            var selectedEnvironment = $("#environment_select_box").find(":selected");
            var uuid = guid();
            var a = $("<a></a>")
                .attr("data-led", led)
                .attr("data-ledmonitor", ledMonitor)
                .attr("data-leddeploy", ledDeploy)
                .attr("data-monitorUrl", monitorUrl)
                .attr("data-uuid", uuid)
                .attr("data-id", selectedProject.val())
                .attr("data-environment", selectedEnvironment.val())
                .attr("data-title",selectedProject.text())
                .attr("class","list-group-item " + itemClass + " projects_with_leds");
            var divItem = $("<div></div>")
                .attr("class","bmd-list-group-col");
            var pTitle = $("<p></p>")
                .attr("class","list-group-item-heading")
                .text(selectedProject.text()+ " [" + selectedEnvironment.text() + "]");
            var pSubheading = $("<p></p>")
                .attr("class","list-group-item-text")
                .text(hooksUrl + uuid);
            var close = $("<span></span>")
                .attr("class","label label-default label-pill")
                .text("X")
                .click(removeProject);
            pTitle.appendTo(divItem);
            pSubheading.appendTo(divItem);
            divItem.appendTo(a);
            close.appendTo(a);
            a.appendTo("#project_list");
            selectedProject.remove();
            error = 0;
            $(".error").text("").hide();
            $("#led_number").val("");
            $("#led_monitor").val("");
            $("#led_deploy").val("");
            $("#ping_url").val("");
        }
    } else 
        error = "Led is required";

    if(error)
        $(".error").text(error).show();
    
}

function saveProjects() {
    var data = [];
    $(".projects_with_leds").each(function (index) { 
        var ledMonitor = $(this).data("ledmonitor");
        var leddeploy = $(this).data("leddeploy");
        var url = $(this).data("monitorurl");
        var dataElement = {
            id: $(this).data("uuid"),
            ledBuild: $(this).data("led"),
            environment: $(this).data("environment")
        };
        if(ledMonitor) dataElement.ledMonitor = ledMonitor;
        if(leddeploy) dataElement.ledDeploy = leddeploy;
        if(url) dataElement.monitorUrl= url
        
        data.push(dataElement);
    });

    //[{"id", "ledBuild", "ledMonitor", "monitorUrl"},...]
    console.log(data);
    var dataObject = {data:data}
    
    $.ajax({
        type: "POST",
        url: "/projects",
        data: JSON.stringify(data),
        success: function() {console.log("ok");},
        dataType: "json",
        contentType: "application/json",
        processData: false
    });
}