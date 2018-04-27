function removeProject() {
    var data = $(this).parent().data(),
        led = data.led,
        id = data.id,
        title = data.title;

    $("#project_select_box").append(
        $("<option></option>")
            .attr("value",id)
            .text(title)
    ); 
    $(this).parent().remove();
}

function addProject(hooksUrl) {
    var led = $("#led_number").val(), 
        ledMonitor = $("#led_monitor").val() ? $("#led_monitor").val() : 0,
        ledDeploy = $("#led_deploy").val() ? $("#led_deploy").val() : 0,
        monitorUrl = $("#ping_url").val() ? $("#ping_url").val() : "",
        selectedTitle = $("#project_select_box").find(":selected").text(),
        selectedEnvironment = $("#environment_select_box").find(":selected"),
        removeProjectFromList = 0;
        error = 0;
    if(led) {
        $(".projects_with_leds").each(function (element) { 
            if(selectedTitle == $(this).data("title"))
                removeProjectFromList = removeProjectFromList + 1;
            if(selectedTitle == $(this).data("title") && selectedEnvironment.val() == $(this).data("environment"))
                error = "That project is already in the above list";
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
        if(led == ledMonitor || led == ledDeploy || (ledDeploy == ledMonitor && ledDeploy != 0))
            error = "Leds can't be equal";
        if(!error) {
            var itemClass = $(".projects_with_leds").length % 2 == 0 ? "list-group-item-info" : "list-group-item-secondary"
                selectedProject = $("#project_select_box").find(":selected")
                uuid = guid(),
                a = $("<a></a>")
                    .attr("data-led", led)
                    .attr("data-ledmonitor", ledMonitor)
                    .attr("data-leddeploy", ledDeploy)
                    .attr("data-monitorUrl", monitorUrl)
                    .attr("data-uuid", uuid)
                    .attr("data-id", selectedProject.val())
                    .attr("data-environment", selectedEnvironment.val())
                    .attr("data-title",selectedProject.text())
                    .attr("class","list-group-item " + itemClass + " projects_with_leds"),
                divItem = $("<div></div>")
                    .attr("class","bmd-list-group-col"),
                pTitle = $("<p></p>")
                    .attr("class","list-group-item-heading")
                    .text(selectedProject.text()+ " [" + selectedEnvironment.text() + "]"),
                pSubheading = $("<p></p>")
                    .attr("class","list-group-item-text")
                    .text(hooksUrl + uuid),
                pBadges = $("<p></p>")
                    .attr("class","list-group-item-text"),
                badgeLed = $('<span></span>')
                    .attr("class","badge badge-success")
                    .text("Build LED: "+led),
                badgeMonitor = $('<span></span>')
                    .attr("class","badge badge-danger")
                    .text("Monitor LED: "+ledMonitor),
                badgeDeploy = $('<span></span>')
                    .attr("class","badge badge-warning")
                    .text("Deploy LED: "+ledDeploy),
                close = $("<span></span>")
                    .attr("class","label label-default label-pill")
                    .text("X")
                    .click(removeProject);
            badgeLed.appendTo(pBadges);
            if(ledMonitor)
                badgeMonitor.appendTo(pBadges);
            if(ledDeploy)
                badgeDeploy.appendTo(pBadges);
            pTitle.appendTo(divItem);
            pSubheading.appendTo(divItem);
            pBadges.appendTo(divItem);
            divItem.appendTo(a);
            close.appendTo(a);
            a.appendTo("#project_list");
            if(removeProjectFromList == ($("#environment_select_box").children('option').length - 1))
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
        var ledMonitor = $(this).data("ledmonitor"),
            leddeploy = $(this).data("leddeploy")
            url = $(this).data("monitorurl"),
            dataElement = {
                id: $(this).data("uuid"),
                ledBuild: $(this).data("led"),
                environment: $(this).data("environment"),
                name: $(this).data("title")
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