function uploadImages() {
  console.log("开始上传图片--------------")
  ajaxGet("/fileUpload/upload")
}

function newPath() {
  const pathStr = document.getElementById("path").value.trim();
  console.log(pathStr)
  ajaxPost("/fileUpload/newPath", pathStr, fn);
  function fn(res) {
    const result = JSON.parse(res)
    if ((result.status == "1") && (result.content != null)) {
      document.getElementById("path").setAttribute("disabled", "disabled");
      document.getElementById("path-submit").style.display = "none";
      document.getElementById("newPath").value = result.content.path;
    } else {
      document.getElementById("path-error").style.display = "block";
    }
  }
}