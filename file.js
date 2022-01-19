var session_time_para=document.getElementById("session_time_para");
var break_time_para=document.getElementById("break_time_para");

var countdown_min_heading=document.getElementById("countdown_min_heading");
var countdown_sec_heading=document.getElementById("countdown_sec_heading");

//adding event listeners on + - buttons
var session_plus=document.getElementById("session_plus");
session_plus.addEventListener("click",inc);
var session_minus=document.getElementById("session_minus");
session_minus.addEventListener("click",dec);
var break_plus=document.getElementById("break_plus");
break_plus.addEventListener("click",inc);
var break_minus=document.getElementById("break_minus");
break_minus.addEventListener("click",dec);

var session_time=0;
var break_time=0;
var intervalId=null;

//adding event listener on reset button
document.getElementById("reset_button").addEventListener("click",reset);

//getting start button
var start_button=document.getElementById("start_button")

function inc(event)
{
    if(event.target.id=="session_plus")
    {
        if(session_time<60)
        {
            session_time++;
            session_time_para.innerText=session_time+" min";
        }
    }
    else
    {
        if(break_time<60)
        {
            break_time++;
            break_time_para.innerText=break_time+" min";
        }
    }
}

function dec(element)
{
    if(event.target.id=="session_minus")
    {
        if(session_time>0)
        {
            session_time--;
            session_time_para.innerText=session_time+" min";
        }
    }
    else
    {
        if(break_time>0)
        {
            break_time--;
            break_time_para.innerText=break_time+" min";
        }
    }
}

function reset()
{
    if(intervalId!=null)
    {
        clearInterval(intervalId);
        countdown_min_heading.innerText="00";
        countdown_sec_heading.innerText="00";
        document.getElementById("head").style.color="black";
        intervalId=null;
    }
    session_plus.disabled=false;
    session_minus.disabled=false;
    break_plus.disabled=false;
    break_minus.disabled=false;
    start_button.disabled=false;
    session_time=0;
    break_time=0;
    session_time_para.innerText="0 min";
    break_time_para.innerText="0 min";
}

//adding event listener on start button
start_button.addEventListener("click",function()
{
    if(session_time==0 || break_time==0)
    {
        alert("Please enter both Session time and Break time");
        return;
    }
    //disabling all the buttons
    session_plus.disabled=true;
    session_minus.disabled=true;
    break_plus.disabled=true;
    break_minus.disabled=true;
    start_button.disabled=true;
    start();
});

function start()
{
    var countdown_sec=60;
    var ses_time=session_time;
    var brk_time=break_time;
    intervalId=setInterval(function()
    {
        if(ses_time!=0)
        {
            document.getElementById("head").style.color="blue";
            countdown_sec--;
            countdown_sec_heading.innerText=convert_to_twoDigit(countdown_sec);
            countdown_min_heading.innerText=convert_to_twoDigit(ses_time-1);
            if(countdown_sec==0)
            {
                countdown_sec=60;
                ses_time--;
            }
        }
        else if(brk_time!=0)
        {
            document.getElementById("head").style.color="red";
            countdown_sec--;
            countdown_sec_heading.innerText=convert_to_twoDigit(countdown_sec);
            countdown_min_heading.innerText=convert_to_twoDigit(brk_time-1);
            if(countdown_sec==0)
            {
                countdown_sec=60;
                brk_time--;
            }
        }
        else
        {
            countdown_sec=59;
            ses_time=session_time;
            brk_time=break_time;
            document.getElementById("head").style.color="blue";
            countdown_sec_heading.innerText=convert_to_twoDigit(countdown_sec);
            countdown_min_heading.innerText=convert_to_twoDigit(ses_time-1);
        }
    },1000);
}
function convert_to_twoDigit(n)
{
    if(n<10)
        return "0"+n;
    else
        return n;
}