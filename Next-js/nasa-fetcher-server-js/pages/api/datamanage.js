import * as dotenv from 'dotenv';
let nasaKey = process.env.NASAKEY;


function getEpicObject() {

    return fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${nasaKey}`)
        .then(response => response.json())
        .then(data => {

        console.log(data);
        //String cheese to construct a link that goes to the latest picture of the earth from the L1 point
        var urlLink = stringCheese(data);
        //Retrives the date of the first image
        let dateData = (data[0].date);
        //Retreives the caption of the image
        let captionData = (data[0].caption);
        //Gets the dscoverj2000 position x,y,z
        let j2000 = (data[0].dscovr_j2000_position);
        //This method calculates how far away the spacecraft is away from the earth.
        return {dateData, urlLink, captionData};
        });
    }
    
    function stringCheese(obj) {
        // Create request URL to NASA. Should later be changed to serve links to local cached images.
        const source0 = "https://api.nasa.gov/EPIC/archive/natural/"
        const apiKey = `api_key=${nasaKey}`
        var imgUrl = ""
        var url = [];
        var identifier = obj[0].image;
        var date = obj[0].date;
        //cutting the unessasary data points out of the string
        date = date.slice(0, -9);
        //replacing slashes with dashes
        date = date.split('-').join('/');
        //adding the data to an array
        url.push(identifier, date)
        //Create the hyperlink that goes to the image
        imgUrl = source0 + url[1] + "/" + "png/" + url[0] + ".png?" + apiKey
        //console.log(imgUrl);
        return imgUrl;
    };
    
    
// Create an object to be sent to the user so data can be accessed.
let toSend = {};
// Create an object that has data in it.
let ObjDataPromise = getEpicObject();

const printAddress = () => {
    ObjDataPromise.then((a) => {
        toSend = {
        image2: a.urlLink,
        card2Date: a.dateData,
        card2: a.captionData,

    }
});
};
printAddress();
    
// Send toSend object to user as "sendData".
export default function handler(req, res) {
    res.status(200).json({ sendData: toSend })
}


