let html, css, js, htmlChange, cssChange, jsChange, htmlCode, cssCode, jsCode, result;

function init() {
    html = document.querySelector("#htmlcode");
    css = document.querySelector("#csscode");
    js = document.querySelector("#jscode");

    htmlCode = html.value;
    cssCode = css.value;
    jsCode = js.value;

    htmlChange = document.querySelector(".html .change");
    cssChange = document.querySelector(".css .change");
    jsChange = document.querySelector(".js .change");

    result = document.querySelector(".result>iframe")
}

let detectChange = (element, prevCode) => element.value !== prevCode;

let detectTab = event => event.keyCode === 9;

let detectCtrlS = event => event.ctrlKey && event.keyCode === 83;

let constructHTML = _ => {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"></head><body><style>${cssCode}</style>${htmlCode.replace(/(<script.*?<\/script>)|(<link.*?rel\s*=\s*['"]stylesheet['"].*>)/g, "")}<script>${jsCode}</script></body></html>`;
}

function attachListeners() {
    html.addEventListener("keydown", e => {
        e.stopPropagation();
        if (detectTab(e)) {
            e.preventDefault();
            insertTab(html);
        }
        if (detectCtrlS(e)) {
            e.preventDefault();
            htmlCode = html.value;
            htmlChange.style.display = "none";
            updateResult();
        }
    });
    css.addEventListener("keydown", e => {
        e.stopPropagation();
        if (detectTab(e)) {
            e.preventDefault();
            insertTab(css);
        }
        if (detectCtrlS(e)) {
            e.preventDefault();
            cssCode = css.value;
            cssChange.style.display = "none";
            updateResult();
        }
    });
    js.addEventListener("keydown", e => {
        e.stopPropagation();
        if (detectTab(e)) {
            e.preventDefault();
            insertTab(js);
        }
        if (detectCtrlS(e)) {
            e.preventDefault();
            jsCode = js.value;
            jsChange.style.display = "none";
            updateResult();
        }
    });

    html.addEventListener("keyup", () => {
        if (detectChange(html, htmlCode)) htmlChange.style.display = "inline";
        else htmlChange.style.display = "none";
    });
    css.addEventListener("keyup", () => {
        if (detectChange(css, cssCode)) cssChange.style.display = "inline";
        else cssChange.style.display = "none";
    });
    js.addEventListener("keyup", () => {
        if (detectChange(js, jsCode)) jsChange.style.display = "inline";
        else jsChange.style.display = "none";
    });
}

function updateResult() {
    result.srcdoc = constructHTML();
}

function insertTab(elem) {
    let s = elem.selectionStart;
    let e = elem.selectionEnd;
    elem.value = elem.value.substring(0, s) + '\t' + elem.value.substring(e);
    elem.selectionStart = elem.selectionEnd = s + 1;
}

window.onload = function () {
    init();
    attachListeners();
};