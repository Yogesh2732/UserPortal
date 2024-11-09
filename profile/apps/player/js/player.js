var current_user = sessionStorage.getItem("user");
var video = document.getElementById("video_player");
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
    if(this.className == "fa-duotone fa-solid fa-circle-play")
    {
        video.play();
        play_btn.className = "fa-duotone fa-solid fa-circle-pause";
    }
   else if(this.className == "fa-duotone fa-solid fa-circle-pause")
    {
        video.pause();
        play_btn.className = "fa-duotone fa-solid fa-circle-play";
    }
}

// progress bar coding

video.ontimeupdate = function()
{
    var t_duration = this.duration;
    var c_duration = this.currentTime;
    
    var v_timing = document.getElementById("v_timing");
    var p_bar = document.getElementById("progress_bar");
    var sec = c_duration - parseInt(c_duration/60)*60;
    var t_sec = t_duration - parseInt(t_duration/60)*60;
    v_timing.innerHTML = parseInt(c_duration/60)+" : "+parseInt(sec)+" / "+parseInt(t_duration/60)+" : "+parseInt(t_sec);
    var slide_per = c_duration*100/t_duration;
    p_bar.style.width = slide_per+"%";

    if(c_duration == t_duration)
    {
        play_btn.className = "fa-duotone fa-solid fa-circle-play";
    }
}


// open & close add video box

var open_v_box = document.getElementById("open_v_box");
var add_video_box = document.getElementById("add_video_box");
open_v_box.onclick = function()
{
    if(open_v_box.className == "fa-duotone fa-solid fa-circle-plus")
    {
        add_video_box.style.display = "block";
        this.className ="fa-sharp-duotone fa-solid fa-circle-xmark";
    }
    else
    {
        add_video_box.style.display = "none";
        this.className ="fa-duotone fa-solid fa-circle-plus";
        
    }
}

// add video in local Storage

var add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function()
{
    var v_name = document.getElementById("video_name");
    var v_link = document.getElementById("video_link");
    if(v_name.value != " " && v_link.value != " ")
    {
        var v_obj = {name:v_name.value,link:v_link.value};
        var v_txt = JSON.stringify(v_obj);
        localStorage.setItem(current_user+"video"+v_name.value,v_txt);
    }
}

// fetch all videos from local storage

function load_videos()
{
    var i;
    for(i=0; i<localStorage.length;i++)
    {
        var all_keys = localStorage.key(i);
        if(all_keys.match(current_user+"video"))
        {
            var v_data = localStorage.getItem(all_keys);
            var video_obj = JSON.parse(v_data);

            var div = document.createElement("DIV");
            div.setAttribute("id","main_video_box");
            var p = document.createElement("P");
            p.className = "p_v_name";
            p.setAttribute("id","playlist_name");
            p.innerHTML = video_obj.name;

            var play_btn = document.createElement("BUTTON");
            play_btn.setAttribute("type","button");
            play_btn.setAttribute("id","v_play_btn");
            play_btn.setAttribute("url",video_obj.link);
            play_btn.className = "v_play_btn";
            play_btn.innerHTML = "Play";

            var delete_btn = document.createElement("BUTTON");
            delete_btn.setAttribute("type","button");
            delete_btn.setAttribute("id","v_delete_btn");
            delete_btn.className = "v_delete_btn";
            delete_btn.innerHTML = "Delete";

            div.appendChild(p);
            div.appendChild(play_btn);
            div.appendChild(delete_btn);

            var all_v = document.getElementById("bottom");
            all_v.appendChild(div);

        }

    }
}
load_videos()


// onclick video play button coding

function play_video()
{
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_v_play_btn.length;i++)
    {
        all_v_play_btn[i].onclick = function()
        {
            clear();
            var v_url = this.getAttribute("url");
            var src_tag = document.getElementById("video_src");
            src_tag.setAttribute("src",v_url);
            video.load();
            video.play();
            play_btn.className = "fa-duotone fa-solid fa-circle-pause";
            this.innerHTML = "Playing...";
        }
    } 
}
play_video();

function clear()
{
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0;i<all_v_play_btn.length;i++)
    {
        all_v_play_btn[i].innerHTML = "play";
    } 
}

// next button coding

function next_button()
{
    var next_btn = document.getElementById("right_btn");
    next_btn.onclick = function()
    {
        var all_v_play_btn = document.getElementsByClassName("v_play_btn");
        var i;
        for(i=0;i<all_v_play_btn.length;i++)
        {
            if(all_v_play_btn[i].innerHTML =="Playing...")
            {
                var next_element = all_v_play_btn[i].parentElement.nextSibling;
                var next_play_btn = next_element.getElementsByClassName("v_play_btn")[0];
                next_play_btn.click();
                return false;

            }
        }
    }

}
next_button();


// previous button coding

function previous_button()
{
    var previous_btn = document.getElementById("left_btn");
    previous_btn.onclick = function()
    {
        var all_v_play_btn = document.getElementsByClassName("v_play_btn");
        var i;
        for(i=0;i<all_v_play_btn.length;i++)
        {
            if(all_v_play_btn[i].innerHTML =="Playing...")
            {
                var previous_element = all_v_play_btn[i].parentElement.previousSibling;
                var previous_play_btn = previous_element.getElementsByClassName("v_play_btn")[0];
                previous_play_btn.click();
                return false;

            }
        }
    }

}
previous_button();


// Delete button coding 

function delete_button()
{
    var all_del_btn = document.getElementsByClassName("v_delete_btn");
    var i;
    for(i=0;i<all_del_btn.length;i++)
    {
        all_del_btn[i].onclick = function()
        {
            var parent = this.parentElement;
            var video_name = parent.getElementsByTagName("P")[0].innerHTML;
            localStorage.removeItem(current_user+"video"+video_name);
            parent.className = "animate__animated animate__bounceOut";
            setTimeout( function(){
                parent.remove();}
                ,1000);
        }
    }
    
}
delete_button();


function volume()
{
    var vol_icon = document.getElementById("volume");
    vol_icon.onclick = function()
    {
        var vol_control = document.getElementById("vol_control");
        if(vol_control.style.display == "none")
        {
            vol_control.style.display = "block";

            vol_control.oninput = function()
            {
                video.volume = this.value;
            }
        }
        else
        {
            vol_control.style.display = "none";
        }
    }

}
volume();


// video forward & backward coding
var p_box = document.getElementById("progress_box");
p_box.onclick = function(event)
{
  var per = event.offsetX/this.offsetWidth;
  video.currentTime = per*video.duration;
}

// video full screen coding
var full = document.getElementById("full_screen");
full.onclick = function()
{
    video.requestFullscreen();
}


// video speed control coding

var speed_icon = document.getElementById("speed_icon")
speed_icon.onclick = function()
{
    var speed_control = document.getElementById("speed_control");
        if(speed_control.style.display == "none")
        {
            speed_control.style.display = "block";

            speed_control.oninput = function()
            {
                video.playbackRate = this.value;
            }
        }
        else
        {
            speed_control.style.display = "none";
        }
}

// search videos coding

var search_box = document.getElementById("search");
search_box.oninput = function()
{
    var all_v_name = document.getElementsByClassName("p_v_name");
    var i;
    for(i=0;i<all_v_name.length;i++)
    {
        if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
        {
            all_v_name[i].parentElement.style.display = "block";
        }
        else
        {
            all_v_name[i].parentElement.style.display = "none";

        }
    }
}


