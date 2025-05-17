// 请求数据
function fetchData(url) {
    return new Promise(function (resolve, reject) {
        var cacheData = sessionStorage.getItem("cache://" + url);
        if (window.needCache && cacheData) {
            resolve(cacheData);
        } else {
            fetch(url, {
                method: "GET"
            }).then(function (res) {
                if (res.status === 200) {
                    return res.text();
                } else {
                    return Promise.reject(res.json());
                }
            }).then(function (res) {

                if (window.needCache) {
                    sessionStorage.setItem("cache://" + url, res);
                }

                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        }
    });
}

// 切换nav
function changeNav(navName, isInit) {
    if (!isInit) window.location.href = "#/" + navName

    var navEls = document.getElementsByName("nav-item");
    for (var i = 0; i < navEls.length; i++) {
        navEls[i].setAttribute("active", "no");
    }

    var navEl = document.getElementById(navName);
    if (navEl) {
        navEl.setAttribute("active", "yes");
    }

    fetchData("./pages/" + navName + ".html").then(function (res) {
        document.getElementById("root").innerHTML = res;

        // 文档
        if (navName === 'doc/index') {
            loadDoc(window.location.hash.split("?")[1] || 'initProject');
        }

        // 手册
        else if (navName === 'manual/index') {
            var manualName = window.location.hash.split("?")[1];
            if (manualName) {
                openManualDialog(manualName);
            }
        }
    });
}

// 打开手册弹框
function openManualDialog(manualName) {
    var fullDialogViewEl = document.getElementById("full-dialog-view");
    fetchData("./pages/manual/" + manualName + ".html").then(function (res) {

        window.location.href = "./index.html#/manual/index?" + manualName;
        fullDialogViewEl.innerHTML = res;

        // 关闭
        var closeEl = document.createElement("div");
        fullDialogViewEl.appendChild(closeEl);
        closeEl.innerText = "返回";
        closeEl.setAttribute("class", "close-btn");

        closeEl.addEventListener("click", function () {
            fullDialogViewEl.style.display = "";
            document.body.style.overflow = "";
            window.location.href = "./index.html#/manual/index";
        });

        fullDialogViewEl.style.display = "block";
        document.body.style.overflow = "hidden";

    });
}

// 打开文档内容
function loadDoc(docName) {
    fetchData("./pages/doc/" + docName + ".html").then(function (res) {
        window.location.href = "./index.html#/doc/index?" + docName;
        document.getElementById("doc-content").innerHTML = res;
    });
}