const api_key = 'dkeQiSkkzDPrt4dnhE8gMipQ3n2aaduIxAXq7CyG';
const url = 'https://api.nasa.gov/planetary/apod?api_key=' + api_key;

// const explanation = document.querySelector('#explanation');
const title = document.querySelector('#title');
const copyright = document.querySelector('#copyright');
const wrapper = document.querySelector('.wrapper');

let count = 0;
  
async function get_data(url) { 
    
    // Storing response 
    const response = await fetch(url); 
    
    // Storing data in form of JSON 
    var data = await response.json();

    if (count > 3) {
        return;
    }

    // Change HTML
    if (!data.code) {

        console.log(data);

        title.innerHTML = data.title + '<br>' + data.date;

        if (data.copyright) {
            copyright.innerHTML = 'Credits: ' + data.copyright;
        }

        if (data.media_type == "image") {
            var node = document.createElement("img");
            node.src = data.url;
            wrapper.appendChild(node);
        }
    } else {
        count++

        year = 2007 + Math.round(Math.random() * 13);
        month = Math.round(Math.random() * 12);
        day = Math.round(Math.random() * 28);

        formated = url + '&date=' + year + '-' + month + '-' + day;
        console.log(formated);

        get_data(formated);
        return;
    }
}

// Calling that async function 
get_data(url);
  
