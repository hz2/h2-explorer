// ==UserScript==
// @name         down svg
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.microsoft.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const downlink = (url, name) => {
        fetch(url, {
                mode: "cors"
            })
            .then(function (response) {
                return response.blob();
            })
            .then(r => {
                let file = new FileReader();
                file.onload = function (e) {
                    let el = document.createElement("a");
                    el.setAttribute("href", e.target.result);
                    el.setAttribute("download", name)
                    if (document.createEvent) {
                        var event = document.createEvent("MouseEvents");
                        event.initEvent("click", true, true);
                        el.dispatchEvent(event);
                    } else {
                        el.click();
                    }
                };
                file.readAsDataURL(r);
            })
            .catch(function (error) {
                console.log("Request failed", error);
            });
    }




    document.addEventListener('mouseover', event => {
        let {
            target: {
                nodeName: nodeName,
                currentSrc: currentSrc
            }
        } = event


        if (nodeName === 'IMG') {
            event.target.title = currentSrc
            event.target.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation()
                const last = arr => arr[arr.length - 1]
                const getname = name => last(name.split('/')).replace(/\?[\w\d\-\=]+$/g, '')
                downlink(currentSrc, getname(currentSrc))
            })

        }


        if (event.target.nodeName === 'svg') {
            let inputVal = event.target.outerHTML
            let url0 = /http\:\/\/\www\.w3\.org\/2000\/svg/i.test(inputVal) ? inputVal : inputVal.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
            // 添加 xml 命名空间
            let title = event.target.parentElement.className.replace(/ /g,'-') + '.svg'
            let url = 'data:image/svg+xml;base64,' + btoa(url0)
          
            event.target.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation()
                downlink(url, title )
            })

        }



    })

    // Your code here...
})();