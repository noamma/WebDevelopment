$("h1").addClass("big-title margin-50");
$("button").click(function(){$("h1").toggleClass("purple-title");});
$("input").keypress(function(e){$("h1").text(e.key);});
