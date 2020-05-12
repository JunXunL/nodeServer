const arr = [{'a':'1','b':'2'},{'a':'2','b':'2'},{'a':'3','c':'3'},{'a':'4','b':'2','d':'4'}]
arr.forEach(el => {
  if(el.a === '1'){
    console.log("a=1")
  }else if(el.a === '2'){
    console.log("a=2")
  }else if(el.a === '3'){
    console.log("a=3")
  }
});