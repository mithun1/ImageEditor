var tcount = 0;
var undovalue = [];
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('l c(8,1){3 5=a.d(8);6(1){9(3 4 e 1)6(1.f(4))5.b(4,1[4])}9(3 i=2;i<7.m;i++){3 0=7[i];6(j 0=="k")0=a.h(0);5.n(0)}g 5}',24,24,'child|attributes||var|attr|node|if|arguments|name|for|document|setAttribute|elt|createElement|in|hasOwnProperty|return|createTextNode||typeof|string|function|length|appendChild'.split('|'),0,{}))

var controls = Object.create(null);
function createPaint(parent)
{
var canvas = elt("canvas", {width: 500, height: 300});
var cx = canvas.getContext("2d");
var toolbar = elt("div", {class: "toolbar"});
for(var name in controls)
toolbar.appendChild(controls[name](cx));
var panel = elt("div", {class: "picturepanel"}, canvas);
parent.appendChild(elt("div", null, panel, toolbar));
copyright();
}

//Tool selection

var tools = Object.create(null);

controls.tool = function(cx)
{
var select = elt("select");
for(var name in tools)
select.appendChild(elt("option", null, name));

cx.canvas.addEventListener("mousedown", function(event)
{
if(event.which == 1)
{
if(tcount == 0)
{
cx.fillText("www.webapsolution.com/paint/", 10, 10);
tcount = 1;
}
tools[select.value](event, cx);
var imgdata = cx.canvas.toDataURL();
undovalue.push(imgdata);
event.preventDefault();
}
});
return elt("span", null, "Tool: ", select);
};

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('2 8(1,a){c 9=a.r();q{x:b.e(1.t-9.s),y:b.e(1.p-9.n)}}2 k(5,4){2 6(1){d("f",5);d("g",6);B(4)4(1)}h("f",5);h("g",6)}7.l=2(1,0,4){0.u="w";c 3=8(1,0.m);k(2(1){0.z();0.v(3.x,3.y);3=8(1,0.m);0.A(3.x,3.y);0.E()},4)};7.D=2(1,0){0.j="i-C";7.l(1,0,2(){0.j="i-o"})};',41,41,'cx|event|function|pos|onEnd|onMove|end|tools|relativePos|rect|element|Math|var|removeEventListener|floor|mousemove|mouseup|addEventListener|destination|globalCompositeOperation|trackDrag|Line|canvas|top|over|clientY|return|getBoundingClientRect|left|clientX|lineCap|moveTo|round|||beginPath|lineTo|if|out|Erase|stroke'.split('|'),0,{}))

//Color and brush size

controls.color = function(cx) {
var input = elt("input", {type: "color"});
input.addEventListener("change", function() {
cx.fillStyle = input.value;
cx.strokeStyle = input.value;
});
return elt("span", null, "Color: ", input);
};

controls.brushSize = function(cx)
{
var select = elt("select");
var sizes = [1, 2, 3, 4, 5, 8, 12, 25, 35, 50, 75, 100];
sizes.forEach(function(size) {
select.appendChild(elt("option", {value: size}, size + " pixels"));
});
select.addEventListener("change", function() {
cx.lineWidth = select.value;
});
return elt("span", null, "Brush size: ", select);
};

controls.fontchoice = function(cx)
{
var fontselect = elt("select");
var fonts = ["Lucida Console", "Arial", "Arial Black", "Avantgarde, sans-serif", "Book Antiqua", "Charcoal", "Impact, Charcoal, sans-serif", "Lucida Sans Unicode", "fantasy", "Arial, italic", "Comic Sans MS", "Tahoma, Geneva, sans-serif", "Courier New", "Lucida Console", "Palatino Linotype", "monospace", "Trebuchet MS", "Verdana", "Zapf Chancery, cursive", "'Tangerine', serif"];
fonts.forEach(function(fs){
fontselect.appendChild(elt("option", {value: fs},fs+""));
//fontselect.appendChild(elt("option", {value: fontselect}, fontselect));
});
fontselect.addEventListener("change", function() {
cx.fontc = fontselect.value;
});
return elt("span", null, "Font-family :", fontselect);
};

controls.fontlanguage = function(cx)
{
var fontlan = elt("select");
var fonts = ["select a language", "english", "bengali", "hindi", "hindi-italic", "hindi-bold", "Oriya", "Oriya-bold"];
fonts.forEach(function(fs){
fontlan.appendChild(elt("option", {value: fs},fs+""));
});
fontlan.addEventListener("change", function() {
cx.fontl = fontlan.value;
});
return elt("span", null, "Language :", fontlan);
};

//saving
controls.save = function(cx) {
var link = elt("a", {href: "/"}, "save");
function update() {
try {
link.href = cx.canvas.toDataURL();
}
catch (e) {
if (e instanceof SecurityError)
link.href = "javascript:alert(" +
JSON.stringify("Can't save: " + e.toString()) + ")";
else
throw e;
}
}
link.addEventListener("mouseover", update);
link.addEventListener("focus", update);
return link;
};



function loadImageURL(cx, url) {
  var image = document.createElement("img");
  image.addEventListener("load", function() {
    var color = cx.fillStyle, size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image, 0, 0);
    cx.fillStyle = color;
    cx.strokeStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}

controls.openFile = function(cx) {
  var input = elt("input", {type: "file"});
  input.addEventListener("change", function() {
    if (input.files.length == 0) return;
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      loadImageURL(cx, reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  });
  return elt("div", null, "Open file: ", input);
};

controls.openURL = function(cx) {
  var input = elt("input", {type: "text"});
  var form = elt("form", null,
                 "Open URL: ", input,
                 elt("button", {type: "submit"}, "load"));
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    loadImageURL(cx, input.value);
  });
  return form;
};
//paint
controls.Paint = function(cx) {
  var input = "";
  //"C:/Users/Prabal/Desktop/pint/image.jpg";
  //elt("input", {type: "text"}, "C:/Users/Prabal/Desktop/pint/image.jpg");
  
  var form1 = elt("form", null,
                 "Draw Picture: ", input,
                 elt("button", {type: "submit"}, "DRAWING BOARD"));
				 var nv = "image2.jpg";
  form1.addEventListener("submit", function(event) {
    event.preventDefault();
    loadImageURL(cx, nv);
  });
  return form1;
};

/*start*/
 	Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var textcount = 0;
var text;
tools.Text = function(event, cx) {
if(textcount == 0)
{
var textlb1 = elt("label", null, "Add Text:");
var divtxt = elt("DIV", {id: "myTexth"});
var areatxt = elt("TEXTAREA", {id: "myText", rows: "4", cols: "50"});
var keyboardAdd = elt("P", {id: "k1"});
var keyboardAdda = elt("A", {id: "ka1", href: "#"}, "Add Keyboard");
var keyboardClear = elt("P", {id: "clr"});
var keyboardCleara = elt("A", {id: "kcd1", href: "#"}, "Clear Keyboard");
var closetxt = elt("P", {id: "close"});
var closetxta = elt("A", {id: "closea", href: "#"}, "Close");
var myDiv1 = elt("DIV", {id: "div2"});

closetxt.addEventListener("click", function() {
document.getElementById("myTexth").remove();
	
	textcount = 0;
});
 
 
 keyboardClear.addEventListener("click", function() {
var listkey = document.getElementById("div2");
    while (listkey.hasChildNodes()) {
        listkey.removeChild(listkey.firstChild);
    }
//listkey.remove();
document.getElementById("k1").style.display = 'block';
document.getElementById("clr").style.display = 'none';
document.getElementById("div2").style.display = 'none';
textcount = 0;
});


//keyboardAdd.appendChild(keyboardAdda);
//keyboardClear.appendChild(keyboardcleara);

keyboardAdd.appendChild(keyboardAdda);
keyboardClear.appendChild(keyboardCleara);
closetxt.appendChild(closetxta);
divtxt.appendChild(textlb1);
divtxt.appendChild(areatxt);
divtxt.appendChild(keyboardAdd);
divtxt.appendChild(keyboardClear);
divtxt.appendChild(closetxt);
divtxt.appendChild(myDiv1);
//document.divtxt.appendChild(areatxt);
  document.body.appendChild(divtxt);
 textcount = 1;
 }
 //document.getElementById("myText").style.display = 'block';
  text = document.getElementById("myText").value;
 /* areatxt.addEventListener("change", function() {
text = areatxt.value;
});*/
  if(text == "")
  {
  text = " ";
  }
  //prompt("Text:", "");
  if (text) {
    var pos = relativePos(event, cx.canvas);
	if(cx.fontl == "english")
	{
	document.getElementById("myText").style.fontFamily = cx.fontc;
    cx.font = Math.max(7, cx.lineWidth) + "px " + cx.fontc;
	}
	else
	{
	cx.font = Math.max(7, cx.lineWidth) + "px " + cx.fontl;
	document.getElementById("myText").style.fontFamily = cx.fontl;
	}
	event.preventDefault();
    cx.fillText(text, pos.x, pos.y);
  }
  document.getElementById("clr").style.display = 'none';
  //document.getElementById('reset').style.display = 'none';
 
 
 var a;
var k = 1;
var btn;
var btnr;
keyboardAdd.addEventListener("click", function() {
myFunStyle();
document.getElementById("clr").style.display = 'block';
document.getElementById("k1").style.display = 'none';
if (btn !== undefined)
{
disable();
}
for (var i = 65; i < 127; i++)
{
if(i == 91)
{
i = 40;
}
if(i == 92)
{
i = 60;
}
if(i == 93)
{
i = 32;
}
    var res = String.fromCharCode(i);
    //document.getElementById("demo").innerHTML = res;
 var btn = document.createElement("BUTTON");
    var t = document.createTextNode(res);
    btn.appendChild(t);
	var att = document.createAttribute("id");
	att.value = i;
	btn.setAttributeNode(att);
	//btn.onclick = addtext(this.value);
    btn.addEventListener( 'click', function(){
		if(k == 1)
	{
	addtext1(this.id);
	}
/*
document.getElementById("demo").innerHTML = ch;
var t = document.getElementById('t2').value;
document.getElementById('t2').value = t + ch;*/
});
myDiv1.appendChild(btn);
    //document.body.appendChild(btn);
	if(i == 40)
{
i = 91;
}
if(i == 60)
{
i = 92;
}
if(i == 32)
{
i = 93;
}
}
for (var i = 161; i < 256; i++)
{
if(i == 173)
{
i = 36;
}
    var res = String.fromCharCode(i);
    //document.getElementById("demo").innerHTML = res;
 var btn = document.createElement("BUTTON");
    var t = document.createTextNode(res);
    btn.appendChild(t);
	var att = document.createAttribute("id");
	att.value = i;
	btn.setAttributeNode(att);
	var attn = document.createAttribute("name");
	attn.value = "bt";
	btn.setAttributeNode(attn);
	//btn.onclick = addtext(this.value);
    btn.addEventListener( 'click', function(){
	if(k == 1)
	{
	addtext1(this.id);
	}
/*
document.getElementById("demo").innerHTML = ch;
var t = document.getElementById('t2').value;
document.getElementById('t2').value = t + ch;*/
} );
myDiv1.appendChild(btn);
    //document.body.appendChild(btn);
	if(i == 36)
{
i = 173;
}
}
document.getElementById("div2").style.display = 'block';
document.getElementById("k1").style.display = 'none';
document.getElementById("div2").style.display = 'block';
});
var nt;
function addtext(ch)
{

var nt = String.fromCharCode(ch);
var t = document.getElementById('t2').value;
document.getElementById('t2').value = t + nt;
}
function addtext1(ch)
{

var nt = String.fromCharCode(ch);
var t = document.getElementById('myText').value;
document.getElementById('myText').value = t + nt;
}
function disable()
{
for (var i = 65; i < 127; i++)
{
if(i == 91)
{
i = 40;
}
if(i == 92)
{
i = 60;
}
if(i == 93)
{
i = 32;
}
  
 btnr = document.getElementById(i);
myDiv1.removeChild(btnr);
    //document.body.appendChild(btn);
	if(i == 40)
{
i = 91;
}
if(i == 60)
{
i = 92;
}
if(i == 32)
{
i = 93;
}
}
for (var i = 161; i < 256; i++)
{
if(i == 173)
{
i = 36;
}
  btnr = document.getElementById(i);
myDiv1.removeChild(btnr);
    //document.body.appendChild(btn);
	if(i == 36)
{
i = 173;
}
}
document.getElementById("k1").style.display = 'block';
document.getElementById("clr").style.display = 'none';
}

function myFunStyle() {
	var txtl = document.getElementById("myText").style.fontFamily;
    var x = document.createElement("STYLE");
    var t = document.createTextNode("#div2 BUTTON{font-family:" + txtl + ";}");
    x.appendChild(t);
    document.head.appendChild(x);
}


};
/*End*/

/*option created by javascript */

var circleopt = 0;
var rectangleopt = 0;
var countdiv = 0;
var ft;
var ft1;
var lengthrect;
var bth;
var shapechoice;
var ls1;
var ls2;
var ls3;
var ls4;
var cs1;
var cs2;
var cs3;
var cs4;
  tools.Shape = function(event, cx)
  {
 var pos = relativePos(event, cx.canvas);

  if(countdiv == 0)
{
var divshape = elt("DIV", {id: "shape1"});
var shapetype = elt("select", {id: "shapetype"});
var shapeopt = ["select an option", "circle", "rectangle", "line", "curve"];
shapeopt.forEach(function(fs){
shapetype.appendChild(elt("option", {value: fs},fs+""));
});
shapetype.addEventListener("change", function() {
shapechoice = shapetype.value;


if(shapechoice == 'circle')
{

if(circleopt !== 1)
{
var divshape1 = elt("DIV", {id: "sdiv1", display: "block"});
var inputlb1 = elt("label", null, "Radius:");
//var inputr = elt("TEXTAREA", {id: "tr1", rows: "1", cols: "1"});
var inputr = elt("input", {type: "text", size: "4", id: "tr1"});
var inputlb2 = elt("label", null, "Circle Type:");
var cr = elt("select", {id: "slv1"});
var cropt = ["select an option", "full", "half"];
cropt.forEach(function(fs1){
cr.appendChild(elt("option", {value: fs1},fs1+""));
});
cr.addEventListener("change", function() {
ft = cr.value;
});
var cclock = elt("select", {id: "slv2"});
var cropt1 = ["select an option", "clockwise", "anticlockwise"];
cropt1.forEach(function(fs2){
cclock.appendChild(elt("option", {value: fs2},fs2+""));
});
cclock.addEventListener("change", function() {
ft1 = cclock.value;
});
inputr.addEventListener("change", function() {
cirredious = inputr.value;
});
//cirredious = inputr.value;
//alert(cirredious);
divshape1.appendChild(inputlb1);
divshape1.appendChild(inputr);
divshape1.appendChild(inputlb2);
divshape1.appendChild(cr);
divshape1.appendChild(cclock);
divshape.appendChild(divshape1);
circleopt = 1;
rectangleopt = 0;

}
var list1 = document.getElementById("sdiv2");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
		}
var list2 = document.getElementById("sdiv3");
    while (list2.hasChildNodes()) {
        list2.removeChild(list2.firstChild);
    }
var list3 = document.getElementById("sdiv4");
    while (list3.hasChildNodes()) {
        list3.removeChild(list3.firstChild);
    }
list1.remove();
list2.remove();
list3.remove();
/*var rm = document.getElementById("sdiv2");
var myNode = document.getElementById("foo");
rm.innerHTML = '';*/
//rm.divshape2.removeChild(rm);
}
else if(shapechoice == 'rectangle')
{
if(rectangleopt !== 1)
{
var divshape2 = elt("DIV", {id: "sdiv2"});
var inputlb3 = elt("label", null, "Rectangle:");
var inputr1 = elt("input", {type: "text", size: "4", id: "rs1"});
var inputr2 = elt("input", {type: "text", size: "4", id: "rs2"});
inputr1.addEventListener("change", function() {
lengthrect = inputr1.value;
});
inputr2.addEventListener("change", function() {
bth = inputr2.value;
});
divshape2.appendChild(inputlb3);
divshape2.appendChild(inputr1);
divshape2.appendChild(inputr2);
divshape.appendChild(divshape2);
//document.getElementById("sdiv1").style.display = "none";
rectangleopt = 1;
circleopt = 0;
}
var list = document.getElementById("sdiv1");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
var list2 = document.getElementById("sdiv3");
    while (list2.hasChildNodes()) {
        list2.removeChild(list2.firstChild);
    }
var list3 = document.getElementById("sdiv4");
    while (list3.hasChildNodes()) {
        list3.removeChild(list3.firstChild);
    }
list2.remove();
list3.remove();
list.remove();

/*var rm1 = document.getElementById("sdiv1");
var rm3 = document.getElementById("slv1");
var rm4 = document.getElementById("slv2");
rm1.divshape1.divshape.removeChild(rm1);
rm3.parentNode.removeChild(rm3);
rm4.parentNode.removeChild(rm4);
var myNode = document.getElementById("sdiv1");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}*/
}
else if(shapechoice == 'line')
{
var divshape3 = elt("DIV", {id: "sdiv3"});
var inputlb4 = elt("label", null, "Line:");
var inputlin1 = elt("input", {type: "text", size: "4", id: "ls1"});
var inputlin2 = elt("input", {type: "text", size: "4", id: "ls2"});
var inputlin3 = elt("input", {type: "text", size: "4", id: "ls3"});
var inputlin4 = elt("input", {type: "text", size: "4", id: "ls4"});
var shapespan = elt("SPAN", {id: "cpos"});
inputlin1.addEventListener("change", function() {
ls1 = inputlin1.value;
});
inputlin2.addEventListener("change", function() {
ls2 = inputlin2.value;
});
inputlin3.addEventListener("change", function() {
ls3 = inputlin3.value;
});
inputlin4.addEventListener("change", function() {
ls4 = inputlin4.value;
});
divshape3.appendChild(inputlb4);
divshape3.appendChild(inputlin1);
divshape3.appendChild(inputlin2);
divshape3.appendChild(inputlin3);
divshape3.appendChild(inputlin4);
divshape3.appendChild(shapespan);
divshape.appendChild(divshape3);

	var list = document.getElementById("sdiv1");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
var list1 = document.getElementById("sdiv2");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
		}
var list3 = document.getElementById("sdiv4");
    while (list3.hasChildNodes()) {
        list3.removeChild(list3.firstChild);
    }
list1.remove();
list3.remove();
list.remove();
}
else if(shapechoice == 'curve')
{
var divshape4 = elt("DIV", {id: "sdiv4"});
var inputlb5 = elt("label", null, "Curve:");
var inputc1 = elt("input", {type: "text", size: "4", id: "cs1"});
var inputc2 = elt("input", {type: "text", size: "4", id: "cs2"});
var inputc3 = elt("input", {type: "text", size: "4", id: "cs3"});
var inputc4 = elt("input", {type: "text", size: "4", id: "cs4"});
var shapespan = elt("SPAN", {id: "cpos"});
inputc1.addEventListener("change", function() {
cs1 = inputc1.value;
});
inputc2.addEventListener("change", function() {
cs2 = inputc2.value;
});
inputc3.addEventListener("change", function() {
cs3 = inputc3.value;
});
inputc4.addEventListener("change", function() {
cs4 = inputc4.value;
});
divshape4.appendChild(inputlb5);
divshape4.appendChild(inputc1);
divshape4.appendChild(inputc2);
divshape4.appendChild(inputc3);
divshape4.appendChild(inputc4);
divshape4.appendChild(shapespan);
divshape.appendChild(divshape4);
var list = document.getElementById("sdiv1");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
var list1 = document.getElementById("sdiv2");
    while (list1.hasChildNodes()) {
        list1.removeChild(list1.firstChild);
		}
var list2 = document.getElementById("sdiv3");
    while (list2.hasChildNodes()) {
        list2.removeChild(list2.firstChild);
    }
list1.remove();
list2.remove();
list.remove();
}
//draw(cx);
});

var closedivshape = elt("P", {id: "closediv"});
var closedivshapea = elt("A", {id: "closediva", href: "#"}, "Close");
closedivshape.addEventListener("click", function() {
/*var list6 = document.getElementById("shape1");
    while (list6.hasChildNodes()) {
        list6.removeChild(list6.firstChild);
    }
	divshape.perantNode.removeChild(divshape);*/

document.getElementById("shape1").remove();
countdiv = 0;
});

  divshape.appendChild(shapetype);
 closedivshape.appendChild(closedivshapea);
  divshape.appendChild(closedivshape);

countdiv = 1;
//divshape.appendChild(divshape1);
document.body.appendChild(divshape);
}
if(shapechoice == 'circle')
{
 cx.beginPath();
 if(ft == 'full')
 {
cx.arc(pos.x, pos.y,cirredious,0,Math.PI*2,true);
}
else
{
if(ft1 == 'clockwise')
{
cx.arc(pos.x, pos.y,cirredious,0,Math.PI,true);
}
else
{
cx.arc(pos.x, pos.y,cirredious,0,Math.PI,false);
}
}
cx.stroke();
}
else if(shapechoice == 'rectangle')
{
cx.strokeRect(pos.x, pos.y,lengthrect,bth);

}
else if(shapechoice == 'line')
{
cx.beginPath();
cx.moveTo(pos.x, pos.y);
cx.lineTo(ls1,ls2);
 cx.lineTo(ls3,ls4);
 cx.fill();
 document.getElementById("cpos").innerHTML = "Current Position:" + pos.x + "," + pos.y;
}
else if(shapechoice == 'curve')
{
cx.beginPath();
cx.moveTo(pos.x, pos.y);
cx.quadraticCurveTo(cs1,cs2,cs3,cs4);
cx.stroke();
document.getElementById("cpos").innerHTML = "Current Position:" + pos.x + "," + pos.y;
}
  //document.getElementById("shape1").style.display = 'block';
  //draw(cx);
 
  };
  
  
 /*End of the javascript option */

var colorCount = 0;
tools.ColorPicker = function(event, cx) {
if(colorCount == 0)
{
var colordiv = elt("DIV", {id: "mycolordiv"});
var colorspan = elt("SPAN", {id: "mycolor"});
var colorclose = elt("P", {id: "mycolorclose"});
var colorclosea = elt("A", {id: "mycolorclosea", href: "#"}, "Close");
var colornew = elt("P", {id: "mycolornew"});
var colornewa = elt("A", {id: "mycolornewa", href: "#"}, "New ColorCode");
var pos = relativePos(event, cx.canvas);
var datav = cx.getImageData(pos.x, pos.y, 1, 1);
/*datav.addEventListener("change", function() {
document.getElementById("mycolor").value = datav.data;
});*/
document.addEventListener("click", function(){
    document.getElementById("mycolor").innerHTML = "Color Code: rgb(" + datav.data[0] + "," + datav.data[1] + "," + datav.data[2] + ")";
});
colornew.addEventListener("click", function(){
	document.getElementById("mycolordiv").remove();
	colorCount = 0;
});
colorclose.addEventListener("click", function(){
	document.getElementById("mycolordiv").remove();
	colorCount = 0;
});
colornew.appendChild(colornewa);
colorclose.appendChild(colorclosea);
colordiv.appendChild(colorspan);
colordiv.appendChild(colornew);
colordiv.appendChild(colorclose);
document.body.appendChild(colordiv);
colorCount = 1;
}
/*if(data)
{
document.getElementById("mycolor").value = data.data;
}*/
}



tools.Spray = function(event, cx) {
  var radius = cx.lineWidth / 2;
  var area = radius * radius * Math.PI;
  var dotsPerTick = Math.ceil(area / 30);

  var currentPos = relativePos(event, cx.canvas);
  var spray = setInterval(function() {
    for (var i = 0; i < dotsPerTick; i++) {
      var offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag(function(event) {
    currentPos = relativePos(event, cx.canvas);
  }, function() {
    clearInterval(spray);
  });
};
controls.Undo = function(cx) {
var input1 = "";
var undo1 = elt("form", null,
                 "", input1,
                 elt("button", {type: "submit", class: "undo_but3"}, "Undo"));
undo1.addEventListener("submit", function(event) {
event.preventDefault();
var imgdata1 = undovalue.pop();
var data = imgdata1.replace(/^data:image\/(png|jpg);base64,/, "");
loadImageURL(cx, imgdata1);
var buf = new Buffer(data, 'base64');
fs.writeFile('image.png', buf);
//CanvasRenderingContext2D.fillText()
cx.fillText("www.webapsolution.com", 40, 40);
});
return undo1;
};


function randomPointInRadius(radius) {
  for (;;) {
    var x = Math.random() * 2 - 1;
    var y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1)
      return {x: x * radius, y: y * radius};
  }
}
function paintload(cx) 
{
document.getElementById("mydraw").style.display = 'block';
var nv = "image2.jpg";
event.preventDefault();
loadImageURL(cx, nv);
}
controls.Copyright = function(cx) {
var copyright = elt("A", {class: "copyright", href: "http://www.webapsolution.com/"}, "webapsolution.com");
var tc = elt("A", {class: "tc", href: "http://www.webapsolution.com/termandcondition.php"}, "T&C of service");
  return elt("P", {class: "copyrightp"}, "Copyright © 2016 ", copyright, tc);
}