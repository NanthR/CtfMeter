let anchor_tags  = Array.from(document.getElementsByTagName('a'));
anchor_tags.forEach((tag) => {
    let base = window.location.href.replace(/\/$/, "");
    if(tag.getAttribute('href')) {
       let relative = tag.getAttribute('href');
       let link = (absolute(base, relative));
       let absoluteLink = link.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
       browser.storage.sync.get('ctftime', function(items) {
            if(Object.keys(items).length != 0) {
                let m = items['ctftime'];
                val = m.findIndex(data => data.url === absoluteLink);
                if(val !== -1) {
                    tag.style.textDecoration = "line-through";
                    tag.style.textDecorationColor = "green";
                    tag.style.textDecorationThickness = "5px";
                }    
            }
             
        });
    }
    
});

function absolute(base, relative) {
    if(relative.includes('http')) {
        return relative;
    }
    if(relative.indexOf('//') == 0) {
        return "https:" + relative;
    }
    var baseparts = base.split("/"),
    relativeparts = relative.split("/");
    baseparts.pop();
    for (var i=0; i<relativeparts.length; i++) {
        if (relativeparts[i] == ".")
            continue;
        if (relativeparts[i] == "..")
            baseparts.pop();
        else
            baseparts.push(relativeparts[i]);
    }
    return baseparts.join("/");
}
