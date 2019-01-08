function download(url, params, option) {
    if (option == undefined || option.type == "form") {
        var form = document.createElement('form');
        form.setAttribute("method", "get");
        form.setAttribute("action", url);
        for (var key in params) {
            var item = document.createElement("input");
            item.setAttribute("name", key);
            item.setAttribute("value", params[key]);
            form.appendChild(item);
        }
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var filename = xhr.getResponseHeader("File-Name");
                if (filename != null) {
                    var _url = window.URL.createObjectURL(this.response);
                    var a = document.createElement('a');
                    a.href = _url;
                    a.download = decodeURIComponent(filename);
                    a.click();
                    window.URL.revokeObjectURL(_url);
                } else if (option.onError) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        option.onError(event.target.result);
                    };
                    reader.readAsText(this.response);
                }
            }
        };
        xhr.send(JSON.stringify(params));
    }
}



