<h2> H5P </h2>

<a href="{{URL::to('/')}}/3" target="_blank" style="color:#0000ff"> New Content </a>
<br>
<br>
<button id="bottone" onclick="SizeToggle()">Extend</button>
<br>
<br>
@foreach($contents as $content)
    <div>
        <span> <b>{{$loop->iteration}}</b> <a href="{{URL::to('/')}}/2/9?id={{$content->id}}" target="_blank"> Title: {{$content->title}}  </a> </span>
    <div class="myDIV" style="text-align:right ; display: inline">
    <span style="padding: 10px"><a href= "{{URL::to('/')}}/edit?id={{$content->id}}" target="_blank" style="color:#00ff00"> Edit </a></span>
    <span style="padding: 0px"> <a href="{{URL::to('/')}}/delete?id={{$content->id}}&delete=1"  style="color:#FF0000"> Delete </a> </span>
    </div>
    </div>
  <br>
@endforeach

<script>
    function SizeToggle() {
        var x = document.getElementsByClassName("myDIV");
        // console.log(x);
        // console.log(x[1]);

        for (i = 0; i < x.length; i++) {
            if (x[i].style.display === "table") {
                x[i].style.display = "inline";
            } else {
                x[i].style.display = "table";
            }
        };

        var btn = document.getElementById("bottone");
        if (btn.innerHTML  ==="Extend"){
            btn.innerHTML  = "Reduce";
        }else{
            btn.innerHTML  = "Extend";
        }
        // if (x.style.display === "table") {
        //     x.style.display = "inline";
        // } else {
        //     x.style.display = "table";
        // }
    }
</script>
