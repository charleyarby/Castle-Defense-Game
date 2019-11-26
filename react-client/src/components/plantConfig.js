var field=[]
var yCount=0
for(var i=0; i<5; i++) {
  var row=[]
  var column=100;
  var count=0
  var y=50;

  for(var j=0; j<4;j++) {
    row.push([50+count*column, y+100*yCount, false, '', 0, 0])
    count++;
  }
  field.push(row)
  yCount++
}
//0                1           2             3         4        5
//[x location, y location, exist or not, plant type, damage, rotation]


// var plantsLocation=[
//   [[30,50, false, '', 0], [90,50, false, '', 0], [150,50, false, '', 0]],
//   [[30,150, false, '', 0], [90,150, false, '', 0], [150,150, false, '', 0]],
//   [[30,250, false, '', 0], [90,250, false, '', 0], [150,250, false, '', 0]],
//   [[30,350, false, '', 0], [90,350, false, '', 0], [150,350, false, '', 0]],
//   [[30,450, false, '', 0], [90,450, false, '', 0], [150,450, false, '', 0]]
// ]
export default field;